import styles from './TokenGroup.module.scss'
import React, { useState } from 'react'
import { withStyles } from '@material-ui/core/styles'
import { Accordion, AccordionSummary, AccordionDetails } from '@material-ui/core'
import ExpandMoreIcon from '@material-ui/icons/ExpandMore'
import TokenBox from './TokenBox'

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
        borderRadius: 9,
        marginBottom: -1,
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
        padding: '10px 0 0 0',
    },
}))(AccordionDetails)

const TokenBoxHeader = () => {
    return (
        <div className={styles.header}>
            <div>
                <p>Assets</p>
            </div>
            <div>
                <p>APY</p>
            </div>
            <div>
                <p>Deposits ($)</p>
            </div>
            <div>
                <p>Your balance</p>
            </div>
        </div>
    )
}

export default function TokenGroup({ name, tokens, apy, deposits }) {
    const [open, setOpen] = useState(false)

    return (
        <Collapse square expanded={open} onChange={() => setOpen(prevState => !prevState)}>
            <CollapseSummary expandIcon={<ExpandMoreIcon />}>
                <div className={styles.summary}>
                    <div className={styles.name}><p>{name}</p></div>
                    <div className={styles.poolGroup}>
                        {tokens.map((item, index) => (
                            <div key={index} className={styles.poolItem}>
                                <img className={styles.icon} src="/images/Teneo-Icon.svg" />
                                <p>{`${item.name}:${item.symbol}`}</p>
                            </div>
                        ))}
                    </div>
                    <div className={styles.description}>
                        <span>
                            APY: <b>{apy.from}% - {apy.to}%</b>
                        </span>
                        <span>
                            Deposits($): <b>{deposits}M</b>
                        </span>
                    </div>
                </div>
            </CollapseSummary>
            <CollapseDetails>
                <div className={styles.details}>
                    <TokenBoxHeader />
                    {tokens.map((item, index) => (
                        <TokenBox key={`token-${index}`} name={item.name} symbol={item.symbol} apy={item.apy} deposits={item.deposits} balance={item.balance} />
                    ))}
                </div>
            </CollapseDetails>
        </Collapse>
    )
}

export { TokenBoxHeader }