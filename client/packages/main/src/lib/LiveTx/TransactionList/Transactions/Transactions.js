import React from "react";

import { Transaction } from './Transaction';

export function Transactions(props){
  return (
    props.transactions.map((transaction, i)=>{
      return (
        <Transaction key={i}
                     transaction={transaction}
                     number={i}
        />
      )
    })
  );
}
