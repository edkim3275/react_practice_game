import React, { useState, useEffect, useRef } from 'react';
import { Weather, Jockey, Horse } from "../components/stage2/Weather";
import { Stage2Map } from '../components/stage2/Map';
import CharacterSelecter from '../components/stage2/CharacterSelector';
import { useLocation, useParams } from 'react-router-dom';

const weather = new Weather().weather;
const Jockey1 = new Jockey(weather);
const Jockey2 = new Jockey(weather);
const Jockey3 = new Jockey(weather);
const Jockey4 = new Jockey(weather);
const jockeyP1 = Jockey1.getStat()
const jockeyP2 = Jockey2.getStat()
const jockeyP3 = Jockey3.getStat()
const jockeyP4 = Jockey4.getStat()
const horse1 = new Horse(jockeyP1, 0, 0, weather, 'Gold Ship')
const horse2 = new Horse(jockeyP2, 1, 1, weather, 'Orange Star')
const horse3 = new Horse(jockeyP3, 2, 2, weather, 'Sky Blue')
const horse4 = new Horse(jockeyP4, 3, 3, weather, 'Special Wind')
const horseLst = [horse1, horse2, horse3, horse4]

const Stage2 = () => {
  const location = useLocation();
  const canvasRef = React.createRef<HTMLCanvasElement>();
  const [ charIsSelected, setCharIsSelected ] = useState(false);
  const [ betting, setbetting ] = useState(false);
  const [ isStart, SetIsStart ] = useState(false);
  const [ rank, setRank ] = useState();
  
  useEffect(() => {
    const stage2Map = new Stage2Map(weather, 70);

    const draw = () => {
      if (!canvasRef.current) return
      const canvas: HTMLCanvasElement = canvasRef.current;
      const context = canvas?.getContext('2d')
      if (!context) return;
      
      stage2Map.draw(canvas, context)
      if (isStart) {
        horse1.draw(context)
        horse2.draw(context)
        horse3.draw(context)
        horse4.draw(context)
      }

      requestAnimationFrame(draw)
    }
    draw();
  }, [isStart])

  const gameCount = () => {
    setTimeout(() => {
      SetIsStart(true)
    }, 3000)
  }

  function gameStart() {
    const stat = horse1.getStat()
    let arr:any[] = [];
    horseLst.map((horse, key) => {
      if (key === 0) {
        arr.push([horse.name, horse.getStat().avg])
      } else {
        if (horse.getStat().avg >= arr[0]) {
          arr.push([horse.name, horse.getStat().avg])
        } else {
          arr.unshift([horse.name, horse.getStat().avg])
        }
      }
    })
    arr.sort((a, b) => b[1] - a[1])
    console.log(arr)
    SetIsStart(true)
  }

  return (
    <div style={{display: 'flex', flexDirection:'column', justifyContent: 'center', alignItems: 'center'}}>
      <div style={{position: 'relative'}}>
        {charIsSelected ? <></> : <CharacterSelecter cb1={setCharIsSelected} horseLst={horseLst}/>}
        {charIsSelected && !betting 
        ? <div style={{
          position: 'absolute', top: 0, left: 0, zIndex: 2, backgroundColor: 'rgba(0, 0, 0, 0.5)', width: "100%", height: "100%",
          display: 'flex', justifyContent: 'space-around', alignItems: 'center', flexWrap: 'wrap', color: 'white'
          }}>
            <p>How much do you like to bet?</p>
            <input type="text" placeholder={location.state ? JSON.stringify(location.state) : ''}/>
            <span>
              <button style={{
                width: 150, height: 30, backgroundColor: '#136494',
              borderRadius: 10}} onClick={() => {
                setbetting(() => true)
                gameStart()
              }}>확인</button>
            </span>
          </div>
        : <></>}
        <canvas ref={canvasRef} style={{maxWidth: 800}}></canvas>
      </div>
    </div>
  )
}

export default Stage2;