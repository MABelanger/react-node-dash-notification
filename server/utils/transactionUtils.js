const dashcoreJs = require('@dashevo/dashcore-lib');

function _getDash(satoshis){
  return (satoshis/100000000);
}

function _getAddress(rawScript, network){
  // const rawScript = '76a91465d6359fe9777d77560e54cb9135f792073cd88388ac';
  const txOut = new dashcoreJs.Script(rawScript, 'hex');
  return txOut.toAddress(network).toString();
  // console.log(txOut.toAddress('testnet').toString());
}

function getRawTxHex(rawTxBin){
  const rawTxHex = rawTxBin.toString('hex');
  return rawTxHex;
}

function getTxObj(rawTxHex){
  const txObj = new dashcoreJs.Transaction(rawTxHex).toObject();
  return txObj;
}

function getInfoOfAddress(rawTransactionHex, _address, network){
  const transaction = new dashcoreJs.Transaction(rawTransactionHex);
  let infoOfAddress = null;

  const outputFound = transaction.outputs.find((output)=>{
    if(output.script){
      const address = _getAddress(output.script, network);
      return (address == _address);
    }
    return false;
  })

  return {
    address: _getAddress(outputFound.script, network),
    dash: _getDash(outputFound.satoshis)
  };
}


function _getInputs(transaction, network){
  let inputs = [];

  transaction.inputs.forEach((input)=>{
    if(input.script && input.prevTxId){
      inputs.push({
        address: _getAddress(input.script, network),
        prevTxId: input.prevTxId.toString('hex')
        // dash: input.satoshis
      })
    }
  });
  return inputs;
}

function _getOutputs(transaction, network){
  let outputs = [];

  transaction.outputs.forEach((output)=>{
    if(output.script && output.satoshis){
      outputs.push({
        address: _getAddress(output.script, network),
        dash: _getDash(output.satoshis)
      })
    }
  });
  return outputs;
}

function getInputsOutputsObj(rawTransactionBin, network){
  const rawTransactionHex = getRawTxHex(rawTransactionBin);
  const transaction = new dashcoreJs.Transaction(rawTransactionHex);

  let inputs = _getInputs(transaction, network);
  let outputs = _getOutputs(transaction, network);

  return {
    inputs,
    outputs
  }
}

module.exports = {
  getTxObj,
  getRawTxHex,
  getInfoOfAddress,
  getInputsOutputsObj
};
