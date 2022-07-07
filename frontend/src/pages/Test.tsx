import React, { useState, useEffect } from "react";
import Character from "../components/Charactor";
import { useKey } from "../utils/Movement";
import { Link } from "react-router-dom";
import { TileMap } from "./TileMap";
import { Player } from "./Player";

const Test: React.FC = () => {
    // const [position, setPosition] = useState({ x: 0, y: 0 });
    const [ position, setPosition ] = useState({ x: 0, y: (32*12) });
    const [ frameSet, setFrameSet ] = useState({ name: "pressKey", startIndex: 0, endIndex: 1})
    const canvasRef = React.createRef<HTMLCanvasElement>();

    // useKey(setPosition);

    const useKeyDown = () => {
        useEffect(() => {
            function handle (event: KeyboardEvent) {
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
                        console.log('arrow right clicked')
                        event.preventDefault();
                        setFrameSet(state => ({ ...state, name: "moveRight"}))
                        break;
                    case 'ArrowLeft':
                        event.preventDefault();
                        setFrameSet((state: {name: string, startIndex: number, endIndex: number}) => {
                            return { ...state, name: "moveLeft"}
                        })
                        break;
                    default:
                        console.log(event.code);
                }
            }
            document.addEventListener("keydown", handle);
            return () => document.removeEventListener("keydown", handle);
        })
    }
    
    useEffect(() => {   
        const tileMap = new TileMap(32);
        const player = new Player(position.x, position.y, 48, frameSet, setPosition, setFrameSet);
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
    }, [canvasRef, position.x, position.y])

    useKeyDown();
    
    return (
        <div>
            <h1>Test page</h1>
            {/* <Character x={position.x} y={position.y} /> */}
            <canvas ref={canvasRef}/>
        </div>  
    )

}

export default Test;