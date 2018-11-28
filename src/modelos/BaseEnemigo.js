class BaseEnemigo extends Modelo {

    constructor(imagen, x, y) {
        super(imagen, x, y);
        this.estado = estados.moviendo;
        this.animacion = new Animacion(imagen,
            this.ancho, this.alto, 6, 1);
        this.vy = 0;
        this.vx = 0;
        this.vida = 1;

        this.tiempoStuneo = 0.0;

    }

    actualizar() {
        if (this.tiempoStuneo > 0) {
            this.tiempoStuneo--;
            this.vx = 0;
            this.vy = 0;
        }
        else
            this.factualizar();
        if (this.alcanzaJugador()) {
            this.vx = 0;
            this.vy = 0;
            this.tiempoStuneo++;
            this.animacion.actualizar();
        }

    }

    factualizar() {

    }

    isMuerto() {
        return this.estado = estados.muerto;
    }

    impactado(x) {
        if (x.stuneo > 0)
            this.tiempoStuneo = x.stuneo;
        if (this.vida - x.daño > 0)
            this.vida = this.vida - x.daño;
        else
            this.estado = estados.muerto;
    }

    alcanzaJugador() {
        return gameLayer.jugador.colisiona(this);
    }


    dibujar(scrollX, scrollY) {
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;

        this.animacion.dibujar(this.x - scrollX, this.y - scrollY);
    }

}