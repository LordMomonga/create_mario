
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