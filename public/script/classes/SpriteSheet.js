// Classe permettant de gérer un spritesheet (découpage d'une image en tuiles réutilisables)
export default class SpriteSheet {
  // Le constructeur reçoit l’image complète du spritesheet, ainsi que la largeur et la hauteur d’une tuile
  constructor(image, width, height) {
    this.image = image;      // L’image source (spritesheet complet)
    this.width = width;      // Largeur d’une tuile
    this.height = height;    // Hauteur d’une tuile
    this.tiles = new Map();  // Stockage des tuiles définies, sous forme clé/valeur (nom → canvas)
  }

  // Découpe une tuile du spritesheet et l’associe à un nom
  define(name, x, y) {
    // Création d’un canvas temporaire qui servira de "buffer" pour stocker la tuile
    const buffer = document.createElement("canvas");
    buffer.width = this.width;   // Largeur de la tuile
    buffer.height = this.height; // Hauteur de la tuile

    // Dessine la portion de l’image correspondante dans le buffer
    buffer.getContext("2d").drawImage(
      this.image,                // Image source (spritesheet complet)
      x * this.width,            // Coordonnée X dans l’image (multipliée par la largeur de tuile)
      y * this.height,           // Coordonnée Y dans l’image (multipliée par la hauteur de tuile)
      this.width, this.height,   // Taille de la portion à découper
      0, 0,                      // Position où coller la portion dans le buffer
      this.width, this.height    // Taille du dessin dans le buffer
    );

    // Enregistre cette tuile dans la map sous le nom donné
    this.tiles.set(name, buffer);
  }

  // Dessine une tuile déjà définie sur le contexte donné à une position (x, y)
  draw(name, context, x, y) {
    const buffer = this.tiles.get(name); // Récupère la tuile par son nom
    context.drawImage(buffer, x, y);     // Dessine la tuile à la position (x, y)
  }

  // Dessine une tuile en utilisant des coordonnées de type "grille"
  drawTiles(name, context, x, y) {
    // Multiplie par la largeur et la hauteur des tuiles pour placer correctement
    this.draw(name, context, x * this.width, y * this.height);
  }
}
