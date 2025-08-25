// Importation des constantes et outils nécessaires
import { SPRITE_GROUND_COLUMN, SPRITE_GROUND_ROW, SPRITE_SKY_COLUMN, SPRITE_SKY_ROW, POSITION_AXE_Y_DEBUT, POSITION_AXE_Y_FIN, context, canvas } from "../constant.js";
import SpriteSheet from "./SpriteSheet.js";

// Classe permettant d'afficher les sprites de décor (ciel et sol)
export default class Sprites {
  constructor(position, imageSource){
    this.position = position         // Position de départ du décor (non utilisée directement dans draw ici)
    this.image = new Image();        // Crée un nouvel objet image
    this.image.src = imageSource     // Définit la source de l'image (spritesheet)
  }

  // Méthode qui dessine le décor
  draw(){
    if (!this.image) return;  // Si l’image n’est pas encore chargée, on arrête pour éviter des erreurs

    // Création d’un objet SpriteSheet avec chaque tuile de 16x16 pixels
    const sprites = new SpriteSheet(this.image, 16, 16)

    // Définition des tuiles : "ground" et "sky" à partir de coordonnées données
    sprites.define("ground", SPRITE_GROUND_COLUMN, SPRITE_GROUND_ROW);
    sprites.define("sky", SPRITE_SKY_COLUMN, SPRITE_SKY_ROW);

    // Dessine une tuile "ground" en bas de l’écran (1 seul morceau, positionné à la base du canvas)
    sprites.draw("ground", context, 0, canvas.height - 16)
   
    // Calcul du nombre de tuiles visibles sur X et Y en fonction de la taille du canvas
    const visibleTilesX = Math.ceil(canvas.width / 16);
    const visibleTilesY = Math.ceil(canvas.height / 16);

    // Boucle pour remplir l’arrière-plan avec des tuiles de "sky"
    for (let x = 0; x < visibleTilesX; x++) {
      for (let y = 0; y < visibleTilesY; y++) {
        sprites.drawTiles("sky", context, x, y);
      }
    }

    // Calcul du nombre de tuiles horizontales nécessaires pour recouvrir la largeur en sol
    const tilesX = Math.ceil(canvas.width / 16);

    // Boucle pour dessiner le sol (ground) sur une plage verticale définie par POSITION_AXE_Y_DEBUT et POSITION_AXE_Y_FIN
    for (let x = 0; x < tilesX; x++) {
      for (let y = POSITION_AXE_Y_DEBUT; y < POSITION_AXE_Y_FIN; y++) {
        sprites.drawTiles("ground", context, x, y);
      }
    }
  }

  // Méthode de mise à jour, qui redessine simplement le décor à chaque frame
  update(){
    this.draw()
  }
}
