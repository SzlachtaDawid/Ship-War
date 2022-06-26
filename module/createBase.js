export class CreateBase {
  constructor(level, shipBase, plan) {
    this.level = level;
    this.shipBase = shipBase;
    this.plan = plan
  }

  addShip() {
    let { level, shipBase, plan } = this;
    const shipsArray = []
    const createShip = function (img, size, classAndId) {
      let ship = document.createElement("img");
      ship.src = img;
      ship.classList.add(classAndId);
      ship.id = classAndId;
      ship.dataset.size = size;
      shipBase.appendChild(ship);
      const shipObject = {
        element: ship,
        size: size
      }
      shipsArray.push(shipObject)
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
        createShips(1, 0, 1);
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
    const container = document.querySelector('.content2');
    const blocker = document.createElement('div');
    blocker.style.height = '500px';
    blocker.style.width = '330px';
    blocker.style.position = 'absolute'
    blocker.style.left = '0';
    blocker.style.top= '0';
    blocker.style.display = 'none'
    container.appendChild(blocker)
    shipsArray.forEach(ship => {
      ship.element.addEventListener("dragover", (e) => {
        e.preventDefault();
      });
      ship.element.addEventListener('dragend',(e) => {
        blocker.style.display = 'none'
        if(e.dataTransfer.dropEffect === 'copy'){
          ship.element.remove()
        }
      })
      ship.element.addEventListener('dragstart', () => {
        setTimeout(() => {
          blocker.style.display = 'block'
        }, 0);
      })

    });

  }

  backToBase(shipSize) {
    let {shipBase} = this;
    const createShip = function (img, size, classAndId) {
      let ship = document.createElement("img");
      ship.src = img;
      ship.classList.add(classAndId);
      ship.id = classAndId;
      ship.dataset.size = size;
      shipBase.appendChild(ship);
      ship.addEventListener("dragover", (e) => {
        e.preventDefault();
      });
      ship.addEventListener('dragend',(e) => {
        if(e.dataTransfer.dropEffect === 'copy'){
          ship.remove()
        }
      })
    };

    switch (shipSize) {
      case "small":
        createShip("/prod/zdj/smallShip.png", "small", "shipSmall");
        break;
      case "medium":
        createShip("/prod/zdj/mediumShip.png", "medium", "shipMedium");
        break;
      case "big":
        createShip("/prod/zdj/shipBig.png", "big", "shipBig");
        break;  
      default:
        break;
    }
  }

  checkBase() {
    let {shipBase} = this;
    if(!shipBase.hasChildNodes()){
      return true
    } else {
      return false
    }
  }

  deleteElements() {
    let {shipBase, plan } = this;
    shipBase.innerHTML = '';
    plan.style.display = 'none'
  }
}
