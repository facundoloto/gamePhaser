export class Fin extends Phaser.Scene {
    constructor() { 
        super({ key: 'Fin' });
    }
    init() {

    }
    preload() {
        this.load.image("fin", "/gamePhaser/assets/fin.png");
    }
    create() {
        this.add.image(400, 300, 'fin');
    }
    update() {

    }
}
