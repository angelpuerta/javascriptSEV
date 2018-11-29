class Puerta extends Modelo {

    constructor(imagen, imagen2, x, y, next_door) {
        super(imagen, x, y);
        this.opened = false;
        this.next_door = next_door;
        this.imagen2 = imagen2;
    }

    open() {
        this.opened = true;
        this.imagen = new Image();
        this.imagen.src = this.imagen2;
        super.imagen = this.imagen;
    }

    getNextLevel() {
        return this.next_door;
    }

    isOpen() {
        return this.opened;
    }



}
