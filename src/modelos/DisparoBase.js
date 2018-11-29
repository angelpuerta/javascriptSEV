class DisparoBase extends Modelo {

    constructor(imagen, x, y, orientacion) {
        super(imagen, x, y);
        this.vx = 0;
        this.vy = 0;
        this.velocidad = 9;
        this.daño = 1;
        this.stuneo = 0;
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


    matarDisparo() {
        return (this.vx == 0 && this.vy == 0 || !this.estaEnPantalla() || this.choca);
    }
}