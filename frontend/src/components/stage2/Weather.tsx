import { ClassElement, NumberLiteralType } from "typescript";

export class Weather {
  weather: number;

  constructor() {
    this.weather = this.setWeather();
  }

  // 0: 흐림, 1: 비, 2: 맑음, 3: 눈
  setWeather() :number{
    const todayWeahter = Math.round(Math.random() * 1000 + 1)
    if (todayWeahter <= 250) return 0
    else if (todayWeahter <= 500) return 1
    else if (todayWeahter <= 800) return 2
    else return 3
  }
}

export class Jockey {
  luckynumber : number; // 행운의 숫자 
  luckynumber2 : number; // 행운의 숫자2 
  favWeather : number; // 좋아하는 날씨
  training : number; // 트레이닝 포인트
  careerPoint : number; // 경력 포인트
  feelingPoint : number; // 날씨에 따른 기분 포인트
  physicalPoint : number; // 피지컬 포인트
  handling : number; // 핸들링
  drivePoint : number;
  curvePoint: number;
  weather: number;

  constructor(weather: number) {
    this.luckynumber = Number(Math.random().toFixed(2));
    this.luckynumber2 = Number(Math.random().toFixed(2));
    this.weather = weather;
    this.favWeather = Math.trunc(Math.random() * 4);
    this.training = this.luckynumber;
    this.careerPoint = this.setCareerPoint(this.luckynumber * 100);
    this.feelingPoint = this.setFeelingPoint();
    this.physicalPoint = this.luckynumber2;
    this.handling = this.setHandlingPoint();
    this.drivePoint = this.setDriveCurvePoint();
    this.curvePoint = this.setDriveCurvePoint();
  }

  setCareerPoint(career: number) {
    if (career <= 50) return 0.1
    else if (career <= 80) return 0.2
    else return 0.3 
  }

  setFeelingPoint() {
    // 좋아하는 날씨인 경우 0.5~
    if (this.weather === this.favWeather) {
      return Number((Math.random() * 0.3 + 0.5).toFixed(2))
    } else { // 이외의 경우 0.3 ~ 0.5
      return Number((Math.random() * 0.2 + 0.3).toFixed(2))
    }
  }

  setHandlingPoint() {
    return Number(((this.training * 0.8) + (this.careerPoint * 0.05) + (this.feelingPoint * 0.02) + (this.physicalPoint * 0.13)).toFixed(2))
  }

  setDriveCurvePoint() {
    // 트레이닝 점수에 따른 최소값 결정
    let minPoint;
    if (this.training <= 0.33) minPoint = 0.2
    else if (this.training <= 0.66) minPoint = 0.3
    else minPoint = 0.4

    const pointGap = Number(((1 - minPoint) / 5).toFixed(3));
    let drivePoint = Math.trunc((Math.random() * pointGap) * 100) / 100
    // console.log('pointGap', pointGap, 'minPoint', minPoint, 'drivePoint', drivePoint)
    // 핸들링 점수에 따라서 드라이브 수치 영역결정
    if (this.handling <= 0.2) {
      drivePoint += minPoint
      return Number(drivePoint.toFixed(2))
    } else if (this.handling <= 0.4) {
      drivePoint += minPoint + pointGap
      return Number(drivePoint.toFixed(2))
    } else if (this.handling <= 0.6) {
      drivePoint += minPoint + pointGap + pointGap
      return Number(drivePoint.toFixed(2))
    } else if (this.handling <= 0.8) {
      drivePoint += minPoint + pointGap + pointGap + pointGap
      return Number(drivePoint.toFixed(2))
    } else {
      drivePoint += minPoint + pointGap + pointGap + pointGap + pointGap
      return Number(drivePoint.toFixed(2))
    }
  }

  getStat() {
    return {
      handling: this.handling,
      drivePoint: this.drivePoint,
      curvePoint: this.curvePoint,
    }
  }

}
export class Sprite {
  image: HTMLImageElement;
  count: number;
  frameIndex: {x: number, y: number};
  vel: {x: number, y: number};
  cnt: number;
  theta: number;
  velocity: {straightAreaVelocity: number, curveAreaVelocity: number};
  lineNum: number
  
  constructor(color: number, name: string, line: number) {
    this.image = this.setImage(color)
    this.count = 0;
    this.frameIndex = {
      x: 0,
      y: 0
    }
    this.vel = {
      x: 0,
      y: 0
    }
    this.velocity = {
      straightAreaVelocity: 0, 
      curveAreaVelocity: 0
    }
    this.cnt = 0
    this.theta = 180
    this.lineNum = line
  }

  setImage(color: number) {
    let img = new Image();
    switch(color) {
      case 0:
        img.src = require('../../assets/blueHorse.png')
        break;
      case 1:
        img.src = require('../../assets/yellowHorse.png')
        break;
      case 2:
        img.src = require('../../assets/indigoHorse.png')
        break;
      case 3:
        img.src = require('../../assets/skyblueHorse.png')
        break;
    }
    return img;
  }

