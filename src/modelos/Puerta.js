class Puerta extends Modelo {

    constructor(x, y, next_door) {
        super(imagenes.puerta_cerrada, x, y);
        this.opened = false;
        this.next_door = next_door;
    }

    open(){
        this.opened = true;
        this.imagen = new Image();
        this.imagen.src = imagenes.puerta_abierta;
        super.imagen = this.imagen;
    }

    getNextLevel(){
        return this.next_door;
    }

    isOpen(){
        return this.opened;
    }
}
