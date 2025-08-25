// Importation du contexte, du canvas et de la constante gravité
import { context, canvas, GRAVITE } from "../constant.js";

// Alias pour plus de lisibilité
const gravity = GRAVITE;

// Classe Player qui gère le joueur
export default class Player {
  constructor({position, imageSrc, frameRate = 1, frameBuffer = 3, scale = 1.5, collisionBlock, hitBox, animations}) {
    this.imageSrc = imageSrc;       // Source de l'image de base
    this.scale = scale;             // Facteur d'agrandissement
    this.position = position;       // Position du joueur dans le canvas
    this.frameRate = frameRate;     // Nombre de frames pour l’animation
    this.currentFrameRate = 0;      // Frame actuelle affichée
    this.frameBuffer = frameBuffer; // Vitesse de l’animation (décalage entre frames)
    this.elapsedFrame = 0;          // Compteur pour gérer les frames
    this.lastDiretion = "right"     // Direction enregistrée (dernière orientation)
    this.facingLeft = false;        // Pour savoir si le joueur est tourné à gauche
    
    // Vitesse (déplacement horizontal et vertical)
    this.velocity = {
      x: 0,
      y: 1,
    };

    // Hitbox pour gérer les collisions
    this.hitBox = {
      position:{
        x:this.position.x,
        y:this.position.y
      },
      width: 10,
      height:10
    }
  
    // Chargement de l’image principale
    this.image = new Image()
    this.image.onload = ()=>{
      this.width = (this.image.width / this.frameRate) * this.scale; // largeur réelle après scale
      this.height = this.image.height * this.scale;                  // hauteur réelle après scale
    }

    this.image.src = imageSrc;    // Chemin de l’image du sprite
    this.animations = animations; // Stocke les différentes animations possibles
    for(let key in this.animations) {
      const image = new Image()
      image.src = this.animations[key].imageSrc;
      this.animations[key].image = image // Précharge les images des animations
    }
  }

  // Changer de sprite (idle, run, jump, etc.)
  switchSprite(key){
    if(this.image === this.animations[key])return // Si déjà sur ce sprite → ne rien faire
    this.image = this.animations[key].image;      // Nouvelle image
    this.frameBuffer = this.animations[key].frameBuffer; // Vitesse animation
    this.frameRate = this.animations[key].frameRate;     // Nombre de frames
  }

  // Mise à jour de la hitbox (position et taille de la zone de collision)
  hiter(){
    this.hitBox = {
       position: {
         x: this.position.x + (this.image.width / this.frameRate ) /2, // Décalage horizontal
         y: this.position.y + (this.image.height - this.hitBox.height) * 5, // Décalage vertical
       },
       width: 50,
       height: 70,
     };
  }
  
  // Dessine le sprite sur le canvas
  draw() {
    // Zone du sprite à découper dans l’image (frame courante)
    const cropBox = {
      position: {
        x: this.currentFrameRate * (this.image.width / this.frameRate), // Décalage horizontal
        y: 0,
      },
      width: this.image.width / this.frameRate, // Largeur d’une frame
      height: this.image.height,               // Hauteur d’une frame
    };

    // Position et taille finales à dessiner
    const drawX = this.position.x;
    const drawY = this.position.y;
    const drawWidth = this.width;
    const drawHeight = this.height;

    context.save(); // Sauvegarde l’état du canvas

    // Si le joueur est tourné vers la gauche → effet miroir horizontal
    if (this.facingLeft) {
      context.translate(drawX + drawWidth / 2, drawY + drawHeight / 2);
      context.scale(-1, 1); 
      context.translate(-drawX - drawWidth / 2, -drawY - drawHeight / 2);
    }
     
    // Dessine l’image du sprite découpée
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

    context.restore(); // Restaure l’état initial du canvas

    /* Debug hitbox joueur
    context.fillStyle = "white";
    context.fillRect(this.position.x, this.position.y, 40, this.height);*/
  }

  // Met à jour la position, l’animation et la physique du joueur
  update(deltaTime) {
    this.hiter() // Recalcule la hitbox
    
    // Debug visuel : rect transparents pour voir les zones
    context.fillStyle = "rgba(0,255, 255, 0)"
    context.fillRect(this.position.x, this.position.y,this.width, this.height);
    context.fillStyle = "rgba(255,0, 0, 0.5)";
    context.fillRect(
       this.hitBox.position.x,
       this.hitBox.position.y,
       this.hitBox.width,
       this.hitBox.height
     );

    this.draw(); // Dessine le sprite

    // 🔽 Appliquer les déplacements avec le deltaTime
    this.position.y += this.velocity.y * deltaTime / 16;
    this.position.x += this.velocity.x * deltaTime / 16;

    // Applique la gravité si le joueur n’est pas au sol
    if (this.position.y + this.height + this.velocity.y + 65 < canvas.height) {
      this.velocity.y += gravity; 
    } else this.velocity.y = 0;

    this.updateFrame(); // Passe à la frame suivante si nécessaire
  }

  // Gestion des frames de l’animation
  updateFrame(){
    this.elapsedFrame ++ ; // Incrémente le compteur
    if(this.elapsedFrame % this.frameBuffer === 0){ // Contrôle la vitesse
      if(this.currentFrameRate < this.frameRate - 1){
         this.currentFrameRate++; // Frame suivante
      }else  
         this.currentFrameRate = 0; // Retour au début
    }
  }

  // Vérifie la collision avec un obstacle
  checkCollisionWithObstacle(obstacle) {
    const playerBottom = this.hitBox.position.y + this.hitBox.height;
    const obstacleTop = obstacle.hitBox.position.y;

    // Collision horizontale
    const isCollidingHorizontally =
      this.hitBox.position.x < obstacle.hitBox.position.x + obstacle.hitBox.width &&
      this.hitBox.position.x + this.hitBox.width > obstacle.hitBox.position.x;

    const tolerance = 5; // Marge d’erreur pour éviter des bugs

    // Vérifie si le joueur tombe sur le haut de l’obstacle
    const isFallingOnTop =
      playerBottom <= obstacleTop + tolerance &&
      playerBottom + this.velocity.y >= obstacleTop;

    // Si collision détectée → stoppe la chute et place le joueur sur l’obstacle
    if (isCollidingHorizontally && isFallingOnTop) {
      this.velocity.y = 0;
      this.position.y = obstacle.hitBox.position.y - this.height;
    }
  }
}
