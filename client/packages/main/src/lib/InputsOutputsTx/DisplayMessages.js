import React, {useState, useRef, useEffect} from "react";

export function DisplayMessages (props){

  console.log('props.messages', props.messages);
  
  if(!props.messages){
    return null;
  }


  return(
    <pre>
      {props.messages.map((message)=>{
        return JSON.stringify(message, null, 4);
      })}
    </pre>
  );

}
