const { GENESIS_BLOCK } = require('./constants')
class Blockchain {
    constructor() {
        this.blocks = this.addBlock(GENESIS_BLOCK);
    }
    addBlock(new_block) {
        let blockchain_init = []
        if(this.blocks == null) 
        {
            blockchain_init.push(new_block)
            console.log(".....Blockchain status.....")
            console.log(blockchain_init)
            console.log("\n--------------------------------------------------------------------------------------------------\n")
            return blockchain_init
        }
        else {
            this.blocks.push(new_block)
            console.log(".....Blockchain status.....")
            console.log(this.blocks)
            console.log("\n--------------------------------------------------------------------------------------------------\n")
            return this.blocks
        }
    }
}

module.exports = Blockchain