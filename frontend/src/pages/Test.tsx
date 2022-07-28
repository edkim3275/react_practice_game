import React, { useState, useEffect } from "react";
import Character from "../components/Charactor";
import { useKey } from "../utils/Movement";
import { Link, useNavigate } from "react-router-dom";
import { TileMap } from "./TileMap";
import { Player } from "./Player";

const Test: React.FC = () => {
    let navigate = useNavigate();
    // const [position, setPosition] = useState({ x: 0, y: 0 });
    const [ position, setPosition ] = useState({ x: 0, y: (32*12) });
    const [ frameSet, setFrameSet ] = useState({ name: "moveDown", startIndex: 0, endIndex: 1})
    const [ playerCanMove, setPlayerCanMove ] = useState(true);
    const [ stageComplete, setStageComplete ] = useState(false);
    const canvasRef = React.createRef<HTMLCanvasElement>();

    // useKey(setPosition);

    const useKeyDown = () => {
        useEffect(() => {
            function handle (event: KeyboardEvent) {
                if (playerCanMove) {
                    switch (event.code) {
                        case 'ArrowDown':
                            event.preventDefault();
                            setFrameSet(state => ({ ...state, name: "moveDown"}))
                            break;
                        case 'ArrowUp':
                            event.preventDefault();
                            setFrameSet(state => ({ ...state, name: "moveUp"}))
                            break;
                        case 'ArrowRight':
                            event.preventDefault();
                            setFrameSet(state => ({ ...state, name: "moveRight"}))
                            break;
                        case 'ArrowLeft':
                            event.preventDefault();
                            setFrameSet(state => ({ ...state, name: "moveLeft"}))
                            break;
                        case 'KeyR':
                            event.preventDefault();
                            setFrameSet(state => ({ ...state, name: "response"}))
                            break;
                        default:
                            console.log(event.code);
                    }
                }
            }
            document.addEventListener("keydown", handle);
            return () => document.removeEventListener("keydown", handle);
        })
    }
    
    useEffect(() => {
        const tileMap = new TileMap(32);
        const player = new Player(position.x, position.y, 48, frameSet, setPosition, setFrameSet, setPlayerCanMove, setStageComplete);
        const draw = () => {
            if (!canvasRef.current) return;
            const canvas : HTMLCanvasElement = canvasRef.current;
            const context = canvas?.getContext('2d');
    
            if (!context) return;

            tileMap.draw(canvas, context);
            player.draw(canvas, context);

            requestAnimationFrame(draw);
        }
        draw();
    }, [canvasRef, position.x, position.y, stageComplete])

    useKeyDown();
    
    return (
        <div>
            <h1>Test page</h1>
            {/* <Character x={position.x} y={position.y} /> */}
            <div>
                <canvas ref={canvasRef}/>
                {stageComplete 
                ? <div>
                    <span>stageComplete!</span>
                    <span>go to the next stage</span>
                    <button style={{display: "block"}} onClick={()=>{
                        navigate("/stage");
                    }}>
                        go
                    </button>
                    <button onClick={()=>{
                        setStageComplete(false); 
                        setPlayerCanMove(true)
                        setPosition((state : { x: number, y: number }) => ({
                            ...state, x: 0, y: 32*12
                          }))
                        setFrameSet((state : { name: string, startIndex: number, endIndex: number}) => ({ ...state, name: "pressKey"}))
                    }}>retry</button>
                </div> 
                : <></>}
            </div>

        </div>  
    )

}

export default Test;