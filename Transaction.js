//Generate unique ID
const uuid = require('uuid/v1');
const { verifySignature } = require('./helper')

class Transaction {
    constructor({ senderWallet, recipient, amount}) {
        this.id = uuid();
        this.postTransaction = this.processPostTransaction({ senderWallet, recipient, amount })
        this.input = this.createInput({ senderWallet, outputMap:this.postTransaction});
    }
    processPostTransaction({ senderWallet, recipient, amount }) {
        const outputMap = {};
        /*
            {
                publicKey : amount
            }
        */ 
        outputMap[recipient] = amount;
        outputMap[senderWallet.publicKey] = senderWallet.balance - amount;
        return outputMap;
    }
    createInput({ senderWallet, outputMap }) {
        return{
            timestamp: Date.now(),
            amount: senderWallet.balance,
            address: senderWallet.publicKey,
            signature: senderWallet.sign(outputMap)
        }
    }
    static validTransaction(transaction) {
        const { input:{ address, amount, signature }, outputMap } = transaction;
        total = 0
        Object.values(outputMap).map((amt) => total = total + amt)
        const outputTotal = total
        if( amount !== outputTotal ) {
            console.log("Amount validation error!")
            return false;
        }

        if( !verifySignature({ publicKey: address, data: outputMap, signature }) )
        {
            console.log("Invalid signature!")
            return false;
        }
        return true;
    }
}

module.exports = Transaction;