import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cell from "../components/stage1/Cell";
import Character from "../components/Charactor";
import { useKey } from "../utils/Movement";

const createMap = () => {
    const n = 11;
    let mapLst: number[][] = [];
    for (let i = 0; i < n; i++) {
        let line = [];
        for (let j = 0; j < n; j++) {
            line.push(0)
        }
        mapLst.push(line);
    }
    mapLst[1][2] = 1; mapLst[4][5] = 1; mapLst[3][8] = 1;
    mapLst[5][3] = 1; mapLst[8][9] = 1; mapLst[10][0] = 1;
    mapLst.push([2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2])
    return (
        // Array.from(Array(11), () => 
        //   new Array(11).fill([0])
        // )
        mapLst
    )
}

type Props = {
    children?: JSX.Element,
}

const Map = ({ children }: Props) => {
    return (
        <div className="map-wrapper">
            {children}
            {createMap().map(row => row.map((cell: number, x: number) => <Cell key={x} kind={cell} />))}
        </div>
    )
}

function Stage1() {

    const [position, setPosition] = useState({ x: 0, y: 0 });

    useKey(setPosition);

    return (
        <div className="stage1-wrapper">
            <h2>welcome to stage1</h2>
            <div className="stage1-container">
                <Map >
                    <Character x={position.x} y={position.y} />

                </Map>
                <aside>
                    <div>
                        <Link to="/">home</Link>
                    </div>
                </aside>

            </div>
        </div>
    )
}

export default Stage1