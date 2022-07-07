import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TileMap } from "./TileMap";
import { Player } from "./Player";

function Stage2() {
    const [ position, setPosition ] = useState({ x: 0, y: (32*12) });
    const [ frameSet, setFrameSet ] = useState({ name: "pressKey", startIndex: 0, endIndex: 1})
    const canvasRef = React.createRef<HTMLCanvasElement>();

    const useKeyDown = () => {
        useEffect(() => {
            function handle (event: KeyboardEvent) {
                switch (event.code) {
                    case 'ArrowDown':
                        event.preventDefault();
                        setFrameSet(state => ({ ...state, name: "moveDown"}))
                        // setPosition((state: { x: number, y: number }) => {
                        //     return { ...state, y: state.y + 32}                 
                        // })
                        break;
                    case 'ArrowUp':
                        event.preventDefault();
                        setFrameSet(state => ({ ...state, name: "moveUp"}))
                        // setPosition((state: { x: number, y: number }) => {
                        //     return { ...state, y: state.y - 32}
                        // })
                        break;
                    case 'ArrowRight':
                        console.log('arrow right clicked')
                        event.preventDefault();
                        setFrameSet(state => ({ ...state, name: "moveRight"}))
                        // setPosition((state: { x: number, y: number }) => {
                        //     return { ...state, x: state.x + 32}
                        // })
                        break;
                    case 'ArrowLeft':
                        event.preventDefault();
                        // setPosition((state: { x: number, y: number }) => {
                        //     return { ...state, x: state.x - 32}
                        // })
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
        <div className="stage1-wrapper">
            <h2>welcome to stage1</h2>
            <div className="stage1-container">
                {/* <Character x={position.x} y={position.y} /> */}
                <canvas ref={canvasRef}/>
                <aside>
                    <div style={{paddingLeft: 50}}>
                        <Link to="/">home</Link>
                    </div>
                </aside>
            </div>
        </div>
    )
}

export default Stage2;