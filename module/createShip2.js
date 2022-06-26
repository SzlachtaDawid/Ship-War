export class CreateShip2 {
  constructor(position, e, actuallShip) {
    this.position = position;
    this.e = e;
    this.actuallShip = actuallShip;
  }

  add() {
    let { position, e, actuallShip } = this;
    let img;
    let height;
    let styleTop;
    let size = actuallShip.dataset.size;
    switch (size) {
      case "small":
        img = "zdj/smallShip.png";
        height = "50px";
        break;
      case "medium":
        img = "zdj/mediumShip.png";
        height = "100px";
        styleTop = "-25px";
        break;
      case "big":
        img = "zdj/shipBig.png";
        height = "150px";
        break;

      default:
        break;
    }
    let ship = document.createElement("img");
    ship.src = img;
    ship.style.height = height;
    if (size === "medium") {
      ship.style.top = styleTop;
    }
    ship.setAttribute("data-size", size);
    let top = document.querySelector(
      `[data-xy="${position[0]},${parseInt(position[1]) - 1}"]`
    );
    let mid = document.querySelector(
      `[data-xy="${position[0]},${parseInt(position[1])}"]`
    );
    let bottom = document.querySelector(
      `[data-xy="${position[0]},${parseInt(position[1]) + 1}"]`
    );
    if (
      (size === "big" && top && mid && bottom) ||
      (size === "medium" && top && mid) ||
      (size === "small" && mid)
    ) {
      switch (size) {
        case "small":
          break;
        case "medium":
          top.classList.add("activeTile");
          break;
        case "big":
          top.classList.add("activeTile");
          bottom.classList.add("activeTile");
          break;
        default:
          alert("błąd");
          break;
      }
      ship.setAttribute("data-xy", position);
      e.target.append(ship);
      mid.classList.add("activeTile");

      ship.addEventListener("dragend", (e) => {
        setTimeout(() => {
          if (e.target.querySelector("img") !== null) {
            e.target.removeChild(e.target.querySelector("img"));
          } else if (e.dataTransfer.dropEffect !== "none") {
            if (top) {
              top.classList.remove("activeTile");
            }
            if (mid) {
              mid.classList.remove("activeTile");
            }
            if (bottom) {
              bottom.classList.remove("activeTile");
            }
            e.target.remove();
          }
        }, 0);
      });
      return true;
    } else {
      return false;
    }
  }
}
