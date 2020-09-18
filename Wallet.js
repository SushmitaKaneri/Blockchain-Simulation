const {STARTING_BALANCE, mine_result} = require('./constants')
const { ec, cryptoHash } = require('./helper');

class Wallet {
    constructor() {
        this.balance = STARTING_BALANCE;
        this.keyPair = ec.genKeyPair();
        this.publicKey = this.keyPair.getPublic().encode('hex');
    }

    sign(data) {
        return this.keyPair.sign(cryptoHash(data))
    }

    mine(lastHash, difficulty, data) {
        if(process.env.PORT == 0) {
            let nonce = 0;
            let timestamp, hash;
            let flag = false;
            console.log("......"+this.publicKey.substring(0,7)+"... is Mining.....")
            do {
                nonce++;
                timestamp = Date.now()
                hash = cryptoHash(lastHash, difficulty, nonce, timestamp, ...data);
                console.log(hash)
                if( mine_result == 1) flag = true
            } while( hash.substring(0, difficulty) !== '0'.repeat(difficulty) && 
            process.env.PORT == 0)
            process.env.PORT = 1;  
            if(flag) return null;
            return {
                nonce : nonce,
                timestamp : timestamp,
                rootHash : hash
            }
        }
        else return null;
    }
}

module.exports = Wallet;