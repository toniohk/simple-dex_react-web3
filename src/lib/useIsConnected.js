import { useEffect, useState } from "react";
import { getAccount, subscribeChanges, unsubscribeChanges } from "./Web3Api";

function useIsConnected() {
    const [isConnected, setIsConnected] = useState(false)

    useEffect(() => {
        function handleConnectionChanged() {
            getAccount()
                .then((result) => setIsConnected(result))
                .catch(() => setIsConnected(false))
        }

        subscribeChanges(handleConnectionChanged)
        return () => unsubscribeChanges(handleConnectionChanged)
    }, [isConnected])

    return isConnected
}

export default useIsConnected