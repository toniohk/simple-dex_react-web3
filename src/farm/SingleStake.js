import styles from './SingleStake.module.scss'
import React from 'react'
import { Button } from '@material-ui/core'

export default function SingleStaking() {

    return (
        <div className={styles.container}>
            <p>Locking Schedule on claim: 1 week static 1 week linear / 1 week static on withdraw</p>
            <div className={styles.form}>
                <div />
                <div className={styles.inputContainer}>
                    <input className={styles.input} />
                    <button tabIndex={-1} className={styles.max_button}>max</button>
                </div>
                <div>
                    <Button variant="outlined" color="primary" block>Deposite</Button>
                </div>
            </div>
            <div className={styles.form}>
                <div>
                    <p>Total staked 10.0001 TOKEN</p>
                </div>
                <div className={styles.inputContainer}>
                    <input className={styles.input} />
                    <button tabIndex={-1} className={styles.max_button}>max</button>
                </div>
                <div>
                    <Button variant="outlined" color="primary" block>Withdraw</Button>
                </div>
            </div>
            <div className={styles.form}>
                <div>
                    <p>Earned rewards 100.102 TOKEN</p>
                </div>
                <div className={styles.inputContainer}>
                    <input className={styles.input} />
                    <button tabIndex={-1} className={styles.max_button}>max</button>
                </div>
                <div>
                    <Button variant="outlined" color="primary" block>Claim Rewards</Button>
                </div>
            </div>
            <div className={styles.buttonGroup}>
                <button className="button-blue w-button">Compound</button>
                <button className="button-blue w-button">Redeem</button>
            </div>
        </div>
    )
}