import React, { useState, CSSProperties } from "react";
// import ClipLoader from "react-spinners/ClipLoader";
import ClimbingBoxLoader from "react-spinners/ClimbingBoxLoader";
import "./ComponentLoading.css"
const override: CSSProperties = {
  display: "block",
  margin: "0 auto",
  borderColor: "red",
};
function Loading() {



  return (
    <div className="ComponentLoading"> 
    <ClimbingBoxLoader 
    color="#36d7b7"
    speedMultiplier={2}
    size={32}
    /> 
    </div>
   

      


  );
}

export default Loading;