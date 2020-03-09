import React, {useState, useRef, useEffect} from "react";
import { withRouter } from "react-router";

import socketIOClient from "socket.io-client";
import { TransactionList } from './TransactionList';
import { useStateRef } from './hooks/stateRef';

function getNetworkFromPathname(pathname) {
  if(pathname && pathname.split('/').length > 1){
    return pathname.split('/')[1];
  }
  return 'livenet';
}

function _LiveTx (props){

  const [transactions, setTransactions, refTransaction] = useStateRef([])

  useEffect(()=>{
    const socket = socketIOClient.connect();
    listenThreadIo(socket);
  },[])


  const network = getNetworkFromPathname(props.location.pathname);

  function pushTransaction(transaction){
    setTransactions([
      ...refTransaction.current,
      transaction
    ]);
  }

  function listenThreadIo(socket) {
    // listener for 'transaction' event, which updates transactions
    socket.on(`transaction-${network}`, (transaction) => {
      console.log(`transaction-${network}`, transaction);
      pushTransaction(transaction)
    });
  }

  return(
    <>
      <h2 align="center">Live dash transaction on {network}</h2>
      <TransactionList transactions={transactions}/>
    </>
  );

}

export const LiveTx = withRouter(_LiveTx);
