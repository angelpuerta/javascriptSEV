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

    dibujar(scrollX, scrollY) {
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;

        var auxiliar_x = this.x;
        var auxiliar_y = this.y;

        if (y == gameLayer.altoMapa + 32)
            auxiliar_y = this.y + 15;
        else if (y == 32)
            auxiliar_y = this.y - 48;
        else if (x === gameLayer.anchoMapa - 20)
            auxiliar_x = this.x + 75;
        else if (x == 20)
            auxiliar_x = this.x - 35;

        contexto.drawImage(this.imagen,
            auxiliar_x - this.imagen.width / 2 - scrollX,
            auxiliar_y - this.imagen.height / 2 - scrollY);
    }


}
