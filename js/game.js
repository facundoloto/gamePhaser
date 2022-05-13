import {Jugador} from "../js/jugador.js"
import { Bullet } from "./bullet.js";
import { Enemigo } from "./enemigo.js";
export class  Game extends Phaser.Scene {

constructor() {
super({ key: 'Game' });

}
init(){
    this.shotTime=0
    this.bandera=false
    this.pathCounter=0
    
}

StarImpact(sprite,star) //cambia de escena
{
star.disableBody(true, true);
this.scene.pause('Game')
this.scene.start('Game2')
}
preload(){

    this.load.audio("bg","/gamePhaser/assets/bg.mp3")
    this.load.image("background","./assets/bgSceneOne.png")
    this.load.image("over","./assets/gameover.png")
    this.load.image("ground","./assets/platform1.png")
    this.load.spritesheet('dude','./assets/dude.png',{ frameWidth: 32, frameHeight:48 });
    this.load.spritesheet('enemigos','./assets/enemigos.gif',{ frameWidth: 32, frameHeight:48 });
    this.load.image("star","./assets/star.png")
    this.load.image("shot","./assets/shot.png")
}
create() {

//crear sprite
this.fondo=this.sound.add('bg',{loop:true})
this.fondo.play()
this.add.image(400,300,"background")
const star=this.physics.add.image(780,190,'star')
star.body.allowGravity = false; //desactiva gravedad 
this.Jugador=new Jugador(this,200,300,'dude');//es importar cargar esto antes del backgraound
this.gameover=this.add.image(400,300, 'over')
this.gameover.visible=false
//
//enemigos
this.enemigoOne=new Enemigo(this,590,200,'dude')
this.enemigoTwo=new Enemigo(this,380,450,'dude')
this.enemigoThree=new Enemigo (this,10,20,'dude')
//

//balas

this.bull=new Bullet(this)

this.bullets = this.physics.add.group();
//
//plataformas


const platforms = this.physics.add.staticGroup();//esto hace que la fisica se aplique a todas las plataformas
platforms.create(400, 580, 'ground')
platforms.create(600, 480, 'ground');
platforms.create(50, 250, 'ground');
platforms.create(750, 220, 'ground')
platforms.create(300, 350, 'ground')
platforms.create(500, 250, 'ground')
//

//coliciones

this.physics.add.collider(this.Jugador,platforms)
this.physics.add.collider(this.enemigoOne,platforms)
this.physics.add.collider(this.enemigoTwo,platforms)
this.physics.add.collider(this.enemigoThree,platforms)

this.physics.add.collider(this.bullets,this.enemigoOne,this.bulletImpact,() =>true,this)
this.physics.add.collider(this.bullets,this.enemigoTwo,this.bulletImpact,() =>true,this)
this.physics.add.collider(this.bullets,this.enemigoThree,this.bulletImpact,() =>true,this)


this.physics.add.collider(star,platforms)
this.physics.add.collider(this.Jugador,star, this.StarImpact,() =>true, this);
this.cursors = this.input.keyboard.createCursorKeys();
this.spaceKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
 //personalizamos key
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
frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8}),
frameRate: 10,
repeat: -1
})

 //crear una promesa async await para que primero carge todo esto y asi no se produce un delay apenas inica al momento de moverse ya que se mueve lento por que no carga del todo los recursos
}

 bulletImpact(Sprite){
    Sprite.destroy()
    this.bullets.setActive(false);
    this.bullets.setVisible(false);
   
 }


update(){
  


if (this.cursors.left.isDown )
{
this.bandera='left'
this.Jugador.left()

}

else if (this.cursors.right.isDown)
{
this.bandera='right'
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
    if (this.spaceKey.isDown)
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



