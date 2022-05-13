 //las rutas se manejan asi en phaser y xampp
import { Menu } from "/gamePhaser/js/menu.js";
import {Main} from '/gamePhaser/js/main.js'
import { Game} from '/gamePhaser/js/game.js'
import { Game2} from '/gamePhaser/js/game2.js'
import { Game3} from '/gamePhaser/js/game3.js'
import { Fin} from '/gamePhaser/js/fin.js'

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [Menu,Main,Game,Game2,Game3,Fin],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: {},
      debug: false
    }
  }
  

}

let game = new Phaser.Game(config);
