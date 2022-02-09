import styles from './InfoBox.module.scss'

function InfoBox({label, children}) {
    return (
        <div className={styles.container}>
            <div className={styles.label}>{label}</div>
            <div className={styles.value}>{children}</div>
        </div>
    )
}

export default InfoBox