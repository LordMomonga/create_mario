import SpriteSheet from "./SpriteSheet.js";
import { context, canvas, POSITION_AXE_Y_DEBUT } from "../constant.js";

export default class Obstacle {
  constructor(position, imageSource, px, py) {
     this.position = { ...position };
    this.image = new Image();
    this.image.src = imageSource;
    this.py = py;
    this.px = px;
    this.decalage = 0; // Pour suivre le décalage global

    this.collision = false
    this.hitBox = {
      position: {
        x: this.position.x +this.decalage ,
        y: this.position.y,
      },
      width: 10,
      height: 10,
    };
  }
  hiter() {
    this.hitBox = {
      position: {
        x: this.position.x  ,
        y: this.position.y ,
      },
      width: 165,
      height: 10,
    };
  }

  draw() {
    

    if (!this.image) return;
    
    const sprites = new SpriteSheet(this.image, 16, 16);
    sprites.define("ground", 0, 0);

    sprites.draw("ground", context, 0, canvas.height - 16);
    
    for (let x = this.px ; x < this.px  + 10 ; x++) {
      for (let y = this.py; y < this.py + 1; y++) {
        sprites.drawTiles("ground", context, x + this.decalage  , y );
      }
    }
  }
  collider(y) {
    if(this.hitBox.y === y ){
      this.collision = true;
    }

  }
  update(y) {
    this.hiter();
   
     context.fillStyle = "rgba(255,0, 0, 0.5)";
     context.fillRect(
       this.hitBox.position.x,
       this.hitBox.position.y,
       this.hitBox.width,
       this.hitBox.height
     );
      this.collider(y);
    this.draw();
  }
}