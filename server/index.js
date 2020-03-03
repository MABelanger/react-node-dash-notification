const zmq = require('zmq');
// const bitcoinJs = require('bitcoinjs-lib');
const dashcoreJs = require('@dashevo/dashcore-lib');

const sock = zmq.socket('sub');

sock.connect('tcp://127.0.0.1:29000');
sock.subscribe('rawtx');


function getRawTxHex(rawTxBin){
  const rawTxHex = rawTxBin.toString('hex');
  return rawTxHex;
}

function getTxObj(rawTxHex){
  const txObj = new dashcoreJs.Transaction(rawTxHex).toObject();
  return txObj;
}

function printTxObj(txObj) {
  console.log('\n\n\n' + 'txObj :', txObj);
}

function pritRawTxHex(rawTxHex) {
  console.log('\n\n\n' + 'rawTxHex :', rawTxHex);
}

sock.on('message', function(topic, message) {
  // console.log(i, topic.toString(), message.toString('hex'))
  if (topic.toString() === 'rawtx') {
    const rawTxBin = message;

    const rawTxHex = getRawTxHex(rawTxBin);
    pritRawTxHex(JSON.stringify(rawTxHex));

    const txObj = getTxObj(rawTxHex);
    printTxObj(JSON.stringify(txObj));
  }
})


// var raw_script = Buffer.from('4730440220649ea8f12070186a4b4f8e109d3fd5b804aa0d858644ae19c86443db81d510c80220121da5bc6a1cf833a4e5bc36166697cc2908f687e485a7b8d32893250a78254f0121034fec45bcb69c80eadb62d4baa023663647ff946ed814bfc88c7a7441291cf21a', 'hex');
// var s = new dashcoreJs.Script(raw_script);
// console.log(s.getPublicKey());
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
