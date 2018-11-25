class GameLayer extends Layer {

    constructor() {
        super();
        this.mensaje = new Boton(imagenes.mensaje_como_jugar, 480 / 2, 320 / 2);
        this.pausa = true;
        this.iniciar();
    }

    iniciar() {
        reproducirMusica();

        this.botonSalto = new Boton(imagenes.boton_salto, 480 * 0.9, 320 * 0.55);
        this.botonDisparo = new Boton(imagenes.boton_disparo, 480 * 0.75, 320 * 0.83);
        this.pad = new Pad(480 * 0.14, 320 * 0.8);
        this.espacio = new Espacio();

        this.scrollX = 0;
        this.scrollY = 0;
        this.bombasJugador=10;
        this.bloques = [];
        //     this.fondoPuntos = new Fondo(imagenes.icono_puntos, 480 * 0.85, 320 * 0.05);

        //       this.puntos = new Texto(0, 480 * 0.9, 320 * 0.07);

        this.fondo = new Fondo(imagenes.fondo_2, 480 * 0.5, 320 * 0.5);

        this.disparosJugador = [];
        this.disparosEnemigo = [];

        this.enemigos = [];

        this.bombas = [];

        this.puertas = [];

        this.jugador = new Jugador(50, 50);//Pa que no se queje

        this.cargarMapa("res/" + nivelActual + ".txt");
    }

    actualizar() {
        if (this.pausa) {
            return;
        }


        this.espacio.actualizar();
        this.fondo.vx = -1;
        this.fondo.actualizar();
        this.jugador.actualizar();
        this.enemigos.forEach(x => x.actualizar());
        this.disparosJugador.forEach(x => x.actualizar());
        this.disparosEnemigo.forEach(x => x.actualizar());

        for (var i = 0; i < this.disparosEnemigo.length; i++) {
            if (this.disparosEnemigo[i] != null && this.disparosEnemigo[i].colisiona(this.jugador)) {
                this.jugador.golpeado();
                this.disparosEnemigo.splice(i, 1);
            }
        }

        // Eliminar disparos sin velocidad

        for (var i = 0; i < this.enemigos.length; i++) {
            this.enemigos[i].actualizar();
        }
        for (var i = 0; i < this.bombas.length; i++) {
            this.bombas[i].actualizar();
        }
        for (var i = 0; i < this.disparosJugador.length; i++) {
            this.limpiarDisparos(this.disparosJugador, i);
        }
        for (var i = 0; i < this.disparosEnemigo.length; i++) {
            this.limpiarDisparos(this.disparosEnemigo, i);
        }


        // colisiones
        for (var i = 0; i < this.enemigos.length; i++) {
            if (this.jugador.colisiona(this.enemigos[i])) {
                this.jugador.golpeado();
                if (this.jugador.vidas <= 0) {
                    this.iniciar();
                }
            }
        }

        // colisiones Con Bomba
        for (var i = 0; i < this.bombas.length; i++) {
            if (this.jugador.colisiona(this.bombas[i])) {
                this.bombasJugador++;
                this.bombas.splice(i,1);
            }
        }
        // colisiones , disparoJugador - Enemigo
        for (var i = 0; i < this.disparosJugador.length; i++) {
            for (var j = 0; j < this.enemigos.length; j++) {

                if (this.disparosJugador[i] != null &&
                    this.enemigos[j] != null &&
                    this.disparosJugador[i].colisiona(this.enemigos[j])) {

                    this.espacio
                        .eliminarCuerpoDinamico(this.disparosJugador[i]);
                    this.disparosJugador.splice(i, 1);
                    this.enemigos[j].impactado();
                }
            }
        }

        // Enemigos muertos fuera del juego
        for (var j = 0; j < this.enemigos.length; j++) {
            if (this.enemigos[j] != null &&
                this.enemigos[j].estado == estados.muerto) {

                this.espacio
                    .eliminarCuerpoDinamico(this.enemigos[j]);
                this.enemigos.splice(j, 1);

            }
        }

        if (this.isHabitacionSinEnemigos()) {
            this.puertas.forEach(x => x.open())
        }

        for (var j = 0; j < this.puertas.length; j++) {
            if (this.puertas[i] != null && this.puertas[i].isOpen() && this.jugador.colisiona(this.puertas[i])) {
                this.pausa = true;
                nivelActual = this.puertas[i].getNextLevel();
                this.iniciar();
            }
        }

    }


    isHabitacionSinEnemigos() {
        return this.enemigos.length == 0;
    }


    calcularScroll() {
        // limite izquierda
        //if (this.jugador.x > 480 * 0.3)
        if (this.jugador.x - this.scrollX < 480 * 0.3) {
            this.scrollX = this.jugador.x - 480 * 0.3;
        }
        // limite derecha
        //if (this.jugador.x < this.anchoMapa - 480 * 0.3)
        if (this.jugador.x - this.scrollX > 480 * 0.7) {
            this.scrollX = this.jugador.x - 480 * 0.7;
        }
        //arriba
        if (this.jugador.y - this.scrollY < 320 * 0.3) {
            this.scrollY = this.jugador.y - 320 * 0.3;
        }
        //abajo
        if (this.jugador.y - this.scrollY > 320 * 0.7) {
            this.scrollY = this.jugador.y - 320 * 0.7;
        }
    }

    dibujar() {
        this.calcularScroll();
        this.fondo.dibujar();

        for (var i = 0; i < this.bloques.length; i++) {
            this.bloques[i].dibujar(this.scrollX, this.scrollY);
        }
        for (var i = 0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].dibujar(this.scrollX, this.scrollY);
        }
        this.disparosEnemigo.forEach(x => x.dibujar(this.scrollX, this.scrollY));
        for (var i = 0; i < this.bombas.length; i++) {
            this.bombas[i].dibujar(this.scrollX, this.scrollY);
        }
        this.jugador.dibujar(this.scrollX, this.scrollY);
        for (var i = 0; i < this.enemigos.length; i++) {
            this.enemigos[i].dibujar(this.scrollX, this.scrollY);
        }

        this.puertas.forEach(x => x.dibujar(this.scrollX, this.scrollY));

        if (this.pausa) {
            this.mensaje.dibujar(this.scrollX, this.scrollY);
        }
    }

    calcularPulsaciones(pulsaciones) {
        // Suponemos botones no estan pulsados
        this.botonDisparo.pulsado = false;
        this.botonSalto.pulsado = false;
        // suponemos que el pad esta en el centro
        controles.moverX = 0;
        // Suponemos a false
        controles.continuar = false;

        for (var i = 0; i < pulsaciones.length; i++) {
            // Muy simple cualquier click en pantalla lo activa
            if (pulsaciones[i].tipo == tipoPulsacion.inicio) {
                controles.continuar = true;
            }

            if (this.pad.contienePunto(pulsaciones[i].x, pulsaciones[i].y)) {
                var orientacionX = this.pad.obtenerOrientacionX(pulsaciones[i].x);
                if (orientacionX > 20) { // de 0 a 20 no contabilizamos
                    controles.moverX = orientacionX;
                }
                if (orientacionX < -20) { // de -20 a 0 no contabilizamos
                    controles.moverX = orientacionX;
                }
            }

            if (this.botonDisparo.contienePunto(pulsaciones[i].x, pulsaciones[i].y)) {
                this.botonDisparo.pulsado = true;
                if (pulsaciones[i].tipo == tipoPulsacion.inicio) {
                    controles.disparo = true;
                }
            }

            if (this.botonSalto.contienePunto(pulsaciones[i].x, pulsaciones[i].y)) {
                this.botonSalto.pulsado = true;
                if (pulsaciones[i].tipo == tipoPulsacion.inicio) {
                    controles.moverY = 1;
                }
            }


        }

        // No pulsado - Boton Disparo
        if (!this.botonDisparo.pulsado) {
            controles.disparo = false;
        }

        // No pulsado - Boton Salto
        if (!this.botonSalto.pulsado) {
            controles.moverY = 0;
        }
    }


    procesarControles() {
        if (controles.continuar) {
            this.pausa = false;
        }
        if (controles.pausar) {
            this.pausa = true;
        }
        if(controles.bomba){
            var nuevaBomba=this.jugador.poneBomba();
            if(nuevaBomba!=null){
                this.espacio.agregarCuerpoDinamico(nuevaBomba);
                this.bombas.push(nuevaBomba);
            }
            controles.bomba=false;
        }
        // disparar
        if (controles.disparo) {
            this.jugador.cambiarOrientacion(controles.disparo);
            var nuevoDisparo = this.jugador.disparar();
            if (nuevoDisparo != null) {
                this.espacio.agregarCuerpoDinamico(nuevoDisparo);
                this.disparosJugador.push(nuevoDisparo);
            }
            controles.disparo = false;
        }

        //if(controles.)
        // Eje X
        if (controles.moverX > 0) {
            this.jugador.moverX(1);

        } else if (controles.moverX < 0) {
            this.jugador.moverX(-1);

        } else {
            this.jugador.moverX(0);
        }

        // Eje Y
        if (controles.moverY > 0) {
            this.jugador.moverY(1);

        } else if (controles.moverY < 0) {
            this.jugador.moverY(-1);
        } else {
            this.jugador.moverY(0);
        }

    }

    limpiarDisparos(tipo, i) {
        if (tipo[i] != null &&
            (tipo[i].vx == 0 && tipo[i].vy == 0 || !tipo[i].estaEnPantalla())) {

            this.espacio
                .eliminarCuerpoDinamico(tipo[i]);
            tipo.splice(i, 1);
        }
    }


    cargarMapa(ruta) {
        var fichero = new XMLHttpRequest();
        fichero.open("GET", ruta, false);

        fichero.onreadystatechange = function () {
            var texto = fichero.responseText;
            var lineas = texto.split('\n');
            this.anchoMapa = (lineas[0].length - 1) * 40;
            this.altoMapa = (lineas.length - 1) * 32;
            this.ponerParedes(lineas);
            for (var i = 1; i < lineas.length; i++) {
                var linea = lineas[i];
                for (var j = 0; j < linea.length; j++) {
                    var simbolo = linea[j];
                    var x = 40 / 2 + j * 40; // x central
                    var y = 32 + i * 32; // y de abajo
                    this.cargarObjetoMapa(simbolo, x, y);
                }
            }
            this.wavefront = new Wavefront(this.altoMapa, this.anchoMapa);
        }.bind(this);

        fichero.send(null);

    }

    ponerParedes(lineas) {
        var bloque, x, y;
        for (var i = 0; i < lineas[0].length + 1; i++) {
            x = -40 / 2 + i * 40;
            y = this.altoMapa + 32 * 3 / 2;
            this.agregarBloque(new Bloque(imagenes.pared, x, y));
            y = 32 / 2;
            this.agregarBloque(new Bloque(imagenes.pared, x, y));

        }
        for (var i = 0; i < lineas.length + 1; i++) {
            x = -40 / 2;
            y = 32 / 2 + i * 32;
            this.agregarBloque(new Bloque(imagenes.pared, x, y));
            x = this.anchoMapa + 40 * 3 / 2;
            this.agregarBloque(new Bloque(imagenes.pared, x, y));
        }
    }

    agregarBloque(bloque) {
        this.espacio.agregarCuerpoEstatico(bloque);
        this.bloques.push(bloque);
    }


    cargarObjetoMapa(simbolo, x, y) {
        var bloque = new Bloque(imagenes.suelo, x, y);
        bloque.y = bloque.y - bloque.alto / 2;
        // modificación para empezar a contar desde el suelo
        this.bloques.push(bloque);

        switch (simbolo) {
            case "E":
                var enemigo = new Enemigo(x, y);
                enemigo.y = enemigo.y - enemigo.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.enemigos.push(enemigo);
                this.espacio.agregarCuerpoDinamico(enemigo);
                break;
            case "J":
                this.jugador = new Jugador(x, y);
                // modificación para empezar a contar desde el suelo
                this.jugador.y = this.jugador.y - this.jugador.alto / 2;
                this.espacio.agregarCuerpoDinamico(this.jugador);
                break;
            case "#":
                var bloque = new Bloque(imagenes.bloque_tierra, x, y);
                bloque.y = bloque.y - bloque.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.bloques.push(bloque);
                this.espacio.agregarCuerpoEstatico(bloque);
                break;
            case "V":
                var enemigo = new EnemigoVolador(x, y);
                enemigo.y = enemigo.y - enemigo.alto / 2;
                this.enemigos.push(enemigo);
                break;
            case "X":
                var enemigo = new AxisEnemigo(x, y, "X");
                enemigo.y = enemigo.y - enemigo.alto / 2;
                this.enemigos.push(enemigo);
                this.espacio.agregarCuerpoDinamico(enemigo);
                break;
            case "Y":
                var enemigo = new AxisEnemigo(x, y, "Y");
                enemigo.y = enemigo.y - enemigo.alto / 2;
                this.enemigos.push(enemigo);
                this.espacio.agregarCuerpoDinamico(enemigo);
                break;
            case "S":
                var enemigo = new EnemigoSubterraneo(x, y);
                enemigo.y = enemigo.y - enemigo.alto / 2;
                this.enemigos.push(enemigo);
                this.espacio.agregarCuerpoDinamico(enemigo);
                break;
            case "D":
                var enemigo = new EnemigoDivisible(x, y);
                enemigo.y = enemigo.y - enemigo.alto / 2;
                this.enemigos.push(enemigo);
                this.espacio.agregarCuerpoDinamico(enemigo);
            case "B":
                var bomba = new Bomba(imagenes.bomba, x, y);
                bomba.y = bomba.y - bomba.alto/2;
                // modificación para empezar a contar desde el suelo
                this.bombas.push(bomba);
                this.espacio.agregarCuerpoDinamico(bomba);
                break;
            default:
                if (!isNaN(parseInt(simbolo, 10))) {
                    var nextLevel = parseInt(simbolo, 10);
                    var puerta = new Puerta(x, y, nextLevel);
                    this.puertas.push(puerta);
                    this.espacio.agregarCuerpoEstatico(puerta)
                }
                break;
        }

    }

}