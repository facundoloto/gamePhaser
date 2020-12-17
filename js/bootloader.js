export class Bootloader  extends Phaser.Scene {
constructor() {
super({ key: 'Bootloader' });

}
init(){

}
preload(){
this.load.on("complete" ,()=>{this.scene.start('Game')}) //esto funciona como una funcion asyn y await ya que espera a que cargue todos los recursos 
this.load.path="./assets/"
this.load.image("background","background1.JPG")
this.load.image("over","gameover.png")
this.load.image("ground","platform1.png")
this.load.spritesheet('dude','dude.png',{ frameWidth: 32, frameHeight:48 });
this.load.image("star","star.png")
}

}
