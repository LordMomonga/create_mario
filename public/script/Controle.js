
export  const key = {
  d: {
    pressed: false,
  },
  a: {
    pressed: false,
  },
  w: {
    pressed: false,
  },
  p:{
    pressed: false,
  }
};

window.addEventListener("keydown", (event) => {
  switch (event.key) {
    case "d":
      key.d.pressed = true;
      break;
    case "a":
      key.a.pressed = true;
      break;
    case "w":
      key.w.pressed= true;
      break;
      case "p":
          key.p.pressed = true;
        break
  }
});

window.addEventListener("keyup", (event) => {
  switch (event.key) {
    case "d":
      key.d.pressed = false;
      break;
    case "a":
      key.a.pressed = false;
      break;
     case "w": key.w.pressed = false; break;

    case "p":
      key.p.pressed = false;
      break;
  }
});

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

document.getElementById("jump").addEventListener("touchstart", () => {
 key.w.pressed= true;

});
document.getElementById("jump").addEventListener("touchend", () => {
 key.w.pressed= false;

});


document.getElementById("fight").addEventListener("touchstart", () => {
  key.p.pressed = true;
});
document.getElementById("fight").addEventListener("touchend", () => {
  key.p.pressed = false;
});
});

