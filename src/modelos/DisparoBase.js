class DisparoBase extends Modelo {

    constructor(imagen, x, y, orientacion, daño) {
        super(imagen, x, y);
        this.vx = 0;
        this.vy = 0;
        this.velocidad = 9;
        var daño = daño || 0;
        if (daño === 0)
            this.daño = 1 ;
        else
            this.daño = 1* daño;
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