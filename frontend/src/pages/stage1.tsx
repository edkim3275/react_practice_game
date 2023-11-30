import React, { useState, useEffect } from "react";
import Character from "../components/Charactor";
import { useKeyDown } from "../utils/Movement";
import { Link, useNavigate } from "react-router-dom";
import { TileMap } from "../components/stage1/TileMap";
import { Player } from "../components/stage1/Player";
import CharacterSelector from "../components/stage1/CharacterSelector";
import ClearAnimation from "../components/stage1/ClearAnimation";


function Stage1() {
    let navigate = useNavigate();
    // const [position, setPosition] = useState({ x: 0, y: 0 });
    const [ position, setPosition ] = useState({ x: 0, y: (32*12) });
    const [ frameSet, setFrameSet ] = useState({ name: "moveDown", startIndex: 0, endIndex: 1})
    const [ playerCanMove, setPlayerCanMove ] = useState(true);
    const [ stageComplete, setStageComplete ] = useState(false);
    const [ keyPressCount, setKeyPressCount ] = useState(0);
        // character 자체는 숫자로 표현해도 괜찮을 듯.
    const [ charType, setCharType] = useState('char-1')
    const [ charIsSelected, setCharIsSelected ] = useState(false);
    const [ stageClear, setStageClear ] = useState(false);
    const canvasRef = React.createRef<HTMLCanvasElement>();
    
    const [ selectedCharIdx, setSelectedCharIdx ] = useState(1);

    useEffect(() => {
        const tileMap = new TileMap(32);
        const player = new Player(charType, position.x, position.y, 48, frameSet, setPosition, setFrameSet, setPlayerCanMove, setStageComplete);
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
        if (stageComplete) {
            setStageClear(true)
        } else {
            setStageClear(false)
        }
    }, [canvasRef, position.x, position.y, stageComplete])
    
    // keydown이벤트 감지하여 frameSet설정
    useKeyDown(playerCanMove, charIsSelected, setFrameSet, setKeyPressCount, setCharIsSelected);

    return (
        <div className="stage1-wrapper">
            <h2>welcome to stage1</h2>
            <div className="stage1-container">
            
                <div>
                    <div className="stage1-container">
                        <div style={{position: 'relative'}}>
                            {stageClear ? <ClearAnimation idx={selectedCharIdx}/>: <></>}
                            {charIsSelected ? <></> : <CharacterSelector cb1={setCharIsSelected} cb2={setCharType} idx={selectedCharIdx} cb3={setSelectedCharIdx}/>}
                            <canvas ref={canvasRef} />
                            {stageClear ? <></> : <p style={{marginTop: 10, textAlign: 'center'}}>press 'r' key to retry</p>}
                        </div>

                        <div>
                            <aside style={{paddingLeft: 30, textAlign: 'center'}}>
                                <span>count</span>
                                <p style={{textAlign: 'center', marginTop: 10}}>{keyPressCount}</p>
                            </aside>
                            <aside style={{paddingLeft: 30, marginTop: 10}}>
                                <button style={{height: 30, borderWidth: 2, borderColor: 'rgb(39, 88, 144)', borderStyle: 'solid', paddingLeft: 10, paddingRight: 10, borderRadius: 10}}
                                onClick={() => {setCharIsSelected(false)}}>change character</button>
                            </aside>
                        </div>
                        
                    </div>
                    {stageComplete 
                    ? <div style={{display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
                        <span>stageComplete! go to the next stage</span>
                        <button style={{display: "block"}} onClick={()=>{
                            navigate("/stage/2", {
                                state: keyPressCount
                            });
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
                            setKeyPressCount((state: number) => 0)
                        }}>retry</button>
                    </div> 
                    : <></>}
            
                </div>
          
            </div>
        </div>
    )
}

export default Stage1