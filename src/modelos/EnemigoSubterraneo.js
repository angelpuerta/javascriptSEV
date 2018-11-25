class EnemigoSubterraneo extends BaseEnemigo {

    constructor(x, y) {
        super(imagenes.enemigo_subterraneo, x, y)
        this.estado = estados.enterrandose;

        this.aMover = new Animacion(imagenes.enemigo_subterraneo_animacion,
            this.ancho, this.alto, 6, 2);

        this.aEnterrarse = new Animacion(imagenes.enemigo_subterraneo_esconderse,
            this.ancho, this.alto, 4, 4);

        // Ref a la animación actual
        this.animacion = this.aMover;

        this.vida = 1;


        this.tiempoDuracion = 60;
        this.cadenciaEnterrando = 16;
        this.cadenciaDescubierto = 60;
        this.tiempoEnterrarse = 100;

    }

    actualizar() {

        this.animacion.actualizar();

        if (this.estado === estados.enterrado) {
            this.actualizar_cubrirse();
        }
        else if (this.estado === estados.enterrandose) {
            this.actualizar_enterrandose();
        }
        else {
            this.actualizar_disparar();
        }
        this.tiempoEnterrarse++;
    }

    actualizar_cubrirse() {
        if (this.tiempoEnterrarse > this.tiempoDuracion) {
            this.ponerEnPantalla();
            this.estado = estados.disparando;
            this.animacion = this.aMover;
            this.tiempoEnterrarse = 0;
        }
    }

    actualizar_enterrandose() {
        if (this.tiempoEnterrarse > this.cadenciaEnterrando) {
            this.estado = estados.enterrado;
            this.ponerFueraDePantalla();
            this.animacion = this.aEnterrarse;
            this.tiempoEnterrarse = 0;

        }

    }

    actualizar_disparar() {
        if (this.tiempoEnterrarse > this.cadenciaDescubierto) {
            if (!(gameLayer === undefined || gameLayer.jugador === undefined)) {
                this.disparar(gameLayer.jugador);
            }
            this.estado = estados.enterrandose;
            this.tiempoEnterrarse = 0;
            this.animacion = this.aEnterrarse;
        }
    }


    disparar(jugador) {
        if (this.jugadorCercano(jugador)) {
            var disparo = new DisparoEnemigo(this.x, this.y, jugador);
            gameLayer.espacio.agregarCuerpoDinamico(disparo);
            gameLayer.disparosEnemigo.push(disparo);
        } else {
            return null;
        }
    }

    jugadorCercano(jugador) {
        return (Math.abs(jugador.x - this.x) < 480 * 0.6 && Math.abs(jugador.y - this.y) < 320 * 0.6);
    }

    ponerFueraDePantalla() {
        this.x = -2000;
        this.y = -2000;
    }

    ponerEnPantalla() {
        if (!(gameLayer === undefined || gameLayer.anchoMapa === undefined || gameLayer.altoMapa === undefined)) {
            var jugador = gameLayer.jugador;
            this.x = 480 * (Math.random() - 0.5) + jugador.x;
            this.y = 320 * (Math.random() - 0.5) + jugador.y;
            while (this.x < 32 || this.y < 40 ||
            this.x > gameLayer.anchoMapa || this.y > gameLayer.altoMapa ||
            gameLayer.espacio.estaticos.some(x => x.colisiona(this)) ||
            gameLayer.espacio.dinamicos.some(x => x!==this && x.colisiona(this))) {
                this.x = 480 * (Math.random() - 0.5) + jugador.x;
                this.y = 320 * (Math.random() - 0.5) + jugador.y;
            }
        }
    }


    dibujar(scrollX, scrollY) {
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;

        this.animacion.dibujar(this.x - scrollX, this.y - scrollY);
    }

}