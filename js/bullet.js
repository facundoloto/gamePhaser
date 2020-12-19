export class Bullet extends Phaser.GameObjects.Sprite {
    constructor(scene,x,y,type){
        super(scene,x,y,type)
        Phaser.GameObjects.Image.call(this, scene, x,y,type);
        scene.add.existing(this);
scene.physics.world.enable(this)
      
    
    }
    fire (x,y)
    {
        this.setPosition(x, y - 50);
        this.setActive(true);
        this.setVisible(true);
    }
  
    }
    
    