export class Player {
  position: { x: number, y: number };
  velocity: { x: number, y: number};
  tileSize : number;
  
  player: HTMLImageElement;
  frameSet : { dx: number, dy: number, dw: number, dh: number };
  fps: number;
  secondsToUpdate : number;
  count : number;
  frameIndex : number;

  keys: { up: { pressed: boolean}, left: { pressed: boolean}, down: { pressed: boolean}, right: { pressed: boolean}};
  
  cb1: Function;
  cb2: Function;

  constructor(x: number, y: number, tileSize: number, frameSet: { name: string, startIndex: number, endIndex: number}, cb1: Function, cb2: Function) {
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
    }
    this.position = {
      x: x,
      y: y
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

      default:
        return {dx: 13, dy: 48*8 + 12, dw: this.player.width / 2 - 6, dh: this.player.height / 12}
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

      // 키보드에따른 방향으로 이동
      if (this.keys.down.pressed) {
        this.velocity.y += 2
        if (this.velocity.y % 32 === 0) {
          this.keys.down.pressed = false
          this.cb1((state : { x: number, y: number }) => ({
            ...state, y : this.position.y + this.velocity.y
          }))
          this.cb2((state : { name: string, startIndex: number, endIndex: number}) => ({
             ...state, name: "pressKey"
          }))
        }
      }
      else if (this.keys.up.pressed) {
        this.velocity.y -= 2
        if (Math.abs(this.velocity.y % 32) === 0) {
          this.keys.up.pressed = false
          this.cb1((state : { x: number, y: number }) => ({
            ...state, y : this.position.y + this.velocity.y
          }))
          this.cb2((state : { name: string, startIndex: number, endIndex: number}) => ({ ...state, name: "pressKey"}))
        }
      }
      else if (this.keys.left.pressed) {
        this.velocity.x -= 2
        if (Math.abs(this.velocity.x % 32) == 0) {
          console.log(this.velocity.x)
          this.keys.left.pressed = false
          this.cb1((state : { x: number, y: number }) => ({
            ...state, x : this.position.x + this.velocity.x
          }))
          this.cb2((state : { name: string, startIndex: number, endIndex: number}) => ({ ...state, name: "pressKey"}))
        }
      }
      else if (this.keys.right.pressed) {
        this.velocity.x += 2
        if (this.velocity.x % 32 == 0) {
          this.keys.right.pressed = false
          this.cb1((state : { x: number, y: number }) => ({
            ...state, x : this.position.x + this.velocity.x
          }))
          this.cb2((state : { name: string, startIndex: number, endIndex: number}) => ({ ...state, name: "pressKey"}))
        }
      }
    }
    
  }

  draw(canvas : HTMLCanvasElement, ctx : CanvasRenderingContext2D) {
    this.animate(ctx)
  }
}