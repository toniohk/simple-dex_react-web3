import styles from './Loader.module.scss'
import Spinner from 'react-spinners/PuffLoader'

export default function Loader(props) {
    return (
        <div className={styles.container}>
            <Spinner size={90} color="#df1d54" className={styles.spinner} />
        </div>
    )
}