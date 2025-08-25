// Importation du contexte de rendu, du canvas et de la constante gravité
import { context, canvas, GRAVITE } from "../constant.js";

// Classe représentant un PNJ (NPC = Non-Playable Character)
export default class Npc {
  constructor(position, imageSource, frameRate = 1, frameBuffer = 3, scale = 1, animations) {
    // Informations de base sur l'image et l'animation
    this.imageSrc = imageSource; 
    this.scale = scale;
    this.position = position;
    this.frameRate = frameRate;        // Nombre total de frames
    this.currentFrameRate = 0;         // Frame actuelle
    this.frameBuffer = frameBuffer;    // Vitesse d’animation (plus grand = plus lent)
    this.elapsedFrame = 0;             // Compteur de frames écoulées
    this.lastDiretion = "right";       // Direction précédente
    this.isDead = false;               // État mort ou vivant
    this.isAttacking = false;          // État d’attaque en cours

    // Animation par défaut
    this.currentAnimation = "idle";    
    this.currentAnimationRow = 0;      // Ligne de la sprite sheet correspondant à "idle"

    // Vitesse (x : horizontale, y : verticale)
    this.velocity = {
      x: 0,
      y: 2,
    };

    // Hitbox de collision du NPC
    this.hitBox = {
      position:{
        x:this.position.x,
        y:this.position.y
      },
      width: 10,
      height:10
    };
  
    // Chargement de l'image principale
    this.image = new Image()
    this.image.onload = ()=>{
      // Largeur et hauteur réelles une fois l’image chargée
      this.width = (this.image.width / this.frameRate) * this.scale;
      this.height = this.image.height * this.scale;
    }
    this.image.src = imageSource;

    // Récupération et chargement des animations définies
    this.animations = animations;
    for(let key in this.animations) {
      const image = new Image()
      image.src = this.animations[key].imageSrc;
      this.animations[key].image = image
    }
  }

  // Dessin du NPC à l’écran
  draw() {
    // Dimensions d’une frame (en supposant une sprite sheet 6 colonnes × 4 lignes)
    const frameWidth = this.image.width / 6;
    const frameHeight = this.image.height / 4; 

    // Zone à découper dans la sprite sheet
    const cropBox = {
      x: this.currentFrameRate * frameWidth, // Décale horizontalement en fonction de la frame
      y: 0,                                  // Ligne par défaut (row 0)
      width: frameWidth,
      height: frameHeight,
    };
  
    // Dessin sur le canvas
    context.drawImage(
      this.image,
      cropBox.x,
      cropBox.y,
      cropBox.width,
      cropBox.height,
      this.position.x,
      this.position.y,
      cropBox.width * this.scale,   // redimensionnement
      cropBox.height * this.scale
    );
  }

  // Mise à jour du NPC à chaque frame
  update(player, HAS_ATTAKE) {
    this.draw();

    // Déplacement horizontal automatique gauche-droite
    this.position.x += this.velocity.x;

    // Gestion des frames pour l’animation
    this.elapsedFrame++;
    if (this.elapsedFrame % this.frameBuffer === 0) {
      if (this.currentFrameRate < this.frameRate - 1) {
        this.currentFrameRate++;
      } else {
        this.currentFrameRate = 0;
      }
    }

    // Application de la gravité
    if (this.position.y + this.height + this.velocity.y < canvas.height) {
      this.velocity.y += GRAVITE;
    } else {
      this.velocity.y = 0;
    }

    // Mouvement de patrouille automatique (limites gauche/droite)
    if (this.position.x < 100) this.velocity.x = 1;
    if (this.position.x > 400) this.velocity.x = -1;

    // Interaction avec le joueur
    const dx = Math.abs(player.position.x - this.position.x); // distance horizontale avec le joueur
    if (dx < 80) { 
      console.log("L'ennemi détecte le joueur !");
      // Si le joueur attaque
      if(HAS_ATTAKE){
        this.image = this.animations.fall.image;  // Change l’animation vers "chute"
        console.log("L'ennemi est attaqué !");
        this.velocity.x = 0;                      // Stoppe le déplacement pendant l’attaque
        setTimeout(()=>{
          this.shouldBeRemoved = true;            // Marque le NPC comme "à supprimer"
        }, 900)
        return;                                   // Stoppe l’update ici
      }
    } else {
      // Sinon, animation par défaut (ex : "run")
      this.image = this.animations.run.image;
    }
  }
}
