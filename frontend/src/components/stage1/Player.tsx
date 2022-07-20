import { Sprite } from './Sprite'

class Map {
  onMap : number[][];

  constructor () {
    this.onMap = [
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 6, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 6, 2, 6, 1],
      [1, 2, 2, 2, 6, 2, 2, 2, 2, 2, 4, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 6, 2, 1],
      [1, 2, 2, 2, 2, 2, 6, 2, 2, 2, 6, 1],
      [1, 6, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 6, 1],
      [1, 2, 2, 6, 2, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 6, 6, 2, 2, 1],
      [1, 2, 2, 2, 6, 2, 2, 2, 2, 2, 2, 1],
      [1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1],
      [5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5],
    ]
  }
}

export class Player extends Sprite {
  keys: { up: { pressed: boolean}, left: { pressed: boolean}, down: { pressed: boolean}, right: { pressed: boolean}, response: { pressed: boolean}};
  cb1: Function;
  cb2: Function;
  cb3: Function;
  cb4: Function;
  map: Map;

  constructor(charType: string, x: number, y: number, tileSize: number, frameSet: { name: string, startIndex: number, endIndex: number}, cb1: Function, cb2: Function, cb3: Function, cb4: Function) {
    super(charType, x, y, {x: 8, y: 8}, tileSize, 32, {dx: 13, dy: 48*8 + 11, dw: tileSize - 6, dh: tileSize / 12, startIndex: frameSet.startIndex, endIndex: frameSet.endIndex})
    this.keys = {
      up: {
        pressed: false
      },
      left: {
        pressed: false
      },
      down: {
        pressed: false
      },
      right: {
        pressed: false
      },
      response: {
        pressed: false
      },
    }
    this.frameSet = this.setFrame(frameSet);
    this.cb1 = cb1;
    this.cb2 = cb2;
    this.cb3 = cb3;
    this.cb4 = cb4;
    this.map = new Map();
  }

  setFrame(frameSet : { name: string, startIndex: number, endIndex: number}) {
    switch (frameSet.name) {
      case "moveDown":
        console.log('go down')
        this.keys.down.pressed = true
        // return {dx: 13, dy: 48*8 + 11, dw: this.image.width / 2 - 6, dh: this.image.height / 12};
        return {dx: 10, dy: 12, dw: this.image.width / 3, dh: this.image.height / 4 + 5, startIndex: frameSet.startIndex, endIndex: frameSet.endIndex};

      case "moveUp":
        console.log('go up')
        this.keys.up.pressed = true
        // return {dx: 13, dy: 48*9 + 12, dw: this.image.width / 2 - 6, dh: this.image.height / 12, startIndex: frameSet.startIndex, endIndex: frameSet.endIndex};
        return {dx: 10, dy: 48*3, dw: this.image.width / 3, dh: this.image.height / 4 + 5, startIndex: frameSet.startIndex, endIndex: frameSet.endIndex};

      
      case "moveRight":
        console.log('go right')
        this.keys.right.pressed = true
        // return {dx: 13, dy: 48*11 + 12, dw: this.image.width / 2 - 6, dh: this.image.height / 12};
        return {dx: 10, dy: 48*2 + 12, dw: this.image.width / 3, dh: this.image.height / 4 + 5, startIndex: frameSet.startIndex, endIndex: frameSet.endIndex};

      case "moveLeft":
        console.log('go left')
        this.keys.left.pressed = true
        // return {dx: 0, dy: 48*10 + 12, dw: this.image.width / 2 - 6, dh: this.image.height / 12, startIndex: frameSet.startIndex, endIndex: frameSet.endIndex};
        return {dx: 10, dy: 48 + 12, dw: this.image.width / 3, dh: this.image.height / 4 + 5, startIndex: frameSet.startIndex, endIndex: frameSet.endIndex};

      case "response":
        this.keys.response.pressed = true
        return {dx: 13, dy: 48*8 + 11, dw: this.image.width / 2 - 6, dh: this.image.height / 12, startIndex: frameSet.startIndex, endIndex: frameSet.endIndex};
      default:
        // return {dx: 13, dy: 48*8 + 11, dw: this.image.width / 2 - 6, dh: this.image.height / 12};
        return {dx: 10, dy: 12, dw: this.image.width / 3, dh: this.image.height / 4 + 5, startIndex: frameSet.startIndex, endIndex: frameSet.endIndex};
    }
    
  }

