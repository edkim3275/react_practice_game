export class Player {
  x: number;
  y: number;
  player: HTMLImageElement;
  tileSize : number;
  frameSet : { dx: number, dy: number, dw: number, dh: number };
  fps: number;
  secondsToUpdate : number;
  count : number;
  frameIndex : number;
  keys: { up: { pressed: boolean}, left: { pressed: boolean}, down: { pressed: boolean}, right: { pressed: boolean}};
  position: { x: number, y: number};
  cb: Function

  constructor(x: number, y: number, tileSize: number, frameSet: { name: string, startIndex: number, endIndex: number}, cb: Function) {
    this.x = x;
    this.y = y;
    // this.x = 0;
    // this.y = 32*12;
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
      x: 0,
      y: 0
    }
    this.count = 0;
    this.frameIndex = 0;
    this.frameSet = this.setFrame(frameSet);

    this.fps = 60;
    this.secondsToUpdate = 1 * this.fps;
    this.cb = cb;
  }

  image(fileName : string) {
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
    // console.log('현재위치', this.x / 32, this.y / 32)
    if (image !== null) {
      ctx.drawImage(
        image,

        (this.tileSize * this.frameIndex) + this.frameSet.dx, 
        this.frameSet.dy,
        this.frameSet.dw, 
        this.frameSet.dh, 
        
        // canvas에 이미지를 그릴 위치
        // this.x + 8, // x축 좌표
        // this.y + 8, // y축 좌표
        this.x + 8 + this.position.x, // x축 좌표
        this.y + 8 + this.position.y,// y축 좌표
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
        this.position.y += 2
        if (this.position.y % 32 === 0) {
          this.y = 16
          this.keys.down.pressed = false
        }
      }
      // else if (this.keys.up.pressed) this.position.y -=4
      // else if (this.keys.left.pressed) this.position.x -= 4
      else if (this.keys.right.pressed) {
        this.position.x += 2
        if (this.position.x % 32 === 0) {
          // console.log(this.position.x)
          this.keys.right.pressed = false
          this.cb((state : { x: number, y: number }) => ({
            ...state, x : this.x + 8 +this.position.x
          }))
          this.setFrame({ name: "pressKey", startIndex: 0, endIndex: 1})
        }
      }
    }
    
  }

  draw(canvas : HTMLCanvasElement, ctx : CanvasRenderingContext2D) {
    this.drawCharacter(canvas, ctx);
    // this.setCanvasSize(canvas);
    // this.clearCanvas(canvas, ctx);
    // this.drawMap(ctx);
    // this.drawOnGround(ctx);
  }

  drawCharacter(canvas : HTMLCanvasElement, ctx : CanvasRenderingContext2D) {
    // console.log(this.frameSet)
    this.animate(ctx)
    // let image = this.player;
    // if (image !== null) {
    //   ctx.drawImage(
    //     image,
    //     this.frameSet.dx, this.frameSet.dy, this.frameSet.dw, this.frameSet.dh, 
    //     this.x, this.y, 64, 64);
    // }
  }

}