export class TileMap {
    tileSize : number;
    ground : HTMLImageElement;
    onGround : HTMLImageElement;

  constructor(tileSize : number) {
    this.tileSize = tileSize
    this.ground = this.image("RPG Nature Tileset.png");
    this.onGround = this.image("IceTileset.png")
  }
  image(fileName : string) {
    const img = new Image();
    img.src = require(`../assets/${fileName}`);
    return img;
  }
  // 0 - empty
  // 1 - wall
  // 2 - path
  // 3 - ground
  // 4 - goal
  // 5 - spawn
  // 6 - obstacle

// 12x13
    map = [
        [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
        [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
        [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
        [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
        [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
        [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
        [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
        [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
        [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
        [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
        [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
        [0, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 0],
        [3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3, 3],
    ]
    onMap = [
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
  draw(canvas : HTMLCanvasElement, ctx : CanvasRenderingContext2D) {
      this.setCanvasSize(canvas);
    //   this.clearCanvas(canvas, ctx);
      this.drawMap(ctx);
      this.drawOnGround(ctx);
  }

  setCanvasSize(canvas : HTMLCanvasElement) {
      canvas.height = this.map.length * this.tileSize;
      canvas.width = this.map[0].length * this.tileSize;
  }

  clearCanvas(canvas : HTMLCanvasElement, ctx : CanvasRenderingContext2D) {
      ctx.fillStyle = 'black';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  drawMap(ctx : CanvasRenderingContext2D) {
    // console.log('draw!')
      for(let row = 0; row< this.map.length; row++) {
          for(let column = 0; column < this.map[row].length; column++) {
              const tile = this.map[row][column];
              let image = this.ground;
              switch (tile) {
                // empty
                case 0:
                    if (image != null) {
                        ctx.drawImage(
                          image,
                          32, 64, 32, 32,
                          column * this.tileSize, row * this.tileSize, 32, 32);
                    }
                    break;
                case 3:
                    if (image != null) {
                        ctx.drawImage(
                          image,
                          0, 64, 32, 32,
                          column * this.tileSize, row * this.tileSize, 32, 32);
                    }
                    break;
              }
            //   if (image != null) {
            //       ctx.drawImage(
            //         image,
            //         0, 64, 32, 32,
            //         column * this.tileSize, row * this.tileSize, 32, 32);
            //   }
          }
      }
  }

  drawOnGround(ctx : CanvasRenderingContext2D) {
      for(let row = 0; row< this.onMap.length; row++) {
          for(let column = 0; column < this.onMap[row].length; column++) {
              const tile = this.onMap[row][column];
              let image = this.onGround;
              switch (tile) {
                case 1:
                    if (image != null && column === this.onMap[row].length - 1) {
                        ctx.drawImage(
                            image,
                            // 540, 32, 32, 32,
                            540, 32*4, 32, 32,
                            column * this.tileSize, row * this.tileSize, 32, 32);
                    }
                    else if (image != null) {
                        ctx.drawImage(
                          image,
                          480, 32*4, 32, 32,
                          column * this.tileSize, row * this.tileSize, 32, 32);
                    }
                    break;
                case 2:
                    if (image != null) {
                        ctx.drawImage(
                          image,
                          32, 64, 32, 32,
                          column * this.tileSize, row * this.tileSize, 32, 32);
                    }
                    break;
                case 4:
                    if (image != null) {
                        ctx.drawImage(
                          image,
                          32, 64, 32, 32,
                          column * this.tileSize, row * this.tileSize, 32, 32);
                        ctx.drawImage(
                            image,
                            64, 0, 32, 32,
                            column * this.tileSize, row * this.tileSize, 32, 32);
                    }
                    break;
                case 5:
                    if (image != null) {
                        ctx.drawImage(
                            image,
                            0, 64, 32, 32,
                            column * this.tileSize, row * this.tileSize, 32, 32);
                    }
                    break;
                case 6:
                    if (image != null) {
                        ctx.drawImage(
                            image,
                            32, 64, 32, 32,
                            column * this.tileSize, row * this.tileSize, 32, 32);
                        ctx.drawImage(
                            image,
                            64, 32, 32, 32,
                            column * this.tileSize, row * this.tileSize, 32, 32);
                    }
                    break;
              }
          }
      }
  }


}