import {Jugador} from "../js/jugador.js"
import { Bullet } from "./bullet.js";
export class  Game extends Phaser.Scene {

constructor() {
super({ key: 'Game' });

}
init(){

}

StarImpact(sprite,star) //cambia de escena
{
star.disableBody(true, true);
this.scene.pause('Game')
this.scene.start('Game2')
}
create() {


//crear sprite
this.add.image(400,300,"background")
const star=this.physics.add.image(780,190,'star')
this.Jugador=new Jugador(this,200,300,'dude');//es importar cargar esto antes del backgraound
this.gameover=this.add.image(400,300, 'over')
this.gameover.visible=false
//

//balas
this.bullet=new Bullet(this,0,0,'shot')
this.bullets= this.physics.add.group();
//
//plataformas
const platforms = this.physics.add.staticGroup();//esto hace que la fisica se aplique a todas las plataformas
platforms.create(400, 580, 'ground').setScale(2).refreshBody();
platforms.create(600, 480, 'ground');
platforms.create(50, 250, 'ground');
platforms.create(750, 220, 'ground')
platforms.create(300, 350, 'ground')
platforms.create(500, 250, 'ground')
//

//coliciones
this.physics.add.collider(this.Jugador,platforms)
this.physics.add.collider(star,platforms)
this.physics.add.collider(this.Jugador,star, this.StarImpact,() =>true, this);
this.cursors = this.input.keyboard.createCursorKeys();
// propiedades del coliciones y salto del Jugador
//se limita a moverse dentro de la escena*/
//animaciones para cuando se mueva a la derecha o izquierda

//

//animaciones
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

		 



 //crear una promesa async await para que primero carge todo esto y asi no se produce un delay apenas inica al momento de moverse ya que se mueve lento por que no carga del todo los recursos
}




update(){

if (this.cursors.left.isDown)
{
this.Jugador.left()
this.Jugador.anims.play('left', true);
this.bullet.fire(this.Jugador.x,this.Jugador.y)//esto es para que la bala se dispera justo donde esta el jugador
this.bullets.create()


}
else if (this.cursors.right.isDown)
{

this.Jugador.right()

this.Jugador.anims.play('right', true);
}
else{
this.Jugador.turn()


}
if (this.cursors.up.isDown && this.Jugador.body.touching.down)
{
this.Jugador.up()

}






//si toca el suelo pierde
if(this.Jugador.y>600){
this.gameover.visible=true
this.scene.pause()

}






}

}

