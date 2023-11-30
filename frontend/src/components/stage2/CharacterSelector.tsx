import React from "react";
import { Weather, Jockey, Horse } from "./Weather";
import { useState } from "react";
type Stage2Props = {
  cb1: Function
  horseLst: Horse[]
}

const CharacterSelecter: React.FC<Stage2Props> = ({cb1, horseLst}) => {
  return (
    <div>
      <div style={{
        position: 'absolute', top: 0, left: 0, zIndex: 2, backgroundColor: 'rgba(0, 0, 0, 0.5)', width: "100%", height: "100%",
        display: 'flex', justifyContent: 'space-evenly', alignItems: 'center', flexWrap: 'wrap', 
      }}>
          {horseLst.map((horse, key) => {
              return (
                <div key={key} className="horse-card" onClick={() => {
                  cb1(() => true)
                }}>
                    {/* <div className="card-background"></div> */}
                    <div className="card-content">
                        <div className={`horse-${key}`}></div>
                        <div className="horse-info">
                            <span>NAME: {horse.name}</span>
                            <span>GEN: {key % 2 === 0 ? 'female' : 'male'}</span>
                            <span>CON : {horse.conditionPoint}</span>
                            <span>DEX : {horse.curvePoint}</span>
                            <span>SPD : {horse.drivePoint}</span>
                            <span>MAX : {horse.maxVelocity}</span>
                            <span>FTG : {Math.trunc(Math.random() * 10)}</span>
                        </div>
                    </div>
                </div>
              )
            })}
      </div>
    </div>
  )
}

export default CharacterSelecter;