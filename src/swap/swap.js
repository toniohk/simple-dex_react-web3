import styles from './Swap.module.scss'
import TokenSwap from './TokenSwap'
import InfoBox from './InfoBox'
import { useEffect, useState } from 'react'
import { getAccount, requestAccount, fees, swapToken, subscribeChanges, unsubscribeChanges, getBalance } from '../lib/Web3Api'
import tokens from '../lib/tokens.json'

var btnCanSwap = { text: "swap" }
var btnNoAmount = { text: "Enter an amount", styleClass: styles.btn_inactive }
var btnNoConnection = { text: "Connect Wallet" }
var btnProcceding = { text: "processing...", styleClass: styles.btn_inactive }
var btnDone = { text: "DONE", styleClass: styles.btn_success }

export default function Swap(props) {

    const [swap, setSwap] = useState({
        from: {
            ...tokens.ftm,
            amount: "",
            balance: undefined
        },
        to: {
            ...tokens.tenFtm,
            amount: "",
            balance: undefined
        },
    })

    const [isProcessing, setIsProcessing] = useState(false)
    const [buttonState, setButtonState] = useState(btnNoConnection)
    const [isConnected, setIsConnected] = useState(false)

    // const [leverage, setLeverage] = useState(0.005)
    const [fee, setFee] = useState(fees.buy * 100)

    useEffect(() => {
        const handleChanges = () => {
            getAccount()
                .then((result) => {
                    let isConnected = result ? true : false
                    setIsConnected(isConnected)
                    if (!isProcessing) {
                        refreshButtonState(swap, isConnected)

                    }
                })
                .catch(() => {
                    setIsConnected(false)
                    setButtonState(btnNoConnection)
                })
                .finally(() => {
                    refreshBalances(swap)
                })
        }
        subscribeChanges(handleChanges)
        return () => unsubscribeChanges(handleChanges)
    }, [swap, isProcessing])

    function handleSwapChanged(newSwap) {
        setSwap({ ...swap, ...newSwap })
        refreshBalances(newSwap)
        refreshButtonState(newSwap, isConnected)
    }

    function refreshButtonState(swap, isConnected) {
        if (isConnected) {
            if (swap.from.amount <= 0) {
                setButtonState(btnNoAmount)
            } else {
                setButtonState(btnCanSwap)
            }
        } else {
            setButtonState(btnNoConnection)
        }
    }

    function refreshBalances(swap) {
        const fromPromise = getBalance(swap.from)
        const toPromise = getBalance(swap.to)
        Promise.all([fromPromise, toPromise])
            .then((values) => {
                setSwap({
                    ...swap,
                    from: {
                        ...swap.from,
                        balance: values[0] ?? 0
                    },
                    to: {
                        ...swap.to,
                        balance: values[1] ?? 0
                    }
                })
            })
    }

    const handleButtonClick = (e) => {
        if (isConnected) {
            if (swap.from.amount > 0) {
                setButtonState(btnProcceding)
                setIsProcessing(true)
                swapToken(swap.from, swap.to, swap.from.amount)
                    .then(() => {
                        setButtonState(btnDone)
                        setTimeout(() => {
                            setIsProcessing(false)
                            refreshButtonState(swap, isConnected)
                        }, 1500);
                    })
                    .catch(() => {
                        setIsProcessing(false)
                        refreshButtonState(swap, isConnected)
                    })
                setSwap({ ...swap, from: { ...swap.from, amount: "" }, to: { ...swap.to, amount: "" } })
            }
        } else {
            requestAccount()
                .then((result) => refreshButtonState(swap, result ? true : false))
                .catch(() => setButtonState(btnNoConnection))
        }
    }

    return (
        <main className={styles.content}>
            <h1>Swap</h1>
            <h2>Swap your tokens</h2>
            <div className={styles.container}>
                {/* For development */}
                {/* <div style={{ fontSize: 12 }}>Swap: {JSON.stringify(swap.to)}</div> */}
                {/* <div style={{ fontSize: 12 }}>{JSON.stringify(swap)}</div> */}
                {/* For development End*/}

                <div className={styles.box + " " + (isProcessing && styles.inactive)}>
                    <TokenSwap swap={swap} onSwapChanged={handleSwapChanged} />
                </div>

                {/* <InfoBox label="Price">
                    {`${price} ${swap.from.name.toUpperCase()} per ${swap.to.name.toUpperCase()}`}
                </InfoBox>

                <InfoBox label="Price leverage">
                    {`< ${leverage} %`}
                </InfoBox> */}

                <InfoBox label="Fees">
                    {fee} %
                </InfoBox>
                <button onClick={handleButtonClick} className={"button-blue w-button " + (buttonState.styleClass ?? "")}>{buttonState.text}</button>
            </div>
        </main>
    )
}
