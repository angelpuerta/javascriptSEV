class EnemigoVolador extends BaseEnemigo {

    constructor(x, y) {
        super(imagenes.enemigo_vuela, x, y)
        this.estado = estados.moviendo;
        this.aMoverDrecha = new Animacion(imagenes.enemigo_vuela_derecha,
            this.ancho, this.alto, 7, 2);

        this.aMoverIzda = new Animacion(imagenes.enemigo_vuela_izquierda,
            this.ancho, this.alto, 7, 2);

        this.animacion = this.aMoverDrecha;

        this.start_vx = 2;
        this.start_vy = 2;

        this.vida = 1;

        this.vy = this.start_vx;
        this.vx = this.start_vy;
    }


    actualizar() {
        // Actualizar animación
        this.animacion.actualizar();

        if (!(gameLayer === undefined || gameLayer.jugador === undefined)) {
            this.vy = gameLayer.jugador.y < this.y ? -this.start_vy : this.start_vy;
            this.vx = gameLayer.jugador.x < this.x ? -this.start_vx : this.start_vx;
        }
        this.x = this.x + this.vx;
        this.y = this.y + this.vy;

        if (this.vx < 0) {
            this.animacion = this.aMoverIzda;
        }
        else
            this.animacion = this.aMoverDrecha;
    }


}