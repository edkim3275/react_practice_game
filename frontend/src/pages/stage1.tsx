import React from "react";
import { Link } from "react-router-dom";
import Cell from "../components/stage1/Cell";

const createMap = () => {
    return (
        Array.from(Array(11), () =>
            new Array(11).fill([0])
        )
    )
}

const Map = () => {
    return (
        <div>test</div>
        // <div className="map-wrapper">
        //     {createMap().map(row => row.map((cell, x) => <Cell key={x} type={cell[0]} />))}
        // </div>
    )
}

function Stage1() {

    return (
        <div className="stage1-wrapper">
            <h2>welcome to stage1</h2>
            <div className="stage1-container">
                <Map />
                <aside>
                    <div>
                        <Link to="/">home</Link>
                    </div>
                </aside>

            </div>
        </div>
    )
}

export default Stage1;