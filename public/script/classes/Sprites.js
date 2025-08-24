import { SPRITE_GROUND_COLUMN, SPRITE_GROUND_ROW, SPRITE_SKY_COLUMN, SPRITE_SKY_ROW, POSITION_AXE_Y_DEBUT, POSITION_AXE_Y_FIN, context, canvas } from "../constant.js";
import SpriteSheet from "./SpriteSheet.js";

export default class Sprites {
  constructor(position, imageSource){
    this.position = position
    this.image = new Image();
    this.image.src = imageSource 
  }
  draw(){
        if (!this.image) return; 
    const sprites = new SpriteSheet(this.image, 16, 16)
    sprites.define("ground", SPRITE_GROUND_COLUMN, SPRITE_GROUND_ROW);
    sprites.define("sky", SPRITE_SKY_COLUMN, SPRITE_SKY_ROW);
    sprites.draw("ground", context, 0, canvas.height - 16)
   
   const visibleTilesX = Math.ceil(canvas.width / 16);
   const visibleTilesY = Math.ceil(canvas.height / 16);

for (let x = 0; x < visibleTilesX; x++) {
  for (let y = 0; y < visibleTilesY; y++) {
    sprites.drawTiles("sky", context, x, y);
  }
}
    // Draw the ground tiles....

    const tilesX = Math.ceil(canvas.width / 16);

     for (let x = 0; x < tilesX; x++) {
       for (let y = POSITION_AXE_Y_DEBUT; y < POSITION_AXE_Y_FIN; y++) {
         sprites.drawTiles("ground", context, x, y);
       }
     }
   
  }
  update(){
    this.draw()
  }
}
