import React from "react";
import { Link } from "react-router-dom";

const StageSelect: React.FC = () => {
  return (
    <div>
      <h1>stage select</h1>
      <ul>
        <li>
          <Link to="1">stage1</Link>
        </li>
      </ul>
    </div>
  )
}

export default StageSelect