import Sprites from "./classes/Sprites.js";

export const LARGEUR_CANVAS_MAX = 1700;
export const HAUTEUR_CANVAS_MAX = 576;
export const MARGE_CANVAS_MOBILE = 120;

export const TAILLE_TUILE = 16;
export const GRAVITE = 0.5;
export const VITESSE_JOUEUR = 4;
export const VITESSE_JOUEUR_GAUCHE = -3;
export const HAUTEUR_DE_SAUT = -9;

export const FRAME_BUFFER_STANDARD = 3;
export const FRAME_BUFFER_ATTAQUE = 2;

export const LIGNES_SOL_MIN = 32;
export const LIGNES_SOL_MAX = 40;

export const PLAYER_INITIAL_POSITION = { x: 5, y: 2 };
export const NPC_INITIAL_POSITION = { x: 1700, y: 451 };
//Constante pour l'obstacle 

//constante qui gere les sols
export const POSITION_AXE_Y_DEBUT = window.innerHeight > 600 ? 32 : 33;
export const POSITION_AXE_Y_FIN = 40;

// coonstante de  position de la sprite a recuperer 
export const SPRITE_SKY_COLUMN = 3; // Colonne de la tuile du ciel
export const SPRITE_SKY_ROW = 23; // Ligne de la tuile du ciel
export const SPRITE_GROUND_COLUMN = 0; // Colonne de la tuile du sol
export const SPRITE_GROUND_ROW = 0; // Ligne de la tuile du sol

// pour la constante  d'affichage 
export const canvas = document.querySelector("canvas");
export const context = canvas.getContext("2d");
export const background = new Sprites({ x: 0, y: 0 }, "./assets/imageproject/tiles.png");
