import { context, canvas, GRAVITE } from "../constant.js";

export default class Npc {
constructor(position, imageSource, frameRate = 1, frameBuffer = 3, scale = 1, animations) {
    this.imageSrc = imageSource; 
    this.scale = scale;
    this.position = position;
    this.frameRate = frameRate;
    this.currentFrameRate = 0;
    this.frameBuffer = frameBuffer;
    this.elapsedFrame = 0;
    this.lastDiretion = "right"
    this.isDead = false;
    this.isAttacking = false;

this.currentAnimation = "idle";
this.currentAnimationRow = 0; // ligne dans la sprite sheet pour idle
    this.velocity = {
      x: 0,
      y: 2,
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

        this.image.src = imageSource;
        this.animations = animations;

          for(let key in this.animations) {
          const image = new Image()
          image.src = this.animations[key].imageSrc;
          this.animations[key].image = image
        }


  }
draw() {
     const frameWidth = this.image.width / 6;
  const frameHeight = this.image.height / 4; 
  const cropBox = {
    x: this.currentFrameRate * frameWidth,
    y: 0  , 
    width: frameWidth  ,
    height: frameHeight ,
  };
  

 context.drawImage(
   this.image,
  cropBox.x,
  cropBox.y,
  cropBox.width,
  cropBox.height,
  this.position.x,
  this.position.y,
  cropBox.width * this.scale,
  cropBox.height * this.scale
  );
}

update(player, HAS_ATTAKE) {
  this.draw();

  // Déplacement simple gauche-droite automatique
  this.position.x += this.velocity.x;

  this.elapsedFrame++;
  if (this.elapsedFrame % this.frameBuffer === 0) {
    if (this.currentFrameRate < this.frameRate - 1) {
      this.currentFrameRate++;
    } else {
      this.currentFrameRate = 0;
    }
  }

  // Appliquer la gravité (comme le joueur)
  if (this.position.y + this.height + this.velocity.y < canvas.height) {
    this.velocity.y += GRAVITE;
  } else {
    this.velocity.y = 0;
  }

  // Dans update():
if (this.position.x < 100) this.velocity.x = 1;
if (this.position.x > 400) this.velocity.x = -1;
// Interaction simple avec le joueur
  const dx = Math.abs(player.position.x - this.position.x);
  if (dx < 80) {
    console.log("L'ennemi détecte le joueur !");
    // Tu peux ici changer d’animation si tu veux
    if(HAS_ATTAKE){
    this.image = this.animations.fall.image;
    console.log("L'ennemi est attaqué !");
    this.velocity.x = 0; // Arrêter le mouvement lors de l'attaque
    setTimeout(()=>{
     this.shouldBeRemoved = true; // ⬅️ Marque le NPC pour être supprimé

    }, 900)
    return; // ⬅️ Arrête ici pour ne pas continuer le update
    }
 } else {
    this.image = this.animations.run.image;
  }
}
}