  animate(ctx: CanvasRenderingContext2D) {
    // console.log(this.velocity.straightAreaVelocity, this.velocity.curveAreaVelocity)
    let d = this.velocity.straightAreaVelocity; // 말들마다 갖는 속력(MAX c값이 정해짐)
    let rad = 0;
    let d1 = Number((280 / d).toFixed(0)); // 직선구간
    let d2 = d1 + Number((180 / this.velocity.curveAreaVelocity).toFixed(0)); // 커브구간
    let d3 = d2 + Number((630 / d).toFixed(0)); // 직선구간
    let d4 = d3 + Number((180 / this.velocity.curveAreaVelocity).toFixed(0)); // 커브구간
    let d5 = d4 + Number((280 / d).toFixed(0)); // 직선구간
    let c = 1;
    let dy = 70 * this.lineNum / d1;

    if (this.image !== null) {
      ctx.drawImage(
        this.image,
        this.frameIndex.x * 100,
        this.frameIndex.y * 100,
        100,
        100,

        70*10 + this.vel.x, 
        70*(8+this.lineNum) + this.vel.y,
        70, 
        70
      )
      // 직선구간
      if (this.cnt <= d1) {
        this.vel.x = this.vel.x + d
        this.vel.y = this.vel.y - dy;
        if (this.count > c) {
          this.frameIndex.x ++;
          this.count = 0
        }
  
        if (this.frameIndex.y === 1 && this.frameIndex.x > 3) {
          this.frameIndex.x = 0;
          this.frameIndex.y = 0
        }
  
        if (this.frameIndex.x > 19) {
          this.frameIndex.x = 0;
          this.frameIndex.y ++;
        }
      }

      // 첫번째 커브구간
      else if (this.cnt <= d2) {
        d = 0
        this.theta -= this.velocity.curveAreaVelocity
        rad = this.theta * (2 * Math.PI) / 360
        this.vel.x = 280 + (175 * Math.sin(rad))
        this.vel.y = -350-(70*this.lineNum) + (175 * (1 - Math.cos(rad)))
        

        // sprite 직선에 이어서 나오도록
        if (this.count > c) {
          this.frameIndex.x ++;
          this.count = 0
        }
        
        if (this.frameIndex.x > 19) {
          this.frameIndex.y ++;
          this.frameIndex.x = 0;
        }

        if (this.frameIndex.y === 6 && this.frameIndex.x > 5) {
          this.frameIndex.y = 6;
          this.frameIndex.x = 5;
        }

      }

      // 직선구간(theta: 0)
      else if (this.cnt < d3) {
        d = -this.velocity.straightAreaVelocity
        this.vel.x = this.vel.x + d

        if (this.count > c) {
          this.frameIndex.x ++;
          this.count = 0
        }
        
        if (this.frameIndex.y === 8 && this.frameIndex.x > 10) {
          this.frameIndex.y = 6;
          this.frameIndex.x = 0;
        }
        
        if (this.frameIndex.x > 19) {
          this.frameIndex.y ++;
          this.frameIndex.x = 0;
        }

      }

      // 두번째 커브구간
      else if (this.cnt < d4) {
        this.theta -= this.velocity.curveAreaVelocity
        rad = this.theta * (2 * Math.PI) / 360
        this.vel.x = -350 + (175 * Math.sin(rad))
        this.vel.y = -350-(70*this.lineNum) + (175 * (1 - Math.cos(rad)))

        if (this.count > c) {
          this.frameIndex.x ++;
          this.count = 0
        }
        
        if (this.frameIndex.x > 19) {
          this.frameIndex.y ++;
          this.frameIndex.x = 0;
        }

        if (this.frameIndex.y === 11 && this.frameIndex.x > 9) {
          this.frameIndex.y = 11;
          this.frameIndex.x = 9;
        }

        if (this.frameIndex.y === 8 && this.frameIndex.x > 10) {
          this.frameIndex.x ++;
        }
      }
      
      else if (this.cnt < d5) {
        d = this.velocity.straightAreaVelocity
        this.vel.x = this.vel.x + d
        
        if (this.count > c) {
          this.frameIndex.x ++;
          this.count = 0
        }
        
        if (this.frameIndex.y === 1 && this.frameIndex.x > 3) {
          this.frameIndex.x = 0;
          this.frameIndex.y = 0
        }
  
        if (this.frameIndex.x > 19) {
          this.frameIndex.x = 0;
          this.frameIndex.y ++;
        }

        if (this.frameIndex.y === 11 && this.frameIndex.x > 9) {
          this.frameIndex.y = 0;
          this.frameIndex.x = 0;
        }
      }
    
      else {
        this.vel.x = 0;
        this.vel.y = 0;

        if (this.count > c) {
          this.frameIndex.x ++;
          this.count = 0
        }
  
        if (this.frameIndex.y === 1 && this.frameIndex.x > 3) {
          this.frameIndex.x = 0;
          this.frameIndex.y = 0
        }
  
        if (this.frameIndex.x > 19) {
          this.frameIndex.x = 0;
          this.frameIndex.y ++;
        }
      }

      this.cnt ++;


      // sprite 조정
      this.count ++;

      // if (this.count > c) {
      //   this.frameIndex.x ++;
      //   this.count = 0
      // }

      // if (this.frameIndex.y === 1 && this.frameIndex.x > 3) {
      //   this.frameIndex.x = 0;
      //   this.frameIndex.y = 0
      // }

      // if (this.frameIndex.x > 19) {
      //   this.frameIndex.x = 0;
      //   this.frameIndex.y ++;
      // }
      

    }
  }
}

