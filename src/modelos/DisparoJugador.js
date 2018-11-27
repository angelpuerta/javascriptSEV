class DisparoJugador extends DisparoBase {

    constructor(x, y, orientacion) {
        super(imagenes.disparo_jugador, x, y)
        this.vx = 0;
        this.vy = 0;
        this.velocidad = 9;
        this.orientar(orientacion);
    }

    orientar(orientacion) {
        switch (orientacion) {
            case orientaciones.arriba:
                this.vy = this.velocidad * -1;
                break;
            case orientaciones.abajo:
                this.vy = this.velocidad;
                break;
            case orientaciones.derecha:
                this.vx = this.velocidad;
                break;
            case orientaciones.izquierda:
                this.vx = this.velocidad * -1;
                break;
        }
    }

    actualizar() {

    }


}