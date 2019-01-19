const { STARTING_BALANCE } = require('../config')
const { ec, cryptoHash } = require('../util')
const Transaction = require('./transaction');

class Wallet{
  constructor() {
    this.balance = STARTING_BALANCE;

    this.keyPair = ec.genKeyPair();

    this.publicKey = this.keyPair.getPublic().encode('hex');
  }

  sign(data) {
    return this.keyPair.sign(cryptoHash(data))
  }

  createTransaction({ recipient, amount}) {
    if (amount > this.balance) {
      throw new Error('Amount exceeds balance');
    }

    return new Transaction({ senderWallet: this, recipient, amount});
  };
};

module.exports = Wallet

// const secureRandom = require('secure-random')

// // let privateKey = secureRandom.randomBuffer(32)

// const max = Buffer.from("0xFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFFEBAAEDCE6AF48A03BBFD25E8CD0364140", 'hex');
// let isInvalid = true;
// let privateKey;
// while (isInvalid) {
//   privateKey = secureRandom.randomBuffer(32);
//   if (Buffer.compare(max, privateKey) === 1) {
//     isInvalid = false;
//   }
// }

// console.log('Private key', privateKey.toString('hex'))