  applyMove(cnt: number, direction: string, sign: number) {
    if (cnt > 0) {
      if (direction === 'y') {
        // 이동 횟수만큼 이동하기
        this.velocity.y = this.velocity.y + sign
        if (Math.abs(this.velocity.y) === (32*cnt)) {
          this.keys.down.pressed = false
          
            cnt = 0
            this.cb1((state : { x: number, y: number }) => ({...state, y : this.position.y + this.velocity.y}))
            this.cb2((state : { name: string, startIndex: number, endIndex: number}) => ({...state, name: "pressKey"}))
            this.cb3(true)
          
        }
      } else if (direction === 'x') {
        this.velocity.x = this.velocity.x + sign
          if (Math.abs(this.velocity.x) === 32*cnt) {
            this.keys.left.pressed = false
            if (this.map.onMap[this.position.row][this.position.col + cnt] === 4 || this.map.onMap[this.position.row][this.position.col - cnt] === 4) {
              cnt = 0
              this.cb1((state : { x: number, y: number }) => ({
                ...state, x : this.position.x + this.velocity.x
              }))
              this.cb2((state : { name: string, startIndex: number, endIndex: number}) => ({ ...state, name: "pressKey"}))
              this.cb3(false)
              this.cb4(true)
            } else {
              cnt = 0
              this.cb1((state : { x: number, y: number }) => ({
                ...state, x : this.position.x + this.velocity.x
              }))
              this.cb2((state : { name: string, startIndex: number, endIndex: number}) => ({ ...state, name: "pressKey"}))
              this.cb3(true)
            }   
          }
      }
    } else {
      this.keys.down.pressed = false
      cnt = 0
      this.cb2((state : { name: string, startIndex: number, endIndex: number}) => ({...state, name: "pressKey"}))
      this.cb3(true)
    }
  }

  movePlayer() {
      let cnt = 0
      // 키보드에따른 방향으로 이동
      if (this.keys.down.pressed) {
        // 움직이는 동안 키보드 이벤트 방지
        this.cb3(false)

        // 이동횟수 구하기
        while (true) {
          // 범위를 벗어날 경우
          if(this.position.row + cnt === this.map.onMap.length - 1) {
             break;
          } else if (this.map.onMap[this.position.row + cnt + 1][this.position.col] === 6) { // 장애물일 경우
            break;
          }
          cnt++
        }
        this.applyMove(cnt, 'y', 2)
      }
      else if (this.keys.up.pressed) {
        this.cb3(false)

        while (true) {
          // 범위를 벗어날 경우
          if(this.position.row - cnt === 0) {
             break;
          } else if (this.map.onMap[this.position.row - cnt - 1][this.position.col] === 6 || this.map.onMap[this.position.row - cnt - 1][this.position.col] === 1) { // 장애물일 경우
            break;
          }
          cnt++
        }
        this.applyMove(cnt, 'y', -2)
      }
      else if (this.keys.left.pressed) {
        this.cb3(false)

        while (true) {
          if(this.position.col - cnt === 0) { // 범위를 벗어날 경우
             break;
          } else if (this.map.onMap[this.position.row][this.position.col - cnt - 1] === 1 || this.map.onMap[this.position.row][this.position.col - cnt - 1] === 6) { // 장애물일 경우
            break;
          } else if (this.position.row === this.map.onMap.length - 1) {
            cnt = 1;
            break;
          }
          cnt++
        }
        this.applyMove(cnt, 'x', -2)
      }
      else if (this.keys.right.pressed) {
        this.cb3(false)

        while (true) {
          if (this.position.col + cnt === this.map.onMap[0].length - 1) { // 범위를 벗어날 경우
            break;
          } else if (this.map.onMap[this.position.row][this.position.col + cnt + 1] === 1 || this.map.onMap[this.position.row][this.position.col + cnt + 1] === 6) { // 장애물일 경우
            break;
          } else if (this.position.row === this.map.onMap.length - 1) {
            cnt = 1;
            break;
          }
          cnt++
        }
        this.applyMove(cnt, 'x', 2)
      } 
      else if (this.keys.response.pressed) {
        this.velocity = { x: 0, y: 0 }
        this.cb1((state : { x: number, y: number }) => ({
          ...state, x: 0, y: 32*12
        }))
        this.cb2((state : { name: string, startIndex: number, endIndex: number}) => ({ ...state, name: "pressKey"}))
        this.cb3(true)
        this.keys.response.pressed = false
      }
  }

  draw(canvas : HTMLCanvasElement, ctx : CanvasRenderingContext2D) {
    this.animate(ctx);
    this.movePlayer();
  }
}