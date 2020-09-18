class Transaction_Pool {
    constructor() {
        this.transactions = []
    }
    addTransaction(inputTransaction) {
        this.transactions.push(inputTransaction)
        console.log("Transaction pool contains:")
        this.transactions.map((transaction)=>console.log(" "+transaction.id+"; "));
    }

}

module.exports = Transaction_Pool