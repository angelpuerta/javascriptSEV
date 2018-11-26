class Boss extends BaseEnemigo {

    constructor(x, y) {
        super(imagenes.boss_dukeofflies, x, y)
        this.estado = estados.moviendo;

        this.animacion = new Animacion(imagenes.boss_dukeofflies_animacion, this.ancho, this.alto, 16, 4);

        this.start_vx = 0.25;
        this.start_vy = 0.25;

        this.vida = 15;

        this.vy = this.start_vx;
        this.vx = this.start_vy;

        this.tiempoGenerarHijo = 0;
        this.cadenciaGenerarHijo = 200;
    }


    factualizar() {
        // Actualizar animación
        this.animacion.actualizar();

        if (!(gameLayer === undefined || gameLayer.jugador === undefined)) {
            this.vy = gameLayer.jugador.y < this.y ? -this.start_vy : this.start_vy;
            this.vx = gameLayer.jugador.x < this.x ? -this.start_vx : this.start_vx;
        }

        if (this.tiempoGenerarHijo < this.cadenciaGenerarHijo)
            this.tiempoGenerarHijo++;
        else
            this.generarHijo();

    }

    impactado(x) {
        if (x.stuneo > 0)
            this.tiempoStuneo = x.stuneo / 2;
        if (this.vida - x.daño > 0)
            this.vida = this.vida - x.daño;
        else {
            this.estado = estados.muerto;
        }
    }

    generarHijo() {
        this.tiempoGenerarHijo = 0;
        var hijo = new EnemigoVolador(this.x, this.y);
        this.ponerEnPantalla(hijo);
        gameLayer.enemigos.push(hijo);
    }


    ponerEnPantalla(hijo) {
        if (!(gameLayer === undefined || gameLayer.anchoMapa === undefined || gameLayer.altoMapa === undefined)) {
            var jugador = this;
            hijo.x = 480 * 0.3 * (Math.random() - 0.5) + jugador.x;
            hijo.y = 320 * 0.3 * (Math.random() - 0.5) + jugador.y;
        }

    }


}