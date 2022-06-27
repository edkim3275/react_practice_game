import React from "react";
import { Link } from "react-router-dom";

const Main: React.FC = () => {
  return (
    <div>
      <h1>main page</h1>
      <Link to="stage">stage select</Link>
    </div>
  )
}

export default Main;