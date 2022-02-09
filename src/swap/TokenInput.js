import styles from './TokenInput.module.scss'
import { useEffect, useRef, useState } from 'react'
import TokenSelect from './TokenSelect';
import CryptoToken from './CryptoToken';
import useBalance from '../lib/useBalance'
import tokens from '../lib/tokens.json'
import { decimals } from '../lib/Web3Api'

export default function TokenInput({ type, token, onTokenChanged, showMaxButton = undefined }) {

    const [isOpen, setOpen] = useState(false)
    const dropDownToggleRef = useRef()

    const handleOutsideClick = (e) => {
        if (isOpen && !dropDownToggleRef?.current?.contains(e.target)) {
            setOpen(false)
        }
    }

    useEffect(() => {
        document.addEventListener("click", handleOutsideClick)
        return () => {
            document.removeEventListener("click", handleOutsideClick)
        }
    })

    const handleChange = (e) => {
        let amount = token.amount
        const precision = decimals.toString().length - 1
        const regex = new RegExp("^[0-9]*[.,]?[0-9]{0," + precision + "}$")
        if (regex.test(e.target.value)) {
            amount = e.target.value.replace(',', '.')
            amount = amount.startsWith('.') ? '0' + amount : amount
        }
        onTokenChanged({ ...token, amount: amount })
    }

    const handleOpenTokens = (e) => {
        setOpen(!isOpen)
    }

    const handleMaxClick = (e) => {
        onTokenChanged({ ...token, amount: token.balance })
    }

    const tokenDropDown = Object.entries(tokens)
        .map((item, index) => {
            let newToken = item[1]
            return (
                <DropDownItem
                    key={index}
                    token={newToken}
                    onClick={() => onTokenChanged({ ...token, ...newToken })} />
            )
        })

    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div>{type}</div>
                <div>Balance: <span>{token.balance ?? 0}</span></div>
            </div>
            <div className={styles.input_group}>
                <input
                    className={styles.amountInput}
                    placeholder="0.0"
                    spellCheck="false"
                    autoComplete="off"
                    step="any"
                    value={token.amount}
                    onChange={handleChange} />
                {
                    showMaxButton &&
                    <button onClick={handleMaxClick} className={styles.max_button}>max</button>
                }
                <div className={styles.token} ref={dropDownToggleRef} >
                    <TokenSelect value={token.name} onClick={handleOpenTokens} />
                </div>
            </div>
            <div className={styles.drop_down + " " + (isOpen && styles.drop_down_open)}>
                <div className={styles.top}>
                    <div>Token</div>
                    <div>Balance</div>
                </div>
                <div className={styles.scroll_wrapper}>
                    <ul>
                        {tokenDropDown}
                    </ul>
                </div>
            </div>
        </div>
    )
}

function DropDownItem({ token, onClick }) {
    const balance = useBalance(token)
    return (
        <li onClick={onClick}>
            <CryptoToken token={token.name} />
            <div className={styles.balance}>{balance}</div>
        </li>
    )
}