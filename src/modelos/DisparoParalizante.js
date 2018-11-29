class DisparoParalizante extends DisparoBase {

    constructor(x, y, orientacion,danio) {
        super(imagenes.disparo_paralizante, x, y, orientacion,danio);
        this.daño = 0*danio;
        this.stuneo = 60;
    }

}