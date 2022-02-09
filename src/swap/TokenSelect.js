import styles from './TokenSelect.module.scss'
import { ReactComponent as Arrow } from '../images/ionic-ios-arrow-back.svg';
import CryptoToken from './CryptoToken';

export default function TokenSelect({ value, onClick }) {
    return (
        <div className={styles.container} onClick={onClick}>
            <CryptoToken token={value}/>
            <Arrow />
        </div>
    )
}