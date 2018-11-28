class DisparoParalizante extends DisparoBase {

    constructor(x, y, orientacion,daño) {
        super(imagenes.disparo_paralizante, x, y, orientacion);
        this.daño = 0*daño;
        this.stuneo = 60;
    }

}