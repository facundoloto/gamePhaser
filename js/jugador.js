export class Jugador extends Phaser.GameObjects.Sprite {
    constructor(scene, x, y, type) {
        super(scene, x, y, type)
        scene.add.existing(this);
        scene.physics.world.enable(this)
        this.body.setBounce(0.2); //el this boyd siginifica el cuerpo de este objeto saltara 
        this.body.setCollideWorldBounds(true);//partes del layout donde puede saltar
        this.body.setGravityY(400)//seteamos la gravedad para que solo el jugador tenga gravedad ya que a la hora de disparar hay que eliminar la gravedad
    }
    //metodos para que el objeto se mueva en el update donde se invoque
    left() {
        this.body.setVelocityX(-160);
    }
    right() {
        this.body.setVelocityX(160);
    }
    up() {
        this.body.setVelocityY(-380)
    }
    turn() {
        this.body.setVelocityX(0);
    }

}

