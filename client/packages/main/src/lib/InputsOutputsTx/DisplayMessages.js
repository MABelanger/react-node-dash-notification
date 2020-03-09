import React, {useState, useRef, useEffect} from "react";

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

  return(
    <>
      {props.messages.map((message, i)=>{
        return (
          <>
            <hr/>
            <h4>tx number: {i}</h4>
            <pre>
              {JSON.stringify(message, null, 4)}
            </pre>
          </>
        )
      })}
      <div id={'bottomRef'} ref={bottomRef}></div>
    </>
  );

}
