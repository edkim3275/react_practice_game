import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { TileMap } from "./TileMap";
import { Player } from "./Player";

// 커스텀훅 사용해보기
function Stage2() {
    const [ position, setPosition ] = useState({ x: 0, y: (32*12) });
    const [ frameSet, setFrameSet ] = useState({ name: "pressKey", startIndex: 0, endIndex: 1})
    const canvasRef = React.createRef<HTMLCanvasElement>();

    const useKeyDown = () => {
        useEffect(() => {
            function handle (event: KeyboardEvent) {
                
                // switch (event.code) {
                //     case 'ArrowUp':
                //         event.preventDefault();
                //         console.log('up')
                //         setcharPosition((current : { x: number, y: number }) => ({
                //             ...current, x: current.x - 1
                //         }))
                //         // callbackRef.current((state: { x: number, y: number }) => ({ ...state, x: state.x + 1 }));
                //         break;
                //     default:
                //         console.log(event.code);
                // }
                switch (event.code) {
                    case 'ArrowDown':
                        event.preventDefault();
                        setFrameSet(state => ({ ...state, name: "moveDown"}))
                        // setPosition((state: { x: number, y: number }) => {
                        //     return { ...state, y: state.y + 4}                 
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
                    // case 'ArrowUp':
                    //     event.preventDefault();
                    //     console.log('moveToUp');
                    //     console.log(event.repeat)
                    //     if (charPosition.x === 0 || createMap()[charPosition.x - 1][charPosition.y] === 1) {
                    //         console.log('is obstacle or out of range')
                    //         return 
                    //     } else { // 이외의 경우에는 주욱 만날때까지 직진
                    //         let count = 0
                    //         // 장애물을 만나거나, 범위를 벗어나거나
                    //         while (charPosition.x - count > -1 && createMap()[charPosition.x - count][charPosition.y] !== 1) {
                    //             count++
                    //         }
                    //         for (let i = 0; i < count-1; i++) {
                    //             setcharPosition((state : {x:number, y:number}) => {
                    //                 console.log('현재위치', state.x, state.y)
                    //                 return { ...state, x: state.x - 1}
                    //             })
                    //         }
                    //     }   
                    //     break;
                    // case 'ArrowRight':
                    //     event.preventDefault();
                    //     console.log('moveToRight');
                    //     setcharPosition((state: { x: number, y: number }) => {
                    //         // 범위를 벗어날 경우 혹은 장애물을 만날경우
                    //         if (state.y + 1 === 11 || createMap()[state.x][state.y + 1] === 1) {
                    //             console.log('is obstacle or out of range')
                    //             return state
                    //         } else if (state.x === 11) { // 시작범위인 경우
                    //             console.log('is start')
                    //             return { ...state, y: state.y + 1 }
                    //         } else { // 이외의 경우에는 주욱 만날때까지 직진
                    //             let count = 0
                    //             // 장애물을 만나거나, 범위를 벗어나거나
                    //             while (state.y + count < 11 && createMap()[state.x][state.y + count] !== 1) {
                    //                 count++
                    //             }
                    //             console.log(`${count}번 가면 더 이상 가지 못합니다.`)
                    //             return { ...state, y: state.y + count - 1}
                    //         }                        
                    //     })
                    //     break;

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
        const player = new Player(position.x, position.y, 48, frameSet, setPosition);
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