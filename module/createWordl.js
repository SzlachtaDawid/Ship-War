export class CreateWordl {
  constructor(map, level, navX, navY , plan) {
    this.map = map;
    this.level = level;
    this.navX = navX;
    this.navY = navY;
    this.plan = plan;
  }

  drawingWordl() {
    let { map, level, navX, navY, plan } = this;
    let sketch = [];
    let y;
    let x;
    let yInX;
    let xArray;
    let yArray;

    const createElementDiv = function (x, xArray) {
      let createDivNumber = document.createElement("div");
      createDivNumber.textContent = x + 1;
      let createDivString = document.createElement("div");
      createDivString.textContent = xArray[x];
      navX.appendChild(createDivNumber);
      navY.appendChild(createDivString);
    };

    // Wielkość mapy zależna od wybranego poziomu trudności

    switch (level) {
      case "easy":
        for (let x = 0; x < 10; x++) {
          yArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          xArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];
          createElementDiv(x, xArray);
          sketch.push(yArray);
          map.style.width = "504px";
          map.style.height = "504px";
        }
        break;
      case "medium":
        for (let x = 0; x < 11; x++) {
          yArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          xArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k"];
          createElementDiv(x, xArray);
          sketch.push(yArray);
          map.style.width = "554px";
          map.style.height = "554px";
        }
        break;
      case "hard":
        for (let x = 0; x < 12; x++) {
          yArray = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          xArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l"];
          createElementDiv(x, xArray);
          sketch.push(yArray);
          map.style.width = "604px";
          map.style.height = "604px";
        }
        break;

      default:
        console.log("brak danych");
        break;
    }

    // tworzenie całej mapy oraz dodawanie div'om odpowiednich oznaczeń w zależnośćy na którym polu leżą

    for (const subTab of sketch) {
      if (y === undefined) {
        y = 1;
      } else {
        ++y;
      }
      for (const el of subTab) {
        if (yInX === undefined) {
          yInX = y - 1;
        } else if (yInX === xArray.length) {
          yInX = 0;
        } else {
          yInX;
        }
        x = xArray[yInX];
        ++yInX;
        let tiles = document.createElement("div");
        tiles.classList.add("shipContainer");
        tiles.setAttribute("data-xy", x + "," + y);
        map.appendChild(tiles);
      }
    }
    plan.style.display = "block";
    return xArray
  }

  readyBoard (shipsPositions){
    arrayPositions = [];
    shipsPositions.forEach(ship => {
      arrayPositions.push(ship.dataset.xy)
    });
    
  }


  deleteTiles() {
    let {navX, navY, plan} = this;
    const tiles = document.querySelectorAll('.shipContainer')
    tiles.forEach(element => {
        element.remove()
    });
    navX.innerHTML = '';
    navY.innerHTML = '';
    plan.style.display = 'none'
  }

  blockTiles(xArray,status) {
    const activeTiles = document.querySelectorAll('.activeTile')
    activeTiles.forEach(element => {
      let position = element.dataset.xy.split(",");
      for (let index = position[1] - 1, blocker = +position[1] + 1, arrayIndex = xArray.indexOf(position[0]) - 1 ; index <= blocker; index++,arrayIndex++ ) {
        for (let x = 0, index = position[1] - 1; x <= 2; x++, index++) {
          const blockTiles = document.querySelector(`[data-xy="${xArray[arrayIndex] + ',' + index}"]`);
          if(blockTiles){
            switch (status) {
              case "red":
                blockTiles.classList.add('blocker')
                break;
              case "green":
                blockTiles.classList.remove('blocker')
                break;
              default:
                console.log('błąd')
                break;
            }
          }
        }
      }
    });
  }
}
