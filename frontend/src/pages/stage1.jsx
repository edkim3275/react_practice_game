import React from "react";
import { Link } from "react-router-dom";
import Cell from "../components/stage1/Cell";

const createMap = () => {
  return(
    Array.from(Array(11), () => 
      new Array(11).fill([0])
    )
  )
}

const Map = () => {
  return (
    <div class="map-wrapper">
      {createMap().map(row => row.map((cell, x) => <Cell key={x} type={cell[0]}/>))}
    </div>
  )
}

function Stage1() {

  return (
    <div class="stage1-wrapper">
      <h2>welcom to stage1</h2>
      <div class="stage1-container">
        <aside>
          <div>
            <Link to="/">home</Link>
          </div>
        </aside>
        <Map />
      </div>
    </div>
  )
}

export default Stage1