import { Bootloader} from '/gamePhaser/js/bootloader.js' //las rutas se manejan asi en phaser y xampp
import { Game} from '/gamePhaser/js/game.js'
import { Game2} from '/gamePhaser/js/game2.js'

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  scene: [Bootloader,Game,Game2],
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y:480},
      debug: false
    }
  }
  

}

let game = new Phaser.Game(config);
