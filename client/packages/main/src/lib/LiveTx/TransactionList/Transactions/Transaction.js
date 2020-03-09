import React from "react";

export function Transaction(props){
  return (
    <div key={props.number}>
      <hr/>
      <h4>tx number: {props.number}</h4>
      <pre>
        {
          JSON.stringify(props.transaction, null, 2)
        }
      </pre>
    </div>
  )

}
