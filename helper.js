const EC = require('elliptic').ec;
const ec = new EC('secp256k1'); // Standards of Efficient Cryptography Prime Koblitz version 1
const crypto = require('crypto');

// ... Spread Operator -> To convert String input to char array
const cryptoHash = (...inputs) => {
  const hash = crypto.createHash('sha256');
  hash.update(inputs.map(input => JSON.stringify(input)).sort().join(' '));
  return hash.digest('hex');
};

const verifySignature = ({publicKey, data, signature}) => {
    const keyFromPublic = ec.keyFromPublic(publicKey, 'hex');
    return keyFromPublic.verify(cryptoHash(data), signature) 
};

module.exports = { ec, cryptoHash, verifySignature };