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
    // listener for 'transaction' event, which updates transactions
    socket.on("transaction", (transaction) => {
      console.log('transaction', transaction);
      pushTransaction(transaction)
    });
  }

  return(
    <TransactionList transactions={transactions} />
  );

}
