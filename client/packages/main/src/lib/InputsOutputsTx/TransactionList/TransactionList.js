import React, {useState, useRef, useEffect} from "react";

import { Transactions } from './Transactions';

export function TransactionList (props){

  const bottomRef = React.useRef(null);

  React.useEffect(() => {
    // We need to to this for the test in jest
    if(bottomRef && bottomRef.current && bottomRef.current.scrollIntoView){
      bottomRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
  });

  if(!props.transactions){
    return null;
  }

  return(
    <>
      <Transactions transactions={props.transactions} />
      <div id={'bottomRef'} ref={bottomRef}></div>
    </>
  );

}
