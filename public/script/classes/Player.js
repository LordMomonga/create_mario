import { context, canvas, GRAVITE } from "../constant.js";

const gravity = GRAVITE;

export default class Player {
  constructor({position, imageSrc, frameRate = 1, frameBuffer = 3, scale = 1.5, collisionBlock, hitBox, animations}) {
    this.imageSrc = imageSrc; 
    this.scale = scale;
    this.position = position;
    this.frameRate = frameRate;
    this.currentFrameRate = 0;
    this.frameBuffer = frameBuffer;
    this.elapsedFrame = 0;
    this.lastDiretion = "right"
    this.facingLeft = false; // Ajouté : pour savoir si le joueur est tourné à gauche
    
    this.velocity = {
      x: 0,
      y: 1,
    };
    this.hitBox = {
      position:{
        x:this.position.x,
        y:this.position.y
      },
      width: 10,
      height:10
    }
  
    this.image = new Image()
    this.image.onload = ()=>{
      this.width = (this.image.width / this.frameRate) * this.scale;
      this.height = this.image.height * this.scale;
    }

        this.image.src = imageSrc;
        this.animations = animations;
        for(let key in this.animations) {
          const image = new Image()
          image.src = this.animations[key].imageSrc;
          this.animations[key].image = image
        }

  }
  switchSprite(key){
    if(this.image === this.animations[key])return
    this.image = this.animations[key].image;
    this.frameBuffer = this.animations[key].frameBuffer;
        this.frameRate = this.animations[key].frameRate;

  }
  hiter(){
     this.hitBox = {

       position: {
         x: this.position.x + (this.image.width / this.frameRate ) /2,
         y: this.position.y + (this.image.height - this.hitBox.height) * 5,
       },
       width: 50,
       height: 70,
     };

  }
  
  draw() {
    const cropBox = {
      position: {
        x: this.currentFrameRate * (this.image.width / this.frameRate),
        y: 0,
      },
      width: this.image.width / this.frameRate,
      height: this.image.height,
    };
    const drawX = this.position.x;
  const drawY = this.position.y;
  const drawWidth = this.width;
  const drawHeight = this.height;

  context.save();


      if (this.facingLeft) {
    context.translate(drawX + drawWidth / 2, drawY + drawHeight / 2);
    context.scale(-1, 1); // miroir horizontal
    context.translate(-drawX - drawWidth / 2, -drawY - drawHeight / 2);
  }
     
context.drawImage(
  this.image,
  cropBox.position.x,
  cropBox.position.y,
  cropBox.width,
  cropBox.height,
  this.position.x,
  this.position.y,
  this.width ,
  this.height
);  
  context.restore();
 /* context.fillStyle = "white";
    context.fillRect(this.position.x, this.position.y, 40, this.height);*/
  }
  update(deltaTime) {
    this.hiter()
    
    //draw image
    context.fillStyle = "rgba(0,255, 255, 0)"
    context.fillRect(this.position.x, this.position.y,this.width, this.height);
     context.fillStyle = "rgba(255,0, 0, 0.5)";
     context.fillRect(
       this.hitBox.position.x,
       this.hitBox.position.y,
       this.hitBox.width,
       this.hitBox.height
     );
    this.draw();
    
    //🔽 Appliquer le déplacement avec deltaTime
    this.position.y += this.velocity.y * deltaTime / 16;
    this.position.x += this.velocity.x * deltaTime / 16;

    if (this.position.y + this.height + this.velocity.y + 65 < canvas.height) {
      this.velocity.y += gravity;
    } else this.velocity.y = 0;
    this.updateFrame();
  }
  updateFrame(){
    this.elapsedFrame ++ ;
    if(this.elapsedFrame % this.frameBuffer === 0){
    if(this.currentFrameRate < this.frameRate - 1){
       this.currentFrameRate++;
    }else  this.currentFrameRate = 0; }
   
  }

  checkCollisionWithObstacle(obstacle) {
    const playerBottom = this.hitBox.position.y + this.hitBox.height;
    const obstacleTop = obstacle.hitBox.position.y;

    const isCollidingHorizontally =
      this.hitBox.position.x < obstacle.hitBox.position.x + obstacle.hitBox.width &&
      this.hitBox.position.x + this.hitBox.width > obstacle.hitBox.position.x;

    const tolerance = 5; // marge de tolérance en pixels

    const isFallingOnTop =
      playerBottom <= obstacleTop + tolerance &&
      playerBottom + this.velocity.y >= obstacleTop;

     if (isCollidingHorizontally && isFallingOnTop) {
    // Stop the fall and position the player on top of the obstacle
    this.velocity.y = 0;
    this.position.y = obstacle.hitBox.position.y - this.height;
  }
    
  }
}