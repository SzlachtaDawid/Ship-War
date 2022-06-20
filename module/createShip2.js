export class CreateShip2 {
    constructor(position,e,actuallShip, actualMapSize) {
        this.position = position;
        this.e = e;
        this.actuallShip = actuallShip;
        this.actualMapSize = actualMapSize;
    }
  
    add() {
      let {position,e,actuallShip, actualMapSize} = this;
      let img;
      let height;
      let styleTop;
      let size = actuallShip.dataset.size
      switch (size) {
        case "small":
          img = "zdj/smallShip.png";
          height = "50px";
          break;
        case "medium":
          img = "zdj/mediumShip.png";
          height = "100px";
          styleTop = "-25px"
          break;
        case "big":
          img = "zdj/shipBig.png";
          height = "150px";
          break;

        default:
          break;
      }
        let ship = document.createElement('img');
        const base = document.getElementById('shipBase');
        ship.src = img;
        ship.style.height = height; 
        if(size === 'medium'){
          ship.style.top = styleTop
        }
        ship.setAttribute('data-size', size)                                         
        let top = document.querySelector(`[data-xy="${position[0]},${parseInt(position[1]) - 1}"]`);
        let mid = document.querySelector(`[data-xy="${position[0]},${parseInt(position[1])}"]`);
        let bottom = document.querySelector(`[data-xy="${position[0]},${parseInt(position[1]) + 1}"]`);
        if((size === 'big' && top && mid && bottom) || (size === 'medium' && top && mid) || (size === 'small' && mid)) {
          switch (size) {
            case 'small':
                console.log(actualMapSize)
                console.log(position)
                console.log(actualMapSize.indexOf(position[0]))
                console.log(actualMapSize[actualMapSize.indexOf(position[1])])
                let test1 = document.querySelector(`[data-xy="${actualMapSize[actualMapSize.indexOf(position[0]) + 1]},${parseInt(position[1]) + 1}"]`);
                test1.classList.add('test')
              break;
            case 'medium':
              top.classList.add('activeTile')
              break;
            case 'big':
              top.classList.add('activeTile')
              bottom.classList.add('activeTile')
              break
            default:
              alert('błąd')
              break;
          }
          ship.setAttribute('data-xy', position)
          e.target.append(ship)
          mid.classList.add('activeTile');
        } else {
          base.append(ship)
        };

        ship.addEventListener('dragend', (e) => {
          console.log(e)
          setTimeout(() => {
            if(e.target.querySelector('img') !== null){
              e.target.removeChild(e.target.querySelector('img'));
            } else if(e.dataTransfer.dropEffect !== 'none') {
              if(top){top.classList.remove('activeTile')}
              if(mid){mid.classList.remove('activeTile')}
              if(bottom){bottom.classList.remove('activeTile')}  
              e.target.remove();
            }
          }, 0);
        })
    }

  }
  