import React, { useEffect, useState } from "react";
import { useKey3 } from "../../utils/Movement";

type CharacterProps = {
  cb1: Function;
  cb2: Function;
  idx: number;
  cb3: Function;
};

const CharacterSelector: React.FC<CharacterProps> = ({
  cb1,
  cb2,
  idx,
  cb3,
}) => {
  const [selectedCharIdx, setSelectedCharIdx] = useState(idx);
  const selectCharacter = (characterName: string) => {
    switch (characterName) {
      case "char-1":
        console.log(characterName, selectedCharIdx);
        cb2(() => "char-1");
        cb3(() => selectedCharIdx);
        break;
      case "char-2":
        cb2(() => "char-2");
        cb3(() => selectedCharIdx);
        console.log(characterName, selectedCharIdx);
        break;
      case "char-3":
        cb2(() => "char-3");
        cb3(() => selectedCharIdx);
        console.log(characterName, selectedCharIdx);
        break;
      default:
        console.log(characterName);
    }
    cb1((state: boolean) => true);
  };

  useEffect(() => {
    const currentElem = document.getElementsByClassName(`char-${idx}`);
    currentElem[0].classList.add(`activate${idx}`);
  }, [idx]);

  useKey3(selectedCharIdx, setSelectedCharIdx, selectCharacter);

  const changeChar = (clickedChar: number) => {
    const currentElem = document.getElementsByClassName(
      `char-${selectedCharIdx}`
    );
    const nextElem = document.getElementsByClassName(`char-${clickedChar}`);
    currentElem[0].classList.remove(`activate${selectedCharIdx}`);
    nextElem[0].classList.add(`activate${clickedChar}`);
    selectCharacter(`char-${clickedChar}`);
    cb3(() => clickedChar);
  };
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        zIndex: 2,
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        width: 384,
        height: 416,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.8)",
          width: 360,
          height: 170,
          textAlign: "center",
          color: "white",
          paddingTop: 30,
          borderRadius: 10,
        }}>
        <span>select character</span>
        <br />
        <span style={{ fontSize: 10 }}>use '←', '→', 'enter' key</span>
        <div
          style={{
            display: "flex",
            justifyContent: "space-evenly",
            marginTop: 35,
          }}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <div
              className="char-1"
              onClick={() => {
                changeChar(1);
              }}></div>
            <span>qwer</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <div
              className="char-2"
              onClick={() => {
                changeChar(2);
              }}></div>
            <span>asdf</span>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}>
            <div
              className="char-3"
              onClick={() => {
                changeChar(3);
              }}></div>
            <span>zxcv</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CharacterSelector;
