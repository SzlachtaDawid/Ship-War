// importowanie class
import { CreateBase } from "./module/createBase.js";
import { CreateShip2 } from "./module/createShip2.js";
import { CreateWordl } from "./module/createWordl.js";

// deklaracja zmienny oraz stałych

const map = document.getElementById("map");
const navX = document.getElementById("navX");
const navY = document.getElementById("navY");
const shipBase = document.getElementById("shipBase");
const levelsDiv = document.querySelectorAll(".level");
const welcomePage = document.querySelector(".welcome");
const content1 = document.querySelector(".content");
const content2 = document.querySelector(".content2");
const goBack = document.getElementById("goBack");
let wordl;
let base;

// Tworzenie logiki

levelsDiv.forEach((div) => {
  div.addEventListener("click", (e) => {
    let actuallShip;
    let level = e.target.dataset.level;
    welcomePage.style.display = "none";
    goBack.style.display = "block";
    wordl = new CreateWordl(map, level, navX, navY, content1);
    let actualMapSize = wordl.drawingWordl();
    base = new CreateBase(level, shipBase, content2);
    base.addShip();
    const tiles = document.querySelectorAll(".shipContainer");

    document.addEventListener("mousedown", (e) => {
      actuallShip = e.target;
    });

    for (let tile of tiles) {
      tile.addEventListener("dragover", (e) => {
        e.preventDefault();
      });

      tile.addEventListener("drop", (e) => {
        let position = e.target.dataset.xy.split(",");
        let ship = new CreateShip2(position, e, actuallShip, actualMapSize);
        console.log( e.target.classList.contains('test'))
        if (e.target.tagName !== "IMG" && !e.target.classList.contains('test')) {
          switch (actuallShip.dataset.size) {
            case "small":
              ship.add();
              break;
            case "medium":
              ship.add();
              break;
            case "big":
              ship.add();
              break;
            default:
              console.log("błąd");
              break;
          }
        }
      });
    }
  });
});

goBack.addEventListener("click", () => {
  welcomePage.style.display = "flex";
  goBack.style.display = "none";
  wordl.deleteTiles();
  base.deleteElements();
});


























const createWordl = function () {
  const map = document.getElementById("map");
  const level = [
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  ];

  let y;
  let x;
  let yInX;
  let xArray = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"];

  // tworzenie całej mapy oraz dodawanie div'om odpowiednich oznaczeń w zależnośćy na którym polu leżą

  for (const subTab of level) {
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

  let actuallShip;

  document.addEventListener("mousedown", (e) => {
    actuallShip = e.target.dataset.size;
    console.log(e.clientX);
  });

  // document.querySelector('body').addEventListener('dragend', (e) => {
  //   console.log(e.dataTransfer.dropEffect)
  // })

  // Event listeners for draggable element imgBox
  // ship.forEach((element) => {
  //   element.addEventListener("dragstart", (e) => {
  //     console.log("drag Start");
  //     setTimeout(() => {
  //       e.target.remove();
  //     }, 0);
  //   });
  // });
  // shipBig.forEach((element) => {
  //   element.addEventListener("dragstart", (e) => {
  //     console.log("drag Start");
  //     setTimeout(() => {
  //       e.target.remove();
  //     }, 0);
  //   });
  // });

  const tiles = document.querySelectorAll(".shipContainer");
  for (let tile of tiles) {
    tile.addEventListener("dragover", (e) => {
      e.preventDefault();
    });

    // tile.addEventListener("dragenter", (e) => {
    //   console.log("Wjechane");
    // });

    // tile.addEventListener("dragleave", (e) => {
    //   console.log("Zjechane");
    // });
    let smallShip;

    tile.addEventListener("drop", (e) => {
      let position = e.target.dataset.xy.split(",");
      smallShip = new CreateShip2(
        "/prototyp/zdj/smallShip.png",
        "50px",
        position,
        actuallShip,
        e,
        actuallShip
      );
      switch (actuallShip) {
        case "small":
          smallShip.remove();
          smallShip.add();
          smallShip.test();
          break;
        case "big":
          let bigShip = new CreateShip(
            "/prototyp/zdj/shipBig.png",
            "150px",
            position,
            actuallShip,
            e,
            actuallShip
          );
          bigShip.add();
          break;
        default:
          console.log("błąd");
          break;
      }
    });
  }
};
