const zmq = require('zmq');

const transactionUtils = require('./utils/transactionUtils');

const sock = zmq.socket('sub');

sock.connect('tcp://127.0.0.1:29000');
sock.subscribe('rawtx');

sock.on('message', function(topic, message) {
  try {
    if (topic.toString() === 'rawtx') {
      console.log('topic.rawtx');
      const rawTxBin = message;
      const inputOutputs = transactionUtils.getInputOutputs(rawTxBin)
      console.log(JSON.stringify(inputOutputs, null, 4));
    }
  } catch(error){
    console.log(error)
  }
})
