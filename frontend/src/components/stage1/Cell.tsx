import React from "react";

type Props = {
  kind: number;
}

const Cell: React.FC<Props> = ({ kind }) => {
  switch (kind) {
    case 0:
      return <div className="cell"></div>;
    case 1:
      return <div className="obstacle"></div>;
    case 2:
      return <div className="start-area"></div>;
    case 3:
      return <div className="character"></div>;
    case 4:
      return <div className="goal"></div>;
    default:
      return <div className="cell"></div>;
  }
}

export default Cell;