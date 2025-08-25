// Importation des constantes depuis le fichier constant.js
import { LARGEUR_CANVAS_MAX, HAUTEUR_CANVAS_MAX, PLAYER_INITIAL_POSITION, NPC_INITIAL_POSITION } from "./constant.js";
//importation des classes necessaires
import Player from "./classes/Player.js";
import Npc from "./classes/Npc.js";
import Obstacle from "./classes/Obstacles.js";
import animate from "./animate.js";

// recupération du canvas dans le html
const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

// Définit la largeur du canvas : si l’écran est grand, utilise la largeur max, sinon ajoute une marge de 120
canvas.width = window.innerWidth > 1000 ? LARGEUR_CANVAS_MAX : window.innerWidth + 120;
// Définit la hauteur du canvas : si l’écran est grand, utilise la hauteur max, sinon prend la hauteur de la fenêtre
canvas.height = window.innerHeight > 600 ? HAUTEUR_CANVAS_MAX : window.innerHeight;


// Création d’un premier et 2eme obstacle, utilisant un sprite de tiles
 const obs = new Obstacle({ x: 30, y: 383 }, "./assets/imageproject/tiles.png", 2, 24, 0);
 const obs1 = new Obstacle({ x: 318, y: 430 }, "./assets/imageproject/tiles.png", 20, 27, 0);

const player = new Player({
  position: {
    x: PLAYER_INITIAL_POSITION.x,// Position initiale en X
    y: PLAYER_INITIAL_POSITION.y,// Position initiale en Y
  },
  imageSrc: "./assets/imageproject/marioProjects/_Idle.png",//sprite par defaut
  frameRate: 10,// nombre d'image par cycle 
  animations: {// les differentes animations du joueur
    idle: {
      imageSrc: "./assets/imageproject/marioProjects/_Idle.png",//animation immobile)
      frameRate: 10,
      frameBuffer: 3,
    },

    run: {
      imageSrc: "./assets/imageproject/marioProjects/_Run.png",//animation course
      frameRate: 10,
      frameBuffer: 3,
    },
    jump: {
      imageSrc: "./assets/imageproject/marioProjects/_Jump.png",//animation saut
      frameRate: 3,
      frameBuffer: 3,
    },
    fall: {
      imageSrc: "./assets/imageproject/marioProjects/_Fall.png",//animation chute
      frameRate: 3,
      frameBuffer: 3,
    },
    fight: {
      imageSrc: "./assets/imageproject/marioProjects/_Attack2.png",//animation attaque
      frameRate: 6,
      frameBuffer: 2,
    },
  },
});


//creation de l'ennemi
const antagonist = new Npc(
  { x: NPC_INITIAL_POSITION.x, y: NPC_INITIAL_POSITION.y }, 
  "./assets/imageproject/marioProjects/Slime1/Idle/Slime1_Idle_body.png", 
  6, // frameRate de l’ennemi
  2.25, // frameBuffer (vitesse de l’animation)
  1.5, // scale (agrandissement)
  {
    idle: {
      imageSrc: "./assets/imageproject/marioProjects/Slime1/Idle/Slime1_Idle_full.png",
      frameRate: 6,
      frameBuffer: 4,
    },
    run: {
      imageSrc: "./assets/imageproject/marioProjects/Slime1/Run/Slime1_Run_full.png",
      frameRate: 6,
      frameBuffer: 4,
    },
    attack: {
      imageSrc: "./assets/imageproject/marioProjects/Slime1/Attack/Slime1_Attack_body.png",
      frameRate: 6,
      frameBuffer: 3,
    },
      fall: {
      imageSrc: "./assets/imageproject/marioProjects/Slime1/Death/Slime1_Death_full.png",
      frameRate: 6,
      frameBuffer: 3,
    }
  }
);



//la boucle d'animation du jeu avec les obstacles, le joueur ett< l'ennemi
animate( [obs,obs1], player, antagonist );




window.addEventListener("DOMContentLoaded", () => {
  // Ajoute des controles tactiles pour mobile

  
document.getElementById("left").addEventListener("touchstart", () => {
  key.a.pressed = true;
});
document.getElementById("left").addEventListener("touchend", () => {
  key.a.pressed = false;
});

document.getElementById("right").addEventListener("touchstart", () => {
  key.d.pressed = true;
});
document.getElementById("right").addEventListener("touchend", () => {
  key.d.pressed = false;
});

document.getElementById("jump").addEventListener("click", () => {
  player.velocity.y = HAUTEUR_DE_SAUT;
});

document.getElementById("fight").addEventListener("touchstart", () => {
  key.p.pressed = true;
});
document.getElementById("fight").addEventListener("touchend", () => {
  key.p.pressed = false;
});
});

