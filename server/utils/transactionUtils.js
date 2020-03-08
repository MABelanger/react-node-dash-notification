const dashcoreJs = require('@dashevo/dashcore-lib');

function _getDash(satoshis){
  return (satoshis/100000000);
}

function _getAddress(rawScript){
  // const rawScript = '76a91465d6359fe9777d77560e54cb9135f792073cd88388ac';
  const txOut = new dashcoreJs.Script(rawScript, 'hex');
  return txOut.toAddress('testnet').toString();
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

function getInfoOfAddress(rawTransactionHex, _address){
  const transaction = new dashcoreJs.Transaction(rawTransactionHex);
  let infoOfAddress = null;

  const outputFound = transaction.outputs.find((output)=>{
    if(output.script){
      const address = _getAddress(output.script);
      return (address == _address);
    }
    return false;
  })

  return {
    address: _getAddress(outputFound.script),
    dash: _getDash(outputFound.satoshis)
  };
}


function _getInputs(transaction){
  let inputs = [];

  transaction.inputs.forEach((input)=>{
    if(input.script && input.prevTxId){
      inputs.push({
        address: _getAddress(input.script),
        prevTxId: input.prevTxId.toString('hex')
        // dash: input.satoshis
      })
    }
  });
  return inputs;
}

function _getOutputs(transaction){
  let outputs = [];

  transaction.outputs.forEach((output)=>{
    if(output.script && output.satoshis){
      outputs.push({
        address: _getAddress(output.script),
        dash: _getDash(output.satoshis)
      })
    }
  });
  return outputs;
}

function getInputsOutputsObj(rawTransactionBin){
  const rawTransactionHex = getRawTxHex(rawTransactionBin);
  const transaction = new dashcoreJs.Transaction(rawTransactionHex);

  let inputs = _getInputs(transaction);
  let outputs = _getOutputs(transaction);

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
