// importowanie class
import { CreateBase } from "./module/createBase.js";
import { CreateShip2 } from "./module/createShip2.js";
import { CreateWordl } from "./module/createWordl.js";

// deklaracja zmienny oraz stałych

const map = document.getElementById("map");
const gameCreator = document.getElementById("gameCreator");
const navX = document.getElementById("navX");
const navY = document.getElementById("navY");
const shipBase = document.getElementById("shipBase");
const levelsDiv = document.querySelectorAll(".level");
const welcomePage = document.querySelector(".welcome");
const content1 = document.querySelector(".content");
const content2 = document.querySelector(".content2");
const goBack = document.getElementById("goBack");
const startGame = document.getElementById("play");
const alert = document.getElementById("alert");
let wordl;
let base;

// tworzenie mapy do Drag&Drop , nasłuchiwanie , podpidanie class, dodawanie , usuwanie statków, blokowie pul w które nie można upuścić statku, blokowanie napotkanych bugów.

levelsDiv.forEach((div) => {
  // sprawdzamy który poziom rozgrywki został wybrany, dzięki czemu możemy stworzyć odpowiednie wielkości mapy oraz ilość statków do rozmieszczenia, wszelkie informacje przekazujemy do tworzonych class
  div.addEventListener("click", (e) => {
    let actuallShip;
    let level = e.target.dataset.level;
    welcomePage.style.display = "none";
    goBack.style.display = "block";
    wordl = new CreateWordl(map, level, navX, navY, content1);
    let actualMapSize = wordl.drawingWordl();
    base = new CreateBase(level, shipBase, content2);
    base.addShip();
    gameCreator.style.display = "flex";
    const tiles = document.querySelectorAll(".shipContainer");

    // sprawdzamy który statek został aktualnie wybrany, dzięki czemu później wiemy co konkretnie musimy stworzyć, oraz dodatkowo dodajemy czerwone pole w którym nie może znaleźć się myszka w chiwli upuszczania statku
    document.addEventListener("mousedown", (e) => {
      if (e.target.tagName === "IMG") {
        actuallShip = e.target;
        wordl.blockTiles(actualMapSize, "red");
      }
    });
    // cofamy czerwone pola z planszy
    document.addEventListener("mouseup", () => {
      wordl.blockTiles(actualMapSize, "green");
    });

    for (let tile of tiles) {
      // dragover (preventDefault) musi być zawsze aby inne eventy drag&drop działały poprawnie
      tile.addEventListener("dragover", (e) => {
        e.preventDefault();
      });
      // nasłuchiwanie na kafelki, -> wiemy w którym miejscu mamy strowrzyć statek, mamy też dodane zabezpieczenia aby statek nie wysunął się poza plansze lub nie najechał na inny statek.
      tile.addEventListener("drop", (e) => {
        let position = e.target.dataset.xy.split(",");
        let statusAdd;
        if (
          e.target.tagName !== "IMG" &&
          !e.target.classList.contains("blocker")
        ) {
          let ship = new CreateShip2(position, e, actuallShip, actualMapSize);
          switch (actuallShip.dataset.size) {
            case "small":
              statusAdd = ship.add();
              break;
            case "medium":
              statusAdd = ship.add();
              break;
            case "big":
              statusAdd = ship.add();
              break;
            default:
              console.log("błąd");
              break;
          }
        }
        if (!statusAdd) {
          base.backToBase(actuallShip.dataset.size);
        }
        wordl.blockTiles(actualMapSize, "green");
      });
    }
  });
});

startGame.addEventListener("click", () => {
  let checkBase = base.checkBase();
  if (checkBase) {
    console.log("przechodzimy dalej");
    alert.innerHTML = "";
    const shipsPositons = document.querySelectorAll(".activeTile");
    wordl.deleteTiles();
    base.deleteElements();
  } else {
    alert.innerHTML = "In the Base are ships";
  }
});

goBack.addEventListener("click", () => {
  welcomePage.style.display = "flex";
  goBack.style.display = "none";
  gameCreator.style.display = "none";
  wordl.deleteTiles();
  base.deleteElements();
});
