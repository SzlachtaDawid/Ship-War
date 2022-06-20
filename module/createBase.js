export class CreateBase {
  constructor(level, shipBase, plan) {
    this.level = level;
    this.shipBase = shipBase;
    this.plan = plan
  }

  addShip() {
    let { level, shipBase, plan } = this;
    const createShip = function (img, size, classAndId) {
      let ship = document.createElement("img");
      ship.src = img;
      ship.classList.add(classAndId);
      ship.id = classAndId;
      ship.dataset.size = size;
      shipBase.appendChild(ship);
    };

    const createShips = function (small, medium, big) {
      if (small !== 0) {
        for (let shipNumber = 0; shipNumber < small; shipNumber++) {
         createShip("/prod/zdj/smallShip.png", "small", "shipSmall");
        }
      }
      if (medium !== 0) {
        for (let shipNumber = 0; shipNumber < medium; shipNumber++) {
          createShip("/prod/zdj/mediumShip.png", "medium", "shipMedium");
        }
      }
      if (big !== 0) {
        for (let shipNumber = 0; shipNumber < big; shipNumber++) {
          createShip("/prod/zdj/shipBig.png", "big", "shipBig");
        }
      }
    };

    switch (level) {
      case "easy":
        createShips(3, 3, 2);
        break;
      case "medium":
        createShips(3, 3, 3);
        break;
      case "hard":
        createShips(4, 4, 3);
        break;

      default:
        break;
    }
    plan.style.display = 'block'
  }

  deleteElements() {
    let {shipBase, plan } = this;
    shipBase.innerHTML = '';
    plan.style.display = 'none'
  }
}
