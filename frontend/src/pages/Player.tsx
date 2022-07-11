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

export class Player {
  position: { x: number, y: number, row: number, col: number};
  velocity: { x: number, y: number};
  tileSize : number;
  
  player: HTMLImageElement;
  frameSet : { dx: number, dy: number, dw: number, dh: number };
  fps: number;
  secondsToUpdate : number;
  count : number;
  frameIndex : number;

  keys: { up: { pressed: boolean}, left: { pressed: boolean}, down: { pressed: boolean}, right: { pressed: boolean}, response: { pressed: boolean}};
  
  cb1: Function;
  cb2: Function;
  cb3: Function;
  cb4: Function;
  map: Map;

  constructor(x: number, y: number, tileSize: number, frameSet: { name: string, startIndex: number, endIndex: number}, cb1: Function, cb2: Function, cb3: Function, cb4: Function) {
    this.tileSize = tileSize;
    this.player = this.image("Basic Charakter Actions.png");
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
    this.position = {
      x: x,
      y: y,
      row : y / 32,
      col : x / 32,
    }
    this.velocity = {
      x: 0,
      y: 0
    }
    this.count = 0;
    this.frameIndex = 0;
    this.frameSet = this.setFrame(frameSet);
    this.fps = 60;
    this.secondsToUpdate = 0.2 * this.fps;
    this.cb1 = cb1;
    this.cb2 = cb2;
    this.cb3 = cb3;
    this.cb4 = cb4;

    this.map = new Map();
  }
  
  // - fileName의 default값 설정해주기
  image(fileName : string = "Basic Charakter Actions.png") {
    const img = new Image();
    img.src = require(`../assets/${fileName}`);
    return img;
  }
  
  setFrame(frameSet : { name: string, startIndex: number, endIndex: number}) {
    switch (frameSet.name) {
      case "moveDown":
        console.log('go down')
        this.keys.down.pressed = true
        return {dx: 13, dy: 48*8 + 11, dw: this.player.width / 2 - 6, dh: this.player.height / 12};

      case "moveUp":
        console.log('go up')
        this.keys.up.pressed = true
        return {dx: 13, dy: 48*9 + 12, dw: this.player.width / 2 - 6, dh: this.player.height / 12};
      
      case "moveRight":
        console.log('go right')
        this.keys.right.pressed = true
        return {dx: 13, dy: 48*11 + 12, dw: this.player.width / 2 - 6, dh: this.player.height / 12};

      case "moveLeft":
        console.log('go left')
        this.keys.left.pressed = true
        return {dx: 0, dy: 48*10 + 12, dw: this.player.width / 2 - 6, dh: this.player.height / 12};

      case "response":
        this.keys.response.pressed = true
        return {dx: 13, dy: 48*8 + 11, dw: this.player.width / 2 - 6, dh: this.player.height / 12};
      default:
        return {dx: 13, dy: 48*8 + 11, dw: this.player.width / 2 - 6, dh: this.player.height / 12};
    }
  }
  
  animate(ctx : CanvasRenderingContext2D) {
    let image = this.player;
    if (image !== null) {
      ctx.drawImage(
        image,

        // - frameIndex에 대한 array를 생성해서 내부 값들 사용하기
        (this.tileSize * this.frameIndex) + this.frameSet.dx, 
        this.frameSet.dy,
        this.frameSet.dw, 
        this.frameSet.dh, 
        
        // canvas에 이미지를 그릴 위치
        this.position.x + 8 + this.velocity.x, // x축 좌표
        this.position.y + 8 + this.velocity.y,// y축 좌표
        32, // 그림 너비
        32 // 그림 높이
      )
      
      // secondsToUpdate에 따라서 sprite sheet 렌더링
      this.count ++;

      if (this.count > this.secondsToUpdate) {
        this.frameIndex ++;
        this.count = 0
      }

      if (this.frameIndex > 1) {
        this.frameIndex = 0;
      }

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

        if (cnt > 0) {
          // 이동 횟수만큼 이동하기
          this.velocity.y += 2
          if (this.velocity.y === (32*cnt)) {
            this.keys.down.pressed = false
  
            cnt = 0
  
            this.cb1((state : { x: number, y: number }) => ({
              ...state, y : this.position.y + this.velocity.y
            }))
            this.cb2((state : { name: string, startIndex: number, endIndex: number}) => ({
               ...state, name: "pressKey"
            }))
            this.cb3(true)
          }
        } else {
          this.keys.down.pressed = false
  
            cnt = 0

            this.cb2((state : { name: string, startIndex: number, endIndex: number}) => ({
               ...state, name: "pressKey"
            }))
            this.cb3(true)
        }
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

        if (cnt > 0) {
          this.velocity.y -= 2
          if (Math.abs(this.velocity.y) === 32*cnt) {
            this.keys.up.pressed = false
            cnt = 0
            this.cb1((state : { x: number, y: number }) => ({
              ...state, y : this.position.y + this.velocity.y
            }))
            this.cb2((state : { name: string, startIndex: number, endIndex: number}) => ({ ...state, name: "pressKey"}))
            this.cb3(true)
          }
        } else {
            this.keys.up.pressed = false
            cnt = 0

            this.cb2((state : { name: string, startIndex: number, endIndex: number}) => ({ ...state, name: "pressKey"}))
            this.cb3(true)
        }
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

        if (cnt > 0) {
          this.velocity.x -= 2
          if (Math.abs(this.velocity.x) === 32*cnt) {
            this.keys.left.pressed = false
            cnt = 0
            this.cb1((state : { x: number, y: number }) => ({
              ...state, x : this.position.x + this.velocity.x
            }))
            this.cb2((state : { name: string, startIndex: number, endIndex: number}) => ({ ...state, name: "pressKey"}))
            this.cb3(true)
          }
        } else {
          this.keys.left.pressed = false
          cnt = 0
          this.cb2((state : { name: string, startIndex: number, endIndex: number}) => ({ ...state, name: "pressKey"}))
          this.cb3(true)
        }
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

        if (cnt > 0) {
          this.velocity.x += 2
          if (this.velocity.x === 32*cnt) {
            this.keys.right.pressed = false
            if (this.map.onMap[this.position.row][this.position.col + cnt] === 4) {
              console.log('도착해써용.')
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
        } else {
          this.keys.right.pressed = false
          cnt = 0
          this.cb2((state : { name: string, startIndex: number, endIndex: number}) => ({ ...state, name: "pressKey"}))
          this.cb3(true)
        }
      } else if (this.keys.response.pressed) {
        this.velocity = { x: 0, y: 0 }
        this.cb1((state : { x: number, y: number }) => ({
          ...state, x: 0, y: 32*12
        }))
        this.cb2((state : { name: string, startIndex: number, endIndex: number}) => ({ ...state, name: "pressKey"}))
        this.cb3(true)
        this.keys.response.pressed = false
      }
    }
    
  }

  draw(canvas : HTMLCanvasElement, ctx : CanvasRenderingContext2D) {
    this.animate(ctx);
  }
}