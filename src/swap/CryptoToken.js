import styles from './CryptoToken.module.scss'

function CryptoToken({ token }) {
    return (
        <div className={styles.container}>
            {token ?
                <>
                    <div className={styles.icon}>
                        {
                            token.startsWith("ten") ?
                                <>
                                    <img src={`/tokens/${token.toLowerCase().replace("ten", "")}.svg`} alt="" />
                                    <img className={styles.ten_ring} src={`/tokens/_tenRing.svg`} alt="" />
                                </>
                                :
                                <img src={`/tokens/${token.toLowerCase()}.svg`} alt="" />
                        }
                    </div>
                    <span className={styles.name}>{token.toUpperCase().replace("TEN", "ten")}</span>
                </>
                :
                <span className={styles.name}>please&nbsp;select</span>
            }
        </div>
    )
}

export default CryptoToken