import { LARGEUR_CANVAS_MAX, HAUTEUR_CANVAS_MAX, PLAYER_INITIAL_POSITION, NPC_INITIAL_POSITION } from "./constant.js";
import Player from "./classes/Player.js";
import Npc from "./classes/Npc.js";
import Obstacle from "./classes/Obstacles.js";
import animate from "./animate.js";

const canvas = document.querySelector("canvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth > 1000 ? LARGEUR_CANVAS_MAX : window.innerWidth + 120;
canvas.height = window.innerHeight > 600 ? HAUTEUR_CANVAS_MAX : window.innerHeight;

 const obs = new Obstacle({ x: 30, y: 383 }, "./assets/imageproject/tiles.png", 2, 24, 0);
 const obs1 = new Obstacle({ x: 318, y: 430 }, "./assets/imageproject/tiles.png", 20, 27, 0);

const player = new Player({
  position: {
    x: PLAYER_INITIAL_POSITION.x,
    y: PLAYER_INITIAL_POSITION.y,
  },
  imageSrc: "./assets/imageproject/marioProjects/_Idle.png",
  frameRate: 10,
  animations: {
    idle: {
      imageSrc: "./assets/imageproject/marioProjects/_Idle.png",
      frameRate: 10,
      frameBuffer: 3,
    },

    run: {
      imageSrc: "./assets/imageproject/marioProjects/_Run.png",
      frameRate: 10,
      frameBuffer: 3,
    },
    jump: {
      imageSrc: "./assets/imageproject/marioProjects/_Jump.png",
      frameRate: 3,
      frameBuffer: 3,
    },
    fall: {
      imageSrc: "./assets/imageproject/marioProjects/_Fall.png",
      frameRate: 3,
      frameBuffer: 3,
    },
    fight: {
      imageSrc: "./assets/imageproject/marioProjects/_Attack2.png",
      frameRate: 6,
      frameBuffer: 2,
    },
  },
});

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




animate( [obs,obs1], player, antagonist );




window.addEventListener("DOMContentLoaded", () => {
  // Ajoute tous les event listeners ici

  
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

