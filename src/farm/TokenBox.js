import styles from './TokenBox.module.scss'
import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Button, Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'

const Collapse = withStyles({
    root: {
        width: '100%',
        boxShadow: 'none',
        '&:not(:last-child)': {
            borderBottom: 0,
        },
        '&:before': {
            display: 'none',
        },
        '&$expanded': {
            margin: 'auto',
        },
    },
    expanded: {},
})(Accordion)

const CollapseSummary = withStyles({
    root: {
        alignItems: 'flex-start',
        backgroundColor: '#f2f2f2',
        border: '1px solid #d2d2d2',
        marginTop: 10,
        padding: 0,
        minHeight: 'auto',
        '&$expanded': {
            minHeight: 'auto',
        },
    },
    content: {
        margin: '12px 8px',
        '&$expanded': {
            margin: '12px 8px',
        },
    },
    expandIcon: {
        order: -1
    },
    expanded: {},
})(AccordionSummary)

const CollapseDetails = withStyles((theme) => ({
    root: {
        border: '1px solid #d2d2d2',
        padding: theme.spacing(2),
    },
}))(AccordionDetails)

export default function TokenBox({name, symbol, apy, deposits, balance}) {
    const [open, setOpen] = useState(false)

    return (
        <Collapse square expanded={open} onChange={() => setOpen(prevState => !prevState)}>
            <CollapseSummary expandIcon={<ExpandMoreIcon />}>
                <div className={styles.summary}>
                    <div className={styles.info}>
                        <img className={styles.icon} src="/images/Teneo-Icon.svg" />
                        <p>{`${name}:${symbol}`}</p>
                    </div>
                    <div className={styles.info}>
                        <p>{`${apy}%`}</p>
                    </div>
                    <div className={styles.info}>
                        <p>{`${deposits}M`}</p>
                    </div>
                    <div className={styles.info}>
                        <p>{balance}</p>
                    </div>
                </div>
            </CollapseSummary>
            <CollapseDetails>
                <div className={styles.details}>
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
                    <div className={styles.action}>
                        <button className="button-blue w-button">Redeem</button>
                    </div>
                </div>
            </CollapseDetails>
        </Collapse>
    )
}