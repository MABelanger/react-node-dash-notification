import React, {useState, useRef, useEffect} from "react";

import socketIOClient from "socket.io-client";
import { TransactionList } from './TransactionList';
import { useStateRef } from './hooks/stateRef';

export function InputsOutputsTx (props){

  const [transactions, setTransactions, refTransaction] = useStateRef([])

  useEffect(()=>{
    const socket = socketIOClient.connect();
    listenThreadIo(socket);
  },[])

  function pushTransaction(transaction){
    setTransactions([
      ...refTransaction.current,
      transaction
    ]);
  }

  function listenThreadIo(socket) {
    // listener for 'thread' event, which updates transactions
    socket.on("thread", (transaction) => {
      console.log('thread', transaction);
      pushTransaction(transaction)
    });
  }

  return(
    <TransactionList transactions={transactions} />
  );

}
