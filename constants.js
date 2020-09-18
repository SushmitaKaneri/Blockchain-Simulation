const STARTING_BALANCE = 1000;
let DIFFICULTY = 1;
const BLOCK_TRANSACTIONS = 4;
const mine_result = 0;
process.env.PORT = mine_result;  


const GENESIS_BLOCK = {
    lastHash : "****",
    difficulty : DIFFICULTY,
    nonce : 0,
    timestamp : Date.now(),
    rootHash : "****"
}

module.exports = { STARTING_BALANCE, DIFFICULTY, GENESIS_BLOCK, BLOCK_TRANSACTIONS, mine_result }