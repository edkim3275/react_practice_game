export class Stage2Map {
  ground: HTMLImageElement;
  tileSize: number;
  map: number[][];

  constructor(weather: number, tileSize: number) {
    this.ground = this.image(weather);
    this.tileSize = tileSize;
    this.map = this.setMap();
  }

  mapCatalogue = [
    [3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2], // cloud
    [3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2], // rainy
    [3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2], // sunny
    [3, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2], // snow
  ]

  stadium = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 3, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ]

  setMap() {
    // return this.mapCatalogue[weather]
    return this.stadium
  }

  image(weather: number) {
    let img = new Image();
    switch(weather) {
      case 3:
        img.src = require('../../assets/IceTileset.png')
        break;
      default:
        img.src = require('../../assets/RPG Nature Tileset.png');
        break;
    }
    return img
  }

  draw(canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) {
    this.setCanvasSize(canvas);
    this.drawMap(ctx);
  }

  setCanvasSize(canvas: HTMLCanvasElement) {
    canvas.width = this.map[0].length * this.tileSize
    canvas.height = this.map.length * this.tileSize
  }

  drawMap(ctx: CanvasRenderingContext2D) {
    for(let i = 0; i < this.map.length; i++) {
      for (let j = 0; j < this.map[i].length; j++) {
        // console.log(i, j)
        const tile = this.map[i][j]
        switch(tile) {
          case 0:
            if (this.ground !== null) {
              ctx.drawImage(
                this.ground,
                0, 64, 32, 32,
                j * this.tileSize,
                i * this.tileSize, 
                70, 70
              )
            }
            break;
          case 1:
            if (this.ground !== null) {
              ctx.drawImage(
                this.ground,
                64, 64, 32, 32,
                j * this.tileSize, 
                i * this.tileSize,
                 70, 70
              )
            }
            break;
          case 2:
            if (this.ground !== null) {
              ctx.drawImage(
                this.ground,
                96, 64, 32, 32,
                j * this.tileSize,
                i * this.tileSize,
                70, 70
              )
            }
            break;
          case 3:
            if (this.ground !== null) {
              ctx.drawImage(
                this.ground,
                32, 64, 32, 32,
                j * this.tileSize,
                i * this.tileSize,
                70, 70
              )
            }
            break;
        }  

      }
    }
  }
}