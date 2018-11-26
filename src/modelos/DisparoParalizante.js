class DisparoParalizante extends DisparoBase {

    constructor(x, y, orientacion) {
        super(imagenes.disparo_paralizante, x, y, orientacion);
        this.daño = 0;
        this.stuneo = 60;
    }

}