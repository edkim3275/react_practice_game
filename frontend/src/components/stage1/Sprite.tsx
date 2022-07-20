export class Sprite {
  image: HTMLImageElement;
  position: { x: number, y: number, row: number, col: number, offset: {x: number, y: number}};
  tileSize: number;
  canvasTileSize: number;
  frameSet : { dx: number, dy: number, dw: number, dh: number, startIndex: number, endIndex: number };
  fps: number;
  secondsToUpdate : number;
  count : number;
  frameIndex : number;
  velocity: { x: number, y: number};
  
  constructor(
    name: string, x: number, y: number, offset: {x: number, y: number}, 
    tileSize: number, canvasTileSize: number, 
    frameSet : { dx: number, dy: number, dw: number, dh: number , startIndex: number, endIndex: number}) {
    this.image = this.setImage(name);
    this.position = {
      x: x,
      y: y,
      row : y / canvasTileSize,
      col : x / canvasTileSize,
      offset: offset,
    };
    this.tileSize = tileSize;
    this.canvasTileSize = canvasTileSize;
    this.frameSet = frameSet;
    this.fps = 60;
    this.secondsToUpdate = 0.2 * this.fps;
    this.count = 0;
    this.frameIndex = 0;
    this.velocity = {
      x: 0,
      y: 0
    }
  }

  // 사용할 인스턴스(player, map 등)에 따라서 이미지 변경
  setImage(entityName: string) {
    let img = new Image();
    switch(entityName) {
      case 'char-1':
        img.src = require('../../assets/Basic Charakter Actions.png')
        break;
      case 'char-2':
        img.src = require('../../assets/Character_001.png')
        break;
      case 'char-3':
        img.src = require('../../assets/Character_004.png')
        break;
    }
    return img;
  }

  animate(ctx: CanvasRenderingContext2D) {
    let image = this.image;
    if (image !== null) {
      ctx.drawImage(
        image,
        // sprite
        this.frameSet.dx + (this.frameIndex * this.tileSize),
        this.frameSet.dy,
        this.tileSize,
        this.tileSize,
        // canvas
        this.position.x + this.velocity.x + this.position.offset.x,
        this.position.y + this.velocity.y + this.position.offset.y,
        this.canvasTileSize,
        this.canvasTileSize
      )

      this.count ++;

      if (this.count > this.secondsToUpdate) {
        this.frameIndex ++;
        this.count = 0
      }

      if (this.frameIndex > this.frameSet.endIndex) {
        this.frameIndex = 0;
      }
    }
  }
}