// Sprite 상속
export class Horse extends Sprite {
  luckynumber: number;
  maxVelocity: number;
  weather: number;
  favWeather: number;
  hateWeather: number;
  conditionPoint: number;
  jockeyPoint: {handling: number, drivePoint: number, curvePoint: number};
  drivePoint: number;
  curvePoint: number;
  name: string;
  velocity: {straightAreaVelocity: number, curveAreaVelocity: number, avg: number};

  constructor(jockeyPoint: {handling: number, drivePoint: number, curvePoint: number}, color: number, lineNum: number, weather: number, name: string) {
    super(color, name, lineNum);
    this.jockeyPoint = jockeyPoint;
    this.luckynumber = Number(Math.random().toFixed(2));
    this.maxVelocity = this.setMaxVelocity(); // 말이 낼 수 있는 최대속력
    this.weather = weather;
    this.favWeather = Math.trunc(Math.random() * 4);
    this.hateWeather = this.setHateWeather();
    this.conditionPoint = this.setConditionPoint();
    this.drivePoint = this.setDriveCurvePoint();
    this.curvePoint = this.setDriveCurvePoint();
    this.velocity = this.setVelocity();
    this.name = name;
  }

  setMaxVelocity() {
    if (this.luckynumber <= 0.2) return 2
    else if (this.luckynumber <= 0.4) return 2.4
    else if (this.luckynumber <= 0.6) return 2.6
    else if (this.luckynumber <= 0.8) return 2.8
    else return 3
  }

  setHateWeather() {
    let weatherLst = [0, 1, 2, 3]
    weatherLst.splice(this.favWeather, 1)
    return weatherLst[Math.trunc(Math.random() * 3)]
  }

  setConditionPoint() {
    // 좋아하는 날씨인 경우 0.5~
    if (this.weather === this.favWeather) {
      return Number((Math.random() * 0.5 + 0.5).toFixed(2))
    } else if (this.weather === this.hateWeather) { // 싫어하는 날씨인 경우 0 ~ 0.3
      return Number((Math.random() * 0.3).toFixed(2))
    } else { // 이외의 경우 0.3 ~ 0.5
      return Number((Math.random() * 0.2 + 0.3).toFixed(2))
    }
  }

  setDriveCurvePoint() {
    // 최소값 결정
    let minPoint;
    if (this.luckynumber <= 0.33) minPoint = 0.2
    else if (this.luckynumber <= 0.66) minPoint = 0.3
    else minPoint = 0.4

    const pointGap = Number(((1 - minPoint) / 5).toFixed(3));
    let drivePoint = Math.trunc((Math.random() * pointGap) * 100) / 100
    // 핸들링 점수에 따라서 드라이브 수치 영역결정
    if (this.conditionPoint <= 0.2) {
      drivePoint += minPoint
      return Number(drivePoint.toFixed(2))
    } else if (this.conditionPoint <= 0.4) {
      drivePoint += minPoint + pointGap
      return Number(drivePoint.toFixed(2))
    } else if (this.conditionPoint <= 0.6) {
      drivePoint += minPoint + pointGap + pointGap
      return Number(drivePoint.toFixed(2))
    } else if (this.conditionPoint <= 0.8) {
      drivePoint += minPoint + pointGap + pointGap + pointGap
      return Number(drivePoint.toFixed(2))
    } else {
      drivePoint += minPoint + pointGap + pointGap + pointGap + pointGap
      return Number(drivePoint.toFixed(2))
    }
  }

  setVelocity() {
    let saVel = this.conditionPoint + (this.jockeyPoint.drivePoint * 0.3) + this.drivePoint * 0.7
    let caVel = this.conditionPoint + (this.jockeyPoint.curvePoint * 0.3) + this.curvePoint * 0.7
    return {straightAreaVelocity: Number(saVel.toFixed(2)), curveAreaVelocity: Number(caVel.toFixed(2)), avg: (Number(saVel.toFixed(2)) + Number(caVel.toFixed(2))) / 2}
  }

  draw(ctx: CanvasRenderingContext2D) {
    this.animate(ctx)
  }

  getStat() {
    return this.velocity
    // console.log('velocity', this.velocity)
    // console.log('drive step', 25 / this.velocity.straightAreaVelocity)
    // console.log('curve step', 25 / this.velocity.curveAreaVelocity)
  }
}