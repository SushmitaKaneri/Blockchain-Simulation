class Block {
    constructor({ lastHash, difficulty, nonce, timestamp, rootHash }) {
        this.lastHash = lastHash;
        this.difficulty = difficulty;
        this.nonce = nonce
        this.timestamp = timestamp;
        this.rootHash = rootHash
    }
}

module.exports = Block