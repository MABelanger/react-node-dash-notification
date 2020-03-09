import React, {useState, useRef, useEffect} from "react";

import socketIOClient from "socket.io-client";
import { DisplayMessages } from './DisplayMessages';
import { useStateRef } from './hooks/stateRef';

export function InputsOutputsTx (props){

  const [messages, setMessages, refMessage] = useStateRef([])

  useEffect(()=>{
    const socket = socketIOClient.connect();
    listenThreadIo(socket);
  },[])

  function pushMessage(message){
    setMessages([
      ...refMessage.current,
      message
    ]);
  }

  function listenThreadIo(socket) {
    // listener for 'thread' event, which updates messages
    socket.on("thread", (message) => {
      console.log('thread', message);
      pushMessage(message)
    });
  }

  return(
    <DisplayMessages messages={messages} />
  );

}
