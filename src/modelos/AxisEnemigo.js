class AxisEnemigo extends BaseEnemigo {

    constructor(x, y, axis) {
        super(imagenes.enemigo_axis, x, y)
        this.estado = estados.moviendo;
        this.vInteligencia = 1;
        this.axis = axis;

        this.aMover = new Animacion(imagenes.enemigo_axis_animacion,
            this.ancho, this.alto, 6, 3);

        this.aCubrir = new Animacion(imagenes.enemigo_axis_cubriendose,
            this.ancho, this.alto, 6, 1);

        // Ref a la animación actual
        this.animacion = this.aMover;

        this.vida = 3;

        // Disparo
        this.cadenciaDisparo = 60;
        this.tiempoDisparo = 0;

        this.cadenciaCubrise = 120;
        this.tiempoCubrise = 0;
        this.tiempoDuracion = 60;

        if (this.axis == axis.X)
            this.vx = this.vInteligencia;
        else
            this.vy = this.vInteligencia;
    }

    actualizar() {
        this.animacion.actualizar();

        if (this.estado === estados.invencible) {
            this.actualizar_cubrirse();
        }
        else {
            this.actualizar_disparar();
            if (this.tiempoCubrise > this.cadenciaCubrise) {
                this.estado = estados.invencible;
                this.animacion = this.aCubrir;
                this.tiempoCubrise = 0;
            }
        }
        this.tiempoCubrise++;
    }

    actualizar_cubrirse() {
        if (this.tiempoCubrise > this.tiempoDuracion) {
            this.estado = estados.moviendo;
            this.tiempoCubrise = 0;
            this.animacion = this.aMover;
        }
    }

    actualizar_disparar() {


        if (this.tiempoDisparo > 0) {
            this.tiempoDisparo--;
        }
        if (!(gameLayer === undefined || gameLayer.jugador === undefined)) {
            this.disparar(gameLayer.jugador);
        }

        if (this.axis === axis.X) {
            if (this.vx === 0) {
                this.vInteligencia = this.vInteligencia * -1
                this.vx = this.vInteligencia;
            }
        }
        else if (this.axis === axis.Y) {
            if (this.vy === 0) {
                this.vInteligencia = this.vInteligencia * -1
                this.vy = this.vInteligencia;
            }
        }


    }


    disparar(jugador) {
        if (
            this.tiempoDisparo <= 0 && this.jugadorCercano(jugador)) {
            this.tiempoDisparo = this.cadenciaDisparo + Math.random() * this.cadenciaDisparo;
            var disparo = new DisparoEnemigo(this.x, this.y, jugador);
            gameLayer.espacio.agregarCuerpoDinamico(disparo);
            gameLayer.disparosEnemigo.push(disparo);
        } else {
            return null;
        }
    }


    impactado() {
        if (this.estado != estados.invencible) {
            if (this.vida > 0)
                this.vida--;
            else
                this.estado = estados.muerto;
        }
    }

    jugadorCercano(jugador) {
        return (Math.abs(jugador.x - this.x) < 480 * 0.6 && Math.abs(jugador.y - this.y) < 320 * 0.6);
    }


}