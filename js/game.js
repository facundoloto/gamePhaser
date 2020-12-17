import {Jugador} from "../js/jugador.js"
export class  Game extends Phaser.Scene {

constructor() {
super({ key: 'Game' });

}
init(){

}


create() {

this.gameover=this.add.image(400,300, 'over')
this.gameover.visible=false
const platforms = this.physics.add.staticGroup();//esto hace que la fisica se aplique a todas las plataformas
const star=this.add.image(400,300,"background")
this.Jugador=new Jugador(this,200,300,'dude');//es importar cargar esto antes del backgraound
this.add.image(780,190,'star')
platforms.create(400, 580, 'ground').setScale(2).refreshBody();
platforms.create(600, 480, 'ground');
platforms.create(50, 250, 'ground');
platforms.create(750, 220, 'ground')
platforms.create(300, 350, 'ground')
platforms.create(500, 250, 'ground')


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
key: 'turn',
frames: [ { key: 'dude', frame: 4 } ],
frameRate: 20
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

this.load.on("complete" ,()=>{this.scene.start('Game')})
this.physics.add.collider(this.Jugador,star)
}
change() //cambia de escena
{
this.scene.pause('Game')
this.scene.start('Game2')
}



update(){

if (this.cursors.left.isDown)
{
this.Jugador.left()

this.Jugador.anims.play('left', true);
}
else if (this.cursors.right.isDown)
{

this.Jugador.right()


this.Jugador.anims.play('right', true);
}
else{
this.Jugador.turn()

this.Jugador.anims.play('turn'); //si no se apreta ninguna tecla se queda en 0 asi no se mueve
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

