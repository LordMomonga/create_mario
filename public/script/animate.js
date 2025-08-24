
import { LARGEUR_CANVAS_MAX, HAUTEUR_DE_SAUT, VITESSE_JOUEUR, VITESSE_JOUEUR_GAUCHE , context, canvas, background } from "./constant.js";
import { key } from "./Controle.js";
let lastTime = 0;
let HAS_ATTAKE = false;

export default function animate(obstacles, player, antagonist = {}) {

  function frame(time = 0) {
    const deltaTime = time - lastTime;
    lastTime = time;
     const RIGHT_EDGE_SCROLL = canvas.width - 200; // Quand le joueur arrive ici, le monde bouge


    window.requestAnimationFrame(frame); // 🔹 Lancer la prochaine frame

    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    background.draw();

    // Mettre à jour tous les obstacles
    obstacles.forEach(obs => obs.update());

    player.update(deltaTime);

    // Mettre à jour l'antagonist si il existe
    if (antagonist && !antagonist.shouldBeRemoved) {
      antagonist.update(player, HAS_ATTAKE);
    }

    // Vérifier collisions avec obstacles
    obstacles.forEach(obstacle => {
      player.checkCollisionWithObstacle(obstacle);
    });

// Déplacement vertical
      if (key.w.pressed ) {
    player.velocity.y = HAUTEUR_DE_SAUT;
    player.isOnGround = false; // Le joueur est dans les airs
     }
    // Déplacement joueur
    player.velocity.x = 0;
  
    if(key.d.pressed){
      player.switchSprite("run");

    if(player.position.x < RIGHT_EDGE_SCROLL){
    player.velocity.x = VITESSE_JOUEUR;

    }else{
          // décaler le monde vers la gauche
        obstacles.forEach(obs => {obs.position.x -= VITESSE_JOUEUR
            obs.decalage -= VITESSE_JOUEUR /16;
        });

        if (antagonist) antagonist.position.x -= VITESSE_JOUEUR;
        background.position.x -= VITESSE_JOUEUR; // ton background doit avoir une propriété x
    }
      player.lastDiretion = "right";
      HAS_ATTAKE = false;
      player.facingLeft = false;

    } else if (key.a.pressed){
      player.switchSprite("run");
      if(player.position.x >50){
        player.velocity.x = VITESSE_JOUEUR_GAUCHE;
      }else {
         obstacles.forEach(obs => {obs.position.x -= VITESSE_JOUEUR
            obs.decalage -= VITESSE_JOUEUR_GAUCHE /16;
        });
        obstacles.forEach(obs => obs.position.x += VITESSE_JOUEUR_GAUCHE);
        if (antagonist) antagonist.position.x -= VITESSE_JOUEUR_GAUCHE;
        background.position.x -= VITESSE_JOUEUR_GAUCHE;
      }
      player.lastDiretion = "left";
      HAS_ATTAKE = false;
      player.facingLeft = true;

    } else if(key.p.pressed){
      player.switchSprite("fight");
      HAS_ATTAKE = true;

    } else if(player.velocity.y === 0){
      player.switchSprite("idle");
    }

    if (player.velocity.y < 0) {
      player.switchSprite("jump");
    } else if(player.velocity.y > 0){
      player.switchSprite("fall");

    }
  }

  // Lancer la première frame
  window.requestAnimationFrame(frame);
}