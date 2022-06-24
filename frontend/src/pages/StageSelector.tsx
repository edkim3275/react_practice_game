import React from "react";
import { Link } from "react-router-dom";

function StageSelect() {
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

export default StageSelect;