import React from "react";

export function Message(props){
  return (
    <div key={props.number}>
      <hr/>
      <h4>tx number: {props.number}</h4>
      <pre>
        {
          JSON.stringify(props.message, null, 4)
        }
      </pre>
    </div>
  )

}
