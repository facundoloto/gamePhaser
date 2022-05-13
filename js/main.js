import { Jugador } from "../js/jugador.js";

export class Main extends Phaser.Scene {
    constructor() {
        super({ key: 'Main' });
    }

    StarImpact(sprite, star) //cambia de escena
    {
        star.disableBody(true, true);
        this.fondo.stop()
        this.scene.pause('Main')
        this.scene.start('Game')
    }

    init() {

    }
    preload() {

        this.load.image("background2", "/gamePhaser/assets/firtsScene.jpg")
        this.load.image("star", "/gamePhaser/assets/star.png")
        this.load.spritesheet('dude', '/gamePhaser/assets/dude.png', { frameWidth: 32, frameHeight: 48 });
        this.load.audio("main", "/gamePhaser/assets/main.mp3")
    }

    create() {
        
        this.fondo = this.sound.add('main', { loop: true })
        this.fondo.play()
        this.add.image(400, 300, 'background2')
        this.Jugador = new Jugador(this, 400, 580, 'dude');//es importar cargar esto antes del backgraound
        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        })

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        })
        swal("toca la estrella para empezar el juego")

        const star = this.physics.add.image(600, 600, 'star')
        star.setCollideWorldBounds(true);
        this.physics.add.collider(this.Jugador, star, this.StarImpact, () => true, this);
        this.teclas = this.input.keyboard.createCursorKeys();

    }
    update() {
        if (this.teclas.left.isDown) {
            this.bandera = 'left'
            this.Jugador.left()
            this.Jugador.anims.play('left', true);

        }

        else if (this.teclas.right.isDown) {
            this.bandera = 'right'
            this.Jugador.right()
            this.Jugador.anims.play('right', true);
        }
        else {
            this.Jugador.turn()
        }
        if (this.teclas.up.isDown && this.Jugador.body.touching.down) {
            this.Jugador.up()

        }


    }
}
