class Jugador extends Modelo {

    constructor(x, y) {
        super(imagenes.jugador, x, y)
        this.vidas = 3;
        this.tiempoInvulnerable = 0;

        this.estado = estados.moviendo;
        this.orientacion = orientaciones.abajo;
        this.vx = 0; // velocidadX
        this.vy = 0; // velocidadY

        // Animaciones
        this.aDispararDerecha = new Animacion(imagenes.jugador_idle_derecha,
            this.ancho, this.alto, 6, 1, this.finAnimacionDisparar.bind(this));
        this.aDispararIzquierda = new Animacion(imagenes.jugador_idle_izquierda,
            this.ancho, this.alto, 6, 1, this.finAnimacionDisparar.bind(this));
        this.aDispararAbajo= new Animacion(imagenes.jugador_idle_abajo,
            this.ancho, this.alto, 6, 1, this.finAnimacionDisparar.bind(this));
        this.aDispararArriba = new Animacion(imagenes.jugador_idle_arriba,
            this.ancho, this.alto, 6, 1, this.finAnimacionDisparar.bind(this));

        this.aIdleDerecha = new Animacion(imagenes.jugador_idle_derecha,
            this.ancho, this.alto, 6, 1);
        this.aIdleIzquierda = new Animacion(imagenes.jugador_idle_izquierda,
            this.ancho, this.alto, 6, 1);
        this.aIdleArriba = new Animacion(imagenes.jugador_idle_arriba,
            this.ancho, this.alto, 6, 1);
        this.aIdleAbajo = new Animacion(imagenes.jugador_idle_abajo,
            this.ancho, this.alto, 6, 1);
        this.aCorriendoDerecha =
            new Animacion(imagenes.jugador_corriendo_derecha,
                this.ancho, this.alto, 8, 10,null);
        this.aCorriendoIzquierda = new Animacion(imagenes.jugador_corriendo_izquierda,
            this.ancho, this.alto, 8, 10, null);
        this.aCorriendoArriba = new Animacion(imagenes.jugador_corriendo_arriba,
            this.ancho, this.alto, 8, 10, null);
        this.aCorriendoAbajo = new Animacion(imagenes.jugador_corriendo_abajo,
            this.ancho, this.alto, 8, 10, null);


        this.animacion = this.aIdleDerecha;

        // Disparo
        this.cadenciaDisparo = 15;
        this.tiempoDisparo = this.cadenciaDisparo;
    }


    disparar() {
        if (this.tiempoDisparo == 0) {
            // reiniciar Cadencia
            this.estado = estados.disparando;
            this.tiempoDisparo = this.cadenciaDisparo;

            reproducirEfecto(efectos.disparo);

            var disparo = new DisparoJugador(this.x, this.y, this.orientacion);
            return disparo;
        } else {
            return null;
        }
    }

    finAnimacionDisparar() {
        this.estado = estados.moviendo;
    }

    golpeado() {
        if (this.tiempoInvulnerable <= 0) {
            if (this.vidas > 0) {
                this.vidas--;
                this.tiempoInvulnerable = 100;
                // 100 actualizaciones de loop
            }
        }
    }

    actualizar() {

        if (this.tiempoInvulnerable > 0) {
            this.tiempoInvulnerable--;
        }

        this.animacion.actualizar();


        // Establecer orientación
        if (this.vx > 0) {
            this.cambiarOrientacion(orientaciones.derecha);
        }
        if (this.vx < 0) {
            this.cambiarOrientacion(orientaciones.izquierda);
        }
        if (this.vy > 0) {
            this.cambiarOrientacion(orientaciones.abajo);
        }
        if (this.vy < 0) {
            this.cambiarOrientacion(orientaciones.arriba);
        }

        // Selección de animación
        switch (this.estado) {
            case estados.disparando:
                if (this.orientacion == orientaciones.derecha) {
                    this.animacion = this.aDispararDerecha;
                }
                if (this.orientacion == orientaciones.izquierda) {
                    this.animacion = this.aDispararIzquierda;
                }
                if (this.orientacion == orientaciones.arriba) {
                    this.animacion = this.aDispararArriba;
                }
                if (this.orientacion == orientaciones.abajo) {
                    this.animacion = this.aDispararAbajo;
                }
                break;
            case estados.moviendo:
                if (this.vx != 0) {
                    if (this.orientacion == orientaciones.derecha) {
                        this.animacion = this.aCorriendoDerecha;
                    }
                    if (this.orientacion == orientaciones.izquierda) {
                        this.animacion = this.aCorriendoIzquierda;
                    }
                }
                if (this.vx == 0) {
                    if (this.orientacion == orientaciones.derecha) {
                        this.animacion = this.aIdleDerecha;
                    }
                    if (this.orientacion == orientaciones.izquierda) {
                        this.animacion = this.aIdleIzquierda;
                    }
                }
                if (this.vy != 0) {
                    if (this.orientacion == orientaciones.arriba) {
                        this.animacion = this.aCorriendoArriba;
                    }
                    if (this.orientacion == orientaciones.abajo) {
                        this.animacion = this.aCorriendoAbajo;
                    }
                }
                if (this.vy == 0) {
                    if (this.orientacion == orientaciones.arriba) {
                        this.animacion = this.aIdleArriba
                    }
                    if (this.orientacion == orientaciones.abajo) {
                        this.animacion = this.aIdleAbajo;
                    }
                }
                break;
        }


        // Tiempo Disparo
        if (this.tiempoDisparo > 0) {
            this.tiempoDisparo--;
        }
    }

    dibujar(scrollX) {
        scrollX = scrollX || 0;
        if (this.tiempoInvulnerable > 0) {
            contexto.globalAlpha = 0.5;
            this.animacion.dibujar(this.x - scrollX, this.y);
            contexto.globalAlpha = 1;
        } else {
            this.animacion.dibujar(this.x - scrollX, this.y);
        }
    }

    moverX(direccion) {
        this.vx = direccion * 3;
    }

    moverY(direccion) {
        this.vy = direccion * 3;
    }

    cambiarOrientacion(orientacion) {
        this.orientacion = orientacion;
    }

}