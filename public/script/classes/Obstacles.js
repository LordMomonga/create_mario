// Importation de la classe SpriteSheet et des constantes globales
import SpriteSheet from "./SpriteSheet.js";
import { context, canvas, POSITION_AXE_Y_DEBUT } from "../constant.js";

// Classe qui représente un obstacle dans le jeu
export default class Obstacle {
  constructor(position, imageSource, px, py) {
    // Position de départ de l'obstacle
    this.position = { ...position };

    // Image source de l'obstacle
    this.image = new Image();
    this.image.src = imageSource;

    // Coordonnées utilisées pour placer les tuiles (tiles) de l'obstacle
    this.py = py; 
    this.px = px;

    // Décalage horizontal (utile si le niveau "défile")
    this.decalage = 0; 

    // Variable pour signaler si une collision a été détectée
    this.collision = false;

    // Définition d'une première hitbox (zone de collision)
    this.hitBox = {
      position: {
        x: this.position.x + this.decalage,
        y: this.position.y,
      },
      width: 10,
      height: 10,
    };
  }

  // Met à jour la hitbox en fonction de la position actuelle
  hiter() {
    this.hitBox = {
      position: {
        x: this.position.x,
        y: this.position.y,
      },
      width: 165, // largeur arbitraire pour couvrir plusieurs tuiles
      height: 10, // faible hauteur → simule une surface sur laquelle on peut marcher
    };
  }

  // Dessine l’obstacle à l’écran
  draw() {
    // Vérifie si l'image est bien chargée
    if (!this.image) return;
    
    // Crée une grille de sprites à partir de l'image source
    const sprites = new SpriteSheet(this.image, 16, 16);
    sprites.define("ground", 0, 0); // Définit une tuile "ground" depuis la source

    // Dessine une tuile de sol tout en bas du canvas
    sprites.draw("ground", context, 0, canvas.height - 16);
    
    // Boucle pour dessiner les tuiles de l'obstacle
    for (let x = this.px ; x < this.px + 10 ; x++) {
      for (let y = this.py; y < this.py + 1; y++) {
        // Chaque tuile est dessinée avec un décalage horizontal
        sprites.drawTiles("ground", context, x + this.decalage, y);
      }
    }
  }

  // Détecte une collision en comparant une coordonnée Y donnée avec la hitbox
  collider(y) {
    if(this.hitBox.y === y ){ // ⚠️ Ici, bug potentiel : devrait être this.hitBox.position.y
      this.collision = true;
    }
  }

  // Met à jour l'obstacle : hitbox, debug visuel, collisions et dessin
  update(y) {
    this.hiter(); // Recalcule la hitbox
   
    // Debug visuel → rectangle rouge semi-transparent affichant la hitbox
    context.fillStyle = "rgba(255,0, 0, 0.5)";
    context.fillRect(
      this.hitBox.position.x,
      this.hitBox.position.y,
      this.hitBox.width,
      this.hitBox.height
    );

    // Vérifie la collision avec une valeur Y donnée
    this.collider(y);

    // Dessine l’obstacle
    this.draw();
  }
}
