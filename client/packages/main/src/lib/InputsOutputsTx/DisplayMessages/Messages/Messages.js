import React from "react";

import { Message } from './Message';

export function Messages(props){
  return (
    props.messages.map((message, i)=>{
      return (
        <Message message={message}
                 number={i}
        />
      )
    })
  );
}
