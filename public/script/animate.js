// Importation des constantes et objets nécessaires depuis d'autres fichiers
import { LARGEUR_CANVAS_MAX, HAUTEUR_DE_SAUT, VITESSE_JOUEUR, VITESSE_JOUEUR_GAUCHE , context, canvas, background } from "./constant.js";
import { key } from "./Controle.js";

// Variable qui stocke le temps de la dernière frame (pour calculer deltaTime)
let lastTime = 0;
// Indique si le joueur est en train d’attaquer
let HAS_ATTAKE = false;

// Fonction principale d’animation
export default function animate(obstacles, player, antagonist = {}) {

  // Fonction exécutée à chaque frame
  function frame(time = 0) {
    // Calcul du temps écoulé depuis la dernière frame
    const deltaTime = time - lastTime;
    lastTime = time;

    // Bord droit de l’écran où, si atteint, le monde défile au lieu du joueur
    const RIGHT_EDGE_SCROLL = canvas.width - 200;

    // Demande au navigateur de relancer cette fonction pour la prochaine frame
    window.requestAnimationFrame(frame);

    // Efface le canvas avec un fond noir
    context.fillStyle = "black";
    context.fillRect(0, 0, canvas.width, canvas.height);

    // Dessine le background
    background.draw();

    // Mise à jour de tous les obstacles
    obstacles.forEach(obs => obs.update());

    // Mise à jour du joueur
    player.update(deltaTime);

    // Mise à jour de l’antagoniste s’il existe et qu’il n’est pas marqué pour suppression
    if (antagonist && !antagonist.shouldBeRemoved) {
      antagonist.update(player, HAS_ATTAKE);
    }

    // Vérifie les collisions joueur <-> obstacles
    obstacles.forEach(obstacle => {
      player.checkCollisionWithObstacle(obstacle);
    });

    // Gestion du saut (touche W)
    if (key.w.pressed ) {
      player.velocity.y = HAUTEUR_DE_SAUT;   // Applique une vitesse verticale
      player.isOnGround = false;             // Le joueur est considéré en l’air
    }

    // Réinitialise la vitesse horizontale du joueur avant calcul des touches
    player.velocity.x = 0;
  
    // Si touche D (droite) pressée
    if(key.d.pressed){
      player.switchSprite("run"); // Animation course

      if(player.position.x < RIGHT_EDGE_SCROLL){
        // Si le joueur n’a pas encore atteint le bord droit -> il avance
        player.velocity.x = VITESSE_JOUEUR;
      } else {
        // Sinon, c’est le monde qui défile vers la gauche
        obstacles.forEach(obs => {
          obs.position.x -= VITESSE_JOUEUR;
          obs.decalage -= VITESSE_JOUEUR /16;
        });
        if (antagonist) antagonist.position.x -= VITESSE_JOUEUR;
        background.position.x -= VITESSE_JOUEUR;
      }

      // Mémorise la dernière direction et orientation
      player.lastDiretion = "right";
      HAS_ATTAKE = false;
      player.facingLeft = false;

    // Si touche A (gauche) pressée
    } else if (key.a.pressed){
      player.switchSprite("run"); // Animation course
      if(player.position.x >50){
        // Si le joueur n’est pas trop collé au bord gauche -> il recule
        player.velocity.x = VITESSE_JOUEUR_GAUCHE;
      } else {
        // Sinon, c’est le monde qui défile vers la droite
        obstacles.forEach(obs => {
          obs.position.x -= VITESSE_JOUEUR;
          obs.decalage -= VITESSE_JOUEUR_GAUCHE /16;
        });
        obstacles.forEach(obs => obs.position.x += VITESSE_JOUEUR_GAUCHE);
        if (antagonist) antagonist.position.x -= VITESSE_JOUEUR_GAUCHE;
        background.position.x -= VITESSE_JOUEUR_GAUCHE;
      }

      // Mémorise la dernière direction et orientation
      player.lastDiretion = "left";
      HAS_ATTAKE = false;
      player.facingLeft = true;

    // Si touche P (attaque) pressée
    } else if(key.p.pressed){
      player.switchSprite("fight"); // Animation attaque
      HAS_ATTAKE = true;

    // Sinon si joueur immobile et au sol -> animation idle
    } else if(player.velocity.y === 0){
      player.switchSprite("idle");
    }

    // Gestion des animations en fonction de la vitesse verticale
    if (player.velocity.y < 0) {
      player.switchSprite("jump"); // Saut
    } else if(player.velocity.y > 0){
      player.switchSprite("fall"); // Chute
    }
  }

  // Démarre la première frame
  window.requestAnimationFrame(frame);
}
