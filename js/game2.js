import {Jugador} from "../js/jugador.js"
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
this.scene.start('Game')
}
create() {

this.gameover=this.add.image(400,300, 'over')
this.gameover.visible=false
const platforms = this.physics.add.staticGroup();//esto hace que la fisica se aplique a todas las plataformas
this.add.image(400,300,"background")


platforms.create(350, 200, 'ground').setScale(2).refreshBody();
platforms.create(500, 380, 'ground');
platforms.create(0, 220, 'ground')

this.Jugador=new Jugador(this,0,0,'dude');//es importar cargar esto antes del backgraound
const star = this.physics.add.staticGroup();
star.create(500,350,'star')
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

