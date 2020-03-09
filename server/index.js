const zmq = require('zmq');
const express = require("express");
const app = express();
const server = require("http").createServer(app);
const socketIoServer = require("socket.io")(server);
const dotenv = require('dotenv');
const envUtils = require('./utils/envUtils');

const transactionUtils = require('./utils/transactionUtils');
const printUtils = require('./utils/printUtils');

const sock = zmq.socket('sub');

sock.connect('tcp://127.0.0.1:29000');
sock.subscribe('rawtx');


// read .env file and add it to process.env
dotenv.config();
// use the default env if .env is not set.
if(!(process.env.NODE_ENV === "development" || process.env.NODE_ENV === "production")) {
  envUtils.overwriteEnv('.env.default.development')
}


function fakeTransaction(){
  txObj = {
    inputs: [
        {
            address: "ygDRUDuy2Xbo62iQEorHWtJFKj6Tbd4cE9",
            prevTxId: "b686efc2d439a85c705f9f6fe13c2a609e8d892321240daeac95eabc03eb5c9b"
        }
    ],
    outputs: [
        {
            address: "yM4dNQ2qjzvaCyGwBchQWSkZgKbuKNEq4L",
            dash: 45.49549773
        },
        {
            address: "yLdtgiCu5YrmQMd5b2GMBBPvDFeBSWqHQ1",
            dash: 1
        }
    ]
  };
  socketIoServer.sockets.emit('transaction', txObj);
}

socketIoServer.on("connection", function(client) {
  // transaction from client...
  client.on("join", function(data) {
    console.log("join", data);
  });

  client.on("transaction", function(transaction) {
    console.log("transaction", transaction);
  });

  // send messsage from server to client
  // client.emit("transaction", 'transaction');
  // client.broadcast.emit("transaction", 'hello');


});


sock.on('transaction', function(topic, transaction) {
  try {
    if (topic.toString() === 'rawtx') {
      console.log('topic.rawtx');
      const rawTxBin = transaction;

      // rawTxHex
      const rawTxHex = transactionUtils.getRawTxHex(rawTxBin);
      printUtils.pritRawTxHex(rawTxHex);

      // inputOutputs
      const inputOutputs = transactionUtils.getInputsOutputsObj(rawTxBin);
      console.log(JSON.stringify(inputOutputs, null, 4));

      socketIoServer.sockets.emit('transaction', inputOutputs);
    }
  } catch(error){
    console.log(error)
  }
})

// setInterval(()=>{
//   fakeTransaction();
// }, 1000)


server.listen(process.env.PORT);

console.log('server listen on *:' + process.env.PORT)
