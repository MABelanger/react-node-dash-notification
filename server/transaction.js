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

function getAddress(rawScript){
  // const rawScript = '76a91465d6359fe9777d77560e54cb9135f792073cd88388ac';
  const txOut = new dashcoreJs.Script(rawScript, 'hex');
  return txOut.toAddress('testnet').toString();
  // console.log(txOut.toAddress('testnet').toString());
}

/*
can we have two output tx with the same address in the same transaction ?
*/
function getInfoOfAddress(rawTransactionHex, _address){
  const transaction = new dashcoreJs.Transaction(rawTransactionHex);
  let infoOfAddress = null;

  const outputFound = transaction.outputs.find((output)=>{
    if(output.script){
      const address = getAddress(output.script);
      return (address == _address);
    }
    return false;
  })

  return {
    address: getAddress(outputFound.script),
    satoshis: outputFound.satoshis
  };
}

function getInputOutputs(rawTransactionHex){
  const transaction = new dashcoreJs.Transaction(rawTransactionHex);

  let inputs=[];
  let outputs=[];

  transaction.inputs.forEach((input)=>{
    if(input.script && input.prevTxId){
      inputs.push({
        address: getAddress(input.script),
        prevTxId: input.prevTxId.toString('hex')
        // satoshis: input.satoshis
      })
    }
  })

  transaction.outputs.forEach((output)=>{
    if(output.script && output.satoshis){
      outputs.push({
        address: getAddress(output.script),
        satoshis: output.satoshis
      })
    }
  })

  return {
    inputs,
    outputs
  }
}


sock.on('message', function(topic, message) {
  // console.log(i, topic.toString(), message.toString('hex'))
  try {
    if (topic.toString() === 'rawtx') {
      console.log('topic.rawtx');
      const rawTxBin = message;

      const rawTxHex = getRawTxHex(rawTxBin);
      // pritRawTxHex(JSON.stringify(rawTxHex));
      //
      // const txObj = getTxObj(rawTxHex);
      // printTxObj(JSON.stringify(txObj));
      const inputOutputs = getInputOutputs(rawTxHex)
      console.log(JSON.stringify(inputOutputs, null, 4));
    }
  } catch(error){
    console.log(error)
  }

})

// sock.on('message', function(topic, message) {
//   // console.log(i, topic.toString(), message.toString('hex'))
//   if (topic.toString() === 'rawtx') {
//     const rawTxBin = message;
//
//     const rawTxHex = getRawTxHex(rawTxBin);
//     console.log(getInputOutputs(rawTxHex))
//     console.log('-------');
//     // pritRawTxHex(JSON.stringify(rawTxHex));
//     //
//     // const txObj = getTxObj(rawTxHex);
//     // printTxObj(JSON.stringify(txObj));
//   }
// })






//console.log(Buffer.from(buffHex, 'hex').toString())

// const raw_script = Buffer.from('483045022100ad31c224959c2b10ab310207f8a60d653606eb4a7b81fb9aea1919136e23e66102202c8e020f3bdfacf0cd069b22c3dc3711291cdc19f837919dc9c6b8c10eeb766e0121034f17f60f4a15c0511eeed575b861075172460e7af4eb38bb350f6ddd4f809c67', 'hex');
// const a = new dashcoreJs.Script(raw_script);
// console.log(a.getPublicKey());

// const s = new dashcoreJs.Script(raw_script);
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
