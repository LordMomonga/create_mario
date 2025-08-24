export default class SpritePlayer{
  constructor(position, imageSrc, frameRate = 1, frameBuffer = 3, scale = 1){
    this.position = position;
    this.image = new Image();
     this.image.onload = ()=>{
      this.width = this.image.width;
      this.height = this.image.height;
    }
    this.image.src = imageSrc;
    this.frameRate = frameRate;
    this.currentFrameRate = 0;
    this.frameBuffer = frameBuffer;
    this.facingLeft = false; // Ajouté : pour savoir si le joueur est tourné à gauche

  }
  draw(){
  if(!this.image) return
  const cropBox = {
    position: {
      x: 0,
      y:0,
    },
    width: this.image.width,
    height:this.image.height ,
  }
  

  context.drawImage(
    this.image,
    cropBox.position.x,
    cropBox.position.y,
    cropBox.width,
    cropBox.height,
    this.position.x,
    this.position.y,
    this.width,
    this.height
  );
  }
  update(){
    this.draw()
  }
}