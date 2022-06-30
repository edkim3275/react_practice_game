import React, { useState } from "react";
import { Link } from "react-router-dom";
import Cell from "../components/stage1/Cell";
import Character from "../components/Charactor";
import { useKey2 } from "../utils/Movement";



function Stage1() {
    const [charPosition, setcharPosition] = useState({ x: 11, y: 0 })
    // const [position, setPosition] = useState({ x: 0, y: 0 });

    // useKey2(setcharPosition);

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

        mapLst[charPosition.x][charPosition.y] = 3;
        // console.log(charPosition.x, charPosition.y)
        return mapLst
        
    }
    
    // type Props = {
    //     children?: JSX.Element,
    // }
    
    // const Map = ({ children }: Props) => {

    const keyDown = () => {
        // e.preventDefault();
        function handle (event: React.KeyboardEvent) {
            if(event.code === "up"){
    
                console.log(event);
            }
            let y: any; 
            return y;
            
        }

        // document.addEventListener("keydown", handle);
        console.log("hi");
        // return () => document.removeEventListener("keydown", handle);
    }
    
    const Map = () => {
        return (
            <div >
                {/* <div style={{position: "absolute", zIndex: 1}}>
                    {children}
                </div> */}
                <div className="map-wrapper">
                    {createMap().map(row => row.map((cell: number, x: number) => <Cell key={x} kind={cell} />))}
                </div>
            </div>
        )
    }

    keyDown();

    return (
        <div onClick={() => {console.log('dd')}} className="stage1-wrapper">
            <h2>welcome to stage1</h2>
            <div className="stage1-container">
                    {/* <Character x={position.x} y={position.y} /> */}
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

export default Stage1