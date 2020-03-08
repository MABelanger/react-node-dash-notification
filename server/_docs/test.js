const dashcoreJs = require('@dashevo/dashcore-lib');




var rawTransactionHex = '0100000001b3260b80ff00720abd5f087e8498cb858200777338ea611159711714cb45efb3010000006a473044022076c8433685deac3396076a9f540cf9703480e7ba976564a0340bfb8acf0aa5dd022005080d63de528bcbec6cfbe86a6cc7c13ca8b707fdc0be90ef5a7a7e555935160121027ff789e190217f326906d1f26a81d6e4f55c9e33bff7e65264be134ba904286affffffff0200e1f505000000001976a914149968aa8086725f70d799c3852624b798da208088acdd5d2b19010000001976a914fd4a31786694a6f0a3c45023af95785811e28bae88ac00000000';
// var rawTransactionBuffer = Buffer.from('rawTransactionHex', 'hex');
var transaction = new dashcoreJs.Transaction(rawTransactionHex);

function getAddress(rawScript){
  // var rawScript = '76a91465d6359fe9777d77560e54cb9135f792073cd88388ac';
  var txOut = new dashcoreJs.Script(rawScript, 'hex');
  return txOut.toAddress('testnet').toString();
  // console.log(txOut.toAddress('testnet').toString());
}

/*
can we have two output tx with the same address in the same transaction ?
*/
function getInfoOfAddress(rawTransactionHex, _address){
  var transaction = new dashcoreJs.Transaction(rawTransactionHex);
  var infoOfAddress = null;

  var outputFound = transaction.outputs.find((output)=>{
    var address = getAddress(output.script);
    return (address == _address);
  })

  return {
    address: getAddress(outputFound.script),
    satoshis: outputFound.satoshis
  };
}

function getInputOutputs(rawTransactionHex){
  var transaction = new dashcoreJs.Transaction(rawTransactionHex);

  var inputs=[];
  var outputs=[];

  transaction.inputs.forEach((input)=>{
    inputs.push({
      address: getAddress(input.script),
      prevTxId: input.prevTxId.toString('hex')
      // satoshis: input.satoshis
    })
  })

  transaction.outputs.forEach((output)=>{
    outputs.push({
      address: getAddress(output.script),
      satoshis: output.satoshis
    })
  })

  return {
    inputs,
    outputs
  }
}

console.log(getInputOutputs(rawTransactionHex))



//console.log(Buffer.from(buffHex, 'hex').toString())

// var raw_script = Buffer.from('483045022100ad31c224959c2b10ab310207f8a60d653606eb4a7b81fb9aea1919136e23e66102202c8e020f3bdfacf0cd069b22c3dc3711291cdc19f837919dc9c6b8c10eeb766e0121034f17f60f4a15c0511eeed575b861075172460e7af4eb38bb350f6ddd4f809c67', 'hex');
// var a = new dashcoreJs.Script(raw_script);
// console.log(a.getPublicKey());

// var s = new dashcoreJs.Script(raw_script);
// console.log(s.getPublicKeyHash());
// 'OP_2 33 0x022df8750480ad5b26950b25c7ba79d3e37d75f640f8e5d9bcd5b150a0f85014da 33 0x03e3818b65bcc73a7d64064106a859cc1a5a728c4345ff0b641209fba0d90de6e9 33 0x021f2f6e1e50cb6a953935c3601284925decd3fd21bc445712576873fb8c6ebc18 OP_3 OP_CHECKMULTISIG'

// s.isPublicKeyHashOut() // false
// s.isScriptHashOut() // false
// s.isMultisigOut() // true

// sock.on('message', function(topic, message) {
//   // console.log(i, topic.toString(), message.toString('hex'))
//   if (topic.toString() === 'rawtx') {
//       let rawTx = message.toString('hex');
//       let tx = bitcoinJs.Transaction.fromHex(rawTx);
//       console.log('tx', tx);
//       let txid = tx.getId();
//       tx.ins = tx.ins.map((txIn)=>{
//           txIn.address = bitcoinJs.address.fromOutputScript(txIn.script, bitcoinJs.networks.testnet);
//           return txIn;
//       });
//       tx.outs = tx.outs.map((txOut)=>{
//           txOut.address = bitcoinJs.address.fromOutputScript(txOut.script, bitcoinJs.networks.testnet);
//           return txOut;
//       });
//       console.log('received transaction', txid, tx);
//   }
// })
