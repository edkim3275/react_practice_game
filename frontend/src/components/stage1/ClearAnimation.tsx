import React, { createElement, useEffect } from "react"
import { useNavigate } from "react-router-dom";

type ClearAnimationProps = {
  idx: number
}

const ClearAnimation:React.FC<ClearAnimationProps> = ({idx}) => {
  const navigate= useNavigate();

  const renderCharacter = (idx: number) => {
    const character = document.getElementById('character')
    if (character) {
      character.classList.add('finish')
      character.classList.add(`char-${idx}`)
      character.classList.add(`activate${idx}`)
    }
  }

  useEffect(() => {
    renderCharacter(idx);
  }, [idx])

  return (
    <div style={{
      position: 'absolute', top: 0, left: 0, zIndex: 2, backgroundColor: 'rgba(0, 0, 0, 0.5)', width: 384, height: 416,
      display: 'flex', flexDirection: 'column', alignItems: 'center', color: 'white'
      }}>
        <div style={{
          position: 'absolute', top: 0, left: 0, 
        }}>
          <img src={require("../../assets/clipart4200974.png")} style={{
            position:'relative', width: "100%", 
          }}/>
          <div id="character"></div>
          <div style={{textAlign: 'center'}}>
            <span>Stage Complete!</span>
          </div>
        </div>
        {/* <span>go to the next stage</span>
        <button style={{display: "block", width: 150, padding: 5}} onClick={()=>{
            navigate("/stage/1");
        }}>
            go
        </button> */}
    </div>
  )
}

export default ClearAnimation;