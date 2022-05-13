
export class Menu extends Phaser.Scene {
    constructor() {
    super({ key: 'Menu' });
    
    }
    init(){
    
    }
    preload(){
   
    this.load.image("background1","/gamePhaser/assets/menu.gif")
    this.load.image("start","/gamePhaser/assets/enter.png")
    this.load.audio("intro","/gamePhaser/assets/zelda.mp3")
    }
    create(){
    this.fondo=this.sound.add('intro',{loop:true})
    this.fondo.play()
    this.add.image(400,300, 'background1')
    this.start=this.add.image(400,300, 'start')
   
    this.enter = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER);
   
    
    }
    update(){
     if(this.enter.isDown){
        this.fondo.stop()
      
        this.scene.pause('Menu')
       
       
        this.scene.start('Main')  
     }
   
    }
    }
    