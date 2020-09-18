const Wallet = require('./Wallet')
const Transaction = require('./Transaction')
const Transaction_Pool = require('./Transaction_Pool')
const Block = require('./Block')
const Blockchain = require('./Blockchain')
const { BLOCK_TRANSACTIONS, mine_result } = require('./constants')
const { cryptoHash } = require('./helper')

//Create Wallets
let wallets = []
for( i=0; i<5; i++ ) {
    wallets[i] = new Wallet();
}
console.log("\n.....Created Wallets are.....")
wallets.map((wallet) => console.log(wallet.publicKey))
console.log("\n--------------------------------------------------------------------------------------------------\n")

//Initialize Blockchain
let blockchain = new Blockchain();

//Conduct Transactions
let transactions = []
for( i=0; i<4; i++ ) {
    let transact_amount = 2
    if(transact_amount > wallets[i].balance) {
        console.log("Amount exceeds balance!")
    }
    transactions[i] = new Transaction({ senderWallet:wallets[i], recipient:wallets[i%4 + 1].publicKey, amount:transact_amount});
}
console.log(".....Created Transactions are.....")
transactions.map((transaction) => console.log(transaction.id))
console.log("\n--------------------------------------------------------------------------------------------------\n")


//Add to Transaction Pool
let transaction_pool = new Transaction_Pool()
for( i=0; i<transactions.length; i++ ) transaction_pool.addTransaction(transactions[i])
console.log("\n--------------------------------------------------------------------------------------------------\n")


//Mining
let iterate = 1;
let block;
if(transactions.length % BLOCK_TRANSACTIONS == 0) iterate = transactions.length/BLOCK_TRANSACTIONS
else iterate = transactions.length/BLOCK_TRANSACTIONS + 1
for( i=1; i<=iterate; i++) {
    let lastHash = cryptoHash(blockchain.blocks[blockchain.blocks.length-1])
    let difficulty = blockchain.blocks[blockchain.blocks.length-1].difficulty
    let data = transactions.slice(i-1,i-1+4)
    let lastTimestamp = blockchain.blocks[blockchain.blocks.length-1].timestamp
    //Start Mining Parallely
    Promise.all([
        wallets[0].mine(lastHash, difficulty, data),
        wallets[1].mine(lastHash, difficulty, data),
        wallets[2].mine(lastHash, difficulty, data),
        wallets[3].mine(lastHash, difficulty, data),
        wallets[4].mine(lastHash, difficulty, data)
    ]).then(([wallet0Res, wallet1Res, wallet2Res, wallet3Res, wallet4Res]) => {
        console.log("\n--------------------------------------------------------------------------------------------------\n")
        process.env.PORT = 0;  
        let result = wallet0Res != null ? wallet0Res: wallet1Res != null ? wallet1Res : wallet2Res != null ? wallet2Res : wallet3Res != null ? wallet3Res : wallet4Res
        block = new Block({ lastHash: lastHash, difficulty: difficulty, nonce: result.nonce, timestamp: result.timestamp, rootHash: result.rootHash });
        //Validate Block
        if( block.rootHash === cryptoHash(lastHash, difficulty, result.nonce, result.timestamp, ...data) && result.timestamp > lastTimestamp )
            blockchain.addBlock(block)
        else
            console.log("Block can't be added! Verification failed.")
    }).catch((err) => console.log(err))    
}
