import styles from './Compound.module.scss'
import { useEffect, useState } from 'react'

export default function Compound(props) {

    const [isProcessing, setIsProcessing] = useState(false)

    useEffect(() => {
        
    }, [])


    return (
        <main className={styles.content}>
            <h1>Compound</h1>
            <h2>Compound your tokens</h2>
            <div className={styles.container}>
                
            </div>
        </main>
    )
}
