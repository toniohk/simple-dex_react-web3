import styles from './Farm.module.scss'
import { useEffect, useState } from 'react'

import TokenGroup, { TokenBoxHeader } from './TokenGroup'
import TokenBox from './TokenBox'
import SingleStake from './SingleStake'

import { getAccount, requestAccount, fees, swapToken, subscribeChanges, unsubscribeChanges, getBalance } from '../lib/Web3Api'
import { token, AMMs, staking } from '../lib/farm.json'

const teneoTokens = token
const pools = AMMs
const stakeToken = staking

export default function Farm(props) {

    const [groups, setGroups] = useState([
        {
            name: 'AMMs',
            tokens: [
                { name: 'tenETH', symbol: 'ETH', apy: 52.58, deposits: 16.51, balance: 0.0000000000 },
                { name: 'tenETH', symbol: 'ETH', apy: 52.58, deposits: 16.51, balance: 0.0000000000 },
                { name: 'tenETH', symbol: 'ETH', apy: 52.58, deposits: 16.51, balance: 0.0000000000 },
            ],
            apy: { from: 5.17, to: 21.99 },
            deposits: 37.09
        }
    ])
    const [tokens, setTokens] = useState([
        { name: 'tenETH', symbol: 'ETH', apy: 52.58, deposits: 16.51, balance: 0.0000000000 },
        { name: 'tenETH', symbol: 'ETH', apy: 52.58, deposits: 16.51, balance: 0.0000000000 },
        { name: 'tenETH', symbol: 'ETH', apy: 52.58, deposits: 16.51, balance: 0.0000000000 }
    ])

    useEffect(() => {
        teneoTokens.forEach(pool => {
            getBalance({...pool, bigNumber: 1000000000000000000}).then(res => console.log(1, res))
        })
    }, [])


    return (
        <main className={styles.content}>
            <h1>Farm</h1>
            <h2>Stake your tokens</h2>
            <div className={styles.container}>
                {groups.map((item, index) => index === 0 ? (
                    <TokenGroup key={`token-group-${index}`} name={item.name} tokens={item.tokens} apy={item.apy} deposits={item.deposits} />
                ) : (
                    <div key={`token-group-${index}`}>
                        <div className={styles.spacer} />
                        <TokenGroup name={item.name} tokens={item.tokens} apy={item.apy} deposits={item.deposits} />
                    </div>
                ))}
                <div className={styles.spacer} />
                <TokenBoxHeader />
                {tokens.map((item, index) => (
                    <TokenBox key={`token-${index}`} name={item.name} symbol={item.symbol} apy={item.apy} deposits={item.deposits} balance={item.balance} />
                ))}
                <div className={styles.spacer} />
                <SingleStake />
            </div>
        </main>
    )
}
