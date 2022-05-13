import {Jugador} from "../js/jugador.js"
import { Bullet } from "./bullet.js";
export class  Game2 extends Phaser.Scene {

constructor() {
super({ key: 'Game2' });

}
init(){

}

StarImpact(sprite,star) //cambia de escena
{
star.disableBody(true, true);
this.scene.pause('Game2')
this.scene.start('Game3')
}
preload(){
this.load.image("bg2","./assets/bgScene3.png")
}
create() {

this.gameover=this.add.image(400,300, 'over')
this.gameover.visible=false
const platforms = this.physics.add.staticGroup();//esto hace que la fisica se aplique a todas las plataformas
this.add.image(400,300,"bg2")


platforms.create(400, 580, 'ground')
platforms.create(300, 600, 'ground')
platforms.create(500, 600, 'ground')
platforms.create(600, 480, 'ground');
platforms.create(50, 250, 'ground');
platforms.create(750, 220, 'ground')
platforms.create(300, 350, 'ground')
platforms.create(500, 250, 'ground')

this.Jugador=new Jugador(this,0,100,'dude');//es importar cargar esto antes del backgraound
const star = this.physics.add.staticGroup();
star.create(500,350,'star')
this.bull=new Bullet(this)
this.shotTime=0
this.bullets = this.physics.add.group();
// propiedades del coliciones y salto del Jugador
//se limita a moverse dentro de la escena*/
//animaciones para cuando se mueva a la derecha o izquierda
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
//metodo que obtiene todos los eventos del teclado*/
//this.cursors = this.input.keyboard.createCursorKeys();
this.physics.add.collider(this.Jugador,platforms)
this.cursors = this.input.keyboard.createCursorKeys();
this.physics.add.collider(star,platforms)
this.physics.add.collider(this.Jugador,star, this.StarImpact,() =>true, this);
this.cursors = this.input.keyboard.createCursorKeys();

this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
 //personalizamos key

this.bandera=false
}


update(){

if (this.cursors.left.isDown)
{
    this.bandera=true
this.Jugador.left()
this.Jugador.anims.play('left', true);


}
else if (this.cursors.right.isDown)
{
this.Jugador.right()
this.bandera=false

this.Jugador.anims.play('right', true);

}
else{
this.Jugador.turn()


}
if (this.cursors.up.isDown)
{
this.Jugador.up()

}

if (this.spaceKey.isDown || this.spaceKey.isDown && this.cursors.up.isDown) //si apreta arriba puede disparar tambien
{
    
this.bull.shot(this,this.Jugador.x,this.Jugador.y,'shot',this.bullets,this.bandera)




    
        

    
}




//si toca el suelo pierde
if(this.Jugador.y>600){
this.gameover.visible=true
this.scene.pause()

}






}
}

