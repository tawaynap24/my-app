import React from "react";

// const Q = ['a','b','c','d','e','f','g']
const Q = ['a','b','c']
const z = 5;

function Uploadd() {

  const BB = () => {
    var y = 1;
    for(var i=0;i<z;i++){
    Q.push(Q[0],Q[0])
    Q.splice(0,1);
    y=y+1;
    if(y==z){
      console.log(Q);
      console.log(Q[z-1]);
      break;
    }

    }
  }

  return (
    <div className="condiv">
      <div className="zone">
        <button onClick={() => {BB()}}>AA</button>
      </div>
    </div>
  )
}

export default Uploadd;