import Web3 from "web3"
import tokenAbi from './tokenAbi.json'
import ammAbi from './ammAbi.json'

export const decimals = 1000000
export const fees = {
    'buy': 0.005,
    'sell': 0.005
};

const web3 = Web3.givenProvider ? new Web3(Web3.givenProvider) : undefined
const network = web3?.eth

let currentAccount = undefined
document.addEventListener('accountChanged', (e) => {
    currentAccount = e.detail.account
})

export function subscribeChanges(callback) {
    document.addEventListener('accountChanged', callback)
}

export function unsubscribeChanges(callback) {
    document.removeEventListener('accountChanged', callback)
}

function OnAccountChanged(account) {
    var event = new CustomEvent('accountChanged', { detail: { account: account } })
    document.dispatchEvent(event)
}

export async function getAccount() {
    return network?.getAccounts()
        .then(accounts => setAccount(accounts[0]))
        .catch(error => {
            console.log(error)
            return setAccount(undefined)
        })
}

export async function requestAccount() {
    return network?.requestAccounts()
        .then(accounts => setAccount(accounts[0]))
        .catch(error => {
            console.log(error)
            return setAccount(undefined)
        })
}

function setAccount(account) {
    if (currentAccount !== account) {
        currentAccount = account
        OnAccountChanged(currentAccount)
    }

    return currentAccount
}

export async function getBalance(token) {
    if (!currentAccount) {
        await getAccount()
    }

    if (currentAccount) {
        let result = new Promise(() => undefined)
        if (token.contract) {
            let contract = new web3.eth.Contract(tokenAbi, token.contract)
            result = contract.methods.balanceOf(currentAccount).call()
        } else {
            result = network?.getBalance(currentAccount)
        }

        return result
            .then(result => {
                var formatBalance = result / token.bigNumber
                return Math.round((formatBalance + Number.EPSILON) * decimals) / decimals
            })
            .catch(error => {
                console.log(error);
                return 0
            })
    }
}

export function calculateFromAmount(token, amount) {
    let parsedAmount = parseFloat(amount)
    let fee = token.startsWith("ten") ? fees.sell : fees.buy
    let result = parsedAmount / (1 - fee)

    return isNaN(result) ? "" : result
}

export function calculateToAmount(token, amount) {
    let parsedAmount = parseFloat(amount)
    let fee = token.startsWith("ten") ? fees.sell : fees.buy
    let result = parsedAmount * (1 - fee)

    return isNaN(result) ? "" : result
}

function getWei(number, decimals) {
    return web3.utils.toWei(number.toFixed(decimals), 'ether')
}


export async function swapToken(from, to, amount) {
    if (!currentAccount) {
        await requestAccount()
    }

    switch (from.name) {
        case "ftm":
            return buyTenFtm(from, amount)
        case "tenFtm":
            return sellTenFtm(from, amount)
        default:
            return undefined
    }
}

//FTM->tenFTM
async function buyTenFtm(token, amount) {
    if (currentAccount) {
        var weiAmount = getWei(parseFloat(amount), token.decimals)
        var amm = new web3.eth.Contract(ammAbi, token.amm)

        return amm.methods.buy(weiAmount).send({
            from: currentAccount,
            value: weiAmount
        }).on('transactionHash', console.log)
            .on('receipt', (data) => {
                console.log(data)
                OnAccountChanged(null)
            })
            .on('error', data => {
                console.log(data)
                OnAccountChanged(null)
            })
    }
}

//tenFTM->FTM
async function sellTenFtm(token, amount) {
    if (currentAccount) {
        var weiAmount = getWei(parseFloat(amount), token.decimals)
        var amm = new web3.eth.Contract(ammAbi, token.amm)

        return amm.methods.sell(weiAmount).send({ from: currentAccount })
            .on('transactionHash', console.log)
            .on('receipt', (data) => {
                console.log(data)
                OnAccountChanged(null)
            })
            .on('error', data => {
                console.log(data)
                OnAccountChanged(null)
            })
    }
}

//XYZ->tenXYZ
async function buyToken(token, amount) {
    if (currentAccount) {
        amount = String(amount * token.bigNumber);
        var ammContract = new web3.eth.Contract(ammAbi, token.amm);
        var tokenContract = new web3.eth.Contract(tokenAbi, token.contract);

        return tokenContract.methods.approve(token.amm, amount).send({
            from: currentAccount
        }).then(function () {
            ammContract.methods
                .buy(amount)
                .send({ from: currentAccount })
                .on('receipt', () => {
                    OnAccountChanged(null)
                })
        });
    }
}

//tenXYZ->XYZ
async function sellToken(token, amount) {
    if (currentAccount) {
        amount = String(amount * token.bigNumber);
        var ammContract = new web3.eth.Contract(ammAbi, token.amm);

        return ammContract.methods
            .sell(amount)
            .send({ from: currentAccount })
            .on('receipt', () => {
                OnAccountChanged(null)
            })
    }
}
