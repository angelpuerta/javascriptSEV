class DisparoEnemigo extends DisparoBase {

    constructor(x, y, destino) {
        super(imagenes.disparo_enemigo, x, y)
        this.normal = Math.sqrt(Math.pow(x - destino.x, 2) + Math.pow(y - destino.y, 2));
        this.multiplicador = 4;
        this.vx = -4 * (x - destino.x) / this.normal;
        this.vy = -4 * (y - destino.y) / this.normal;
    }


    actualizar() {

    }

}