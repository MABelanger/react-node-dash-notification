const zmq = require('zmq');
const bitcoinJs = require('bitcoinjs-lib');
const dashcoreJs = require('@dashevo/dashcore-lib');

const sock = zmq.socket('sub');


sock.connect('tcp://127.0.0.1:29000');
sock.subscribe('rawtx');


const rawTxExample = '03000500010000000000000000000000000000000000000000000000000000000000000000ffffffff4c03c3320404fa515c5e08fabe6d6d000017fc658aef2c000017fc52a6424100000000000000000000234648b90a0801000000000000004fffebbc000000000d2f6e6f64655374726174756d2f000000000231fc433e000000001976a914cb594917ad4e5849688ec63f29a0f7f3badb5da688ac22fc433e000000001976a9142fd0e16c05bbbcdc388d4807b5cbe5f45389eb2d88ac00000000460200c3320400f1475363936f3b9cfb06c2152b044a8f9502bda6afe7d6ef1d9cb2373b8d09ed2cc8f04ccbd4f1bcb7080fdd896ed03c39c76b2d3b7701b57427eef1efe788a3';


function getObjTx(rawTx){
  var objTx = new dashcoreJs.Transaction(rawTx);
  console.log('\n\n\n' + objTx.id + ':', objTx.toObject());
}
var tx = new dashcoreJs.Transaction(rawTxExample);
console.log('\n\n\n' + tx.id + ':', tx.toObject());

sock.on('message', function(topic, message) {
  // console.log(i, topic.toString(), message.toString('hex'))
  if (topic.toString() === 'rawtx') {
      var rawTx = message.toString('hex');
      var objTx = new dashcoreJs.Transaction(rawTx);
      console.log('\n\n\n' + objTx.id + ':', objTx.toObject());
  }
})



// sock.on('message', function(topic, message) {
//   // console.log(i, topic.toString(), message.toString('hex'))
//   if (topic.toString() === 'rawtx') {
//       var rawTx = message.toString('hex');
//       var tx = bitcoinJs.Transaction.fromHex(rawTx);
//       console.log('tx', tx);
//       var txid = tx.getId();
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
