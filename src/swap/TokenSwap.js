import styles from './TokenSwap.module.scss'
import { ReactComponent as SwapIcon } from '../images/ionic-ios-swap.svg';
import TokenInput from './TokenInput'
import { calculateFromAmount, calculateToAmount } from '../lib/Web3Api';
import tokens from '../lib/tokens.json'

export default function TokenSwap({ swap, onSwapChanged }) {

    const handleFromTokenChanged = (token) => {
        let toToken = swap.to;
        if (!token.swap.includes(toToken.name)) {
            toToken = tokens[token.swap[0]]
        }
        toToken.amount = calculateToAmount(token.swap[0], token.amount)
        onSwapChanged({ ...swap, from: token, to: toToken });
    }

    const handleToTokenChanged = (token) => {
        let fromToken = swap.from;
        if (!token.swap.includes(fromToken.name)) {
            fromToken = tokens[token.swap[0]]
        }
        fromToken.amount = calculateFromAmount(token.swap[0], token.amount)        
        onSwapChanged({ ...swap, from: fromToken, to: token });
    }

    const handleSwitchTokens = () => {
        const newFrom = { ...swap.to, amount: swap.from.amount}
        const newTo = { ...swap.from, amount:  calculateToAmount(swap.to.name, swap.from.amount) }
        onSwapChanged({
            ...swap,
            from: newFrom,
            to: newTo
        });
    }

    return (
        <div className={styles.container}>
            <TokenInput type="from"
                token={swap.from}
                showMaxButton
                onTokenChanged={handleFromTokenChanged}
                value={swap.from.amount} />
            <SwapIcon className={styles.changeIcon} onClick={handleSwitchTokens} />
            <TokenInput type="to"
                token={swap.to}
                onTokenChanged={handleToTokenChanged}
                value={swap.to.amount} />
        </div>
    )
}