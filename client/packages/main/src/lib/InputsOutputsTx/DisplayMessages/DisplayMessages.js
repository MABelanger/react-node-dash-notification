import React, {useState, useRef, useEffect} from "react";
import { Message } from './Message';

export function DisplayMessages (props){

  const bottomRef = React.useRef(null);

  React.useEffect(() => {
    // We need to to this for the test in jest
    if(bottomRef && bottomRef.current && bottomRef.current.scrollIntoView){
      bottomRef.current.scrollIntoView({ block: 'end', behavior: 'smooth' });
    }
  });

  if(!props.messages){
    return null;
  }

  function renderMessages(messages){
    return (
      messages.map((message, i)=>{
        return (
          <Message message={message}
                    number={i}
          />
        )
      })
    );
  }

  return(
    <>
      {renderMessages(props.messages)}
      <div id={'bottomRef'} ref={bottomRef}></div>
    </>
  );

}
