export class Bullet extends Phaser.GameObjects.Image {
    constructor(scene) {
        super(scene, 0, 0, 'shot');
        scene.add.existing(this);
        scene.physics.world.enable(this);
        this.time = 0;
    }


    shot(scene, x, y, type, balas, bandera) {
        if (this.time < scene.time.now) {
            this.time = scene.time.now + 275 //esto sirve para que no se disparen varias balas
            let shot
            if (bandera == true) {
                shot = balas.create(x, y, type);

            } //si la bandera da verdadero siginifica que esta posicionado a la derecha entonces la bala tiene que ir en esa direccion
            else {
                shot = balas.create(x, y, type);

            }
            shot.outOfBoundsKill = true //la bala desaparece
            shot.body.velocity.y = 0
            if (bandera == 'left') {
                shot.body.setVelocityX(-250); //si la bandera es true va hacia a la izquierda
            }
            else if (bandera == 'right') {
                shot.body.setVelocityX(250); //si da falso se va a la derecha
            }
        }
    }


}