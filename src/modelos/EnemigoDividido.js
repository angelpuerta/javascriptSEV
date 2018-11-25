class EnemigoDividido extends BaseEnemigo {

    constructor(x, y) {
        super(imagenes.enemigo_dividido, x, y);
        this.estado = estados.invencible;
        this.orientacion = orientaciones.derecha;
        this.vxInteligencia = -1;
        this.vx = this.vInteligencia;

        this.animacion = new Animacion(imagenes.enemigo_dividido_animacion,
            this.ancho, this.alto, 8, 3);


        this.start_vx = 2;
        this.start_vy = 2;

        this.vida = 1;

        this.vy = this.start_vx;
        this.vx = this.start_vy;

        this.tiempo = 0;
        this.tiempo_Invencible = 15;

    }


    actualizar() {
        // Actualizar animación
        this.animacion.actualizar();

        if (!(gameLayer === undefined || gameLayer.jugador === undefined)) {
            this.vy = gameLayer.jugador.y < this.y ? -this.start_vy : this.start_vy;
            this.vx = gameLayer.jugador.x < this.x ? -this.start_vx : this.start_vx;
        }

        if (this.tiempo < this.tiempo_Invencible)
            this.tiempo++;
        else
            this.estado = estados.moviendo;

    }

    impactado() {
        if (!(this.estado === estados.invencible)) {
            if (this.vida > 0)
                this.vida--;
            else
                this.estado = estados.muerto;
        }
    }


}