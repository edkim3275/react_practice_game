import React, { useState } from "react";
import Character from "../components/Charactor";
import { useKey } from "../utils/Movement";

const Test: React.FC = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

    useKey(setPosition);

    return (
        <div>
            <h1>Test page</h1>
            <Character x={position.x} y={position.y} />
        </div>
    )
}

export default Test;