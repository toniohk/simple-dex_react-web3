import { useEffect, useState } from "react";
import { subscribeChanges, unsubscribeChanges, getBalance } from "./Web3Api";

function useBalance(token) {

    const [balance, setBalance] = useState(0)

    const balanceHandler =  () => {
        getBalance(token)
            .then(result => {
                result ? setBalance(result) : setBalance(0)
            })
            .catch(error => {
                console.log(error)
                setBalance(0)
            })
    }

    useEffect(() => {
        subscribeChanges(balanceHandler)
        return () => { unsubscribeChanges(balanceHandler) }
    }, [])

    return balance
}

export default useBalance