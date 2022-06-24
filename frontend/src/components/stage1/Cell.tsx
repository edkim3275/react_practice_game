import React from "react";

const Cell = (type: number) => {
  switch (type) {
    case 0:
      return (
        <div className="cell-wrapper">
          {/* <div style={{width:50, height:50, backgroundColor:"#aad8ff"}}>cell</div> */}
          <div className="cell"></div>
        </div>
      )
    case 1:
      return (
        <div className="obstacle" ></div >
      )
    case 2:
      return (
        <div className="goal" ></div >
      )

    default:
      break;
  }

}

export default Cell;