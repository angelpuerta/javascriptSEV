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

        this.corazon_1 = new Fondo(imagenes.vida_llena, 480 * 0.1, 320 * 0.05);
        this.corazon_2 = new Fondo(imagenes.vida_llena, 480 * 0.125, 320 * 0.05);
        this.corazon_3 = new Fondo(imagenes.vida_llena, 480 * 0.15, 320 * 0.05);

        this.scrollX = 0;
        this.scrollY = 0;
        this.bombasJugador = 1;
        this.bloques = [];
        this.piedras = [];
        this.corazones = [];
        //     this.fondoPuntos = new Fondo(imagenes.icono_puntos, 480 * 0.85, 320 * 0.05);

        //       this.puntos = new Texto(0, 480 * 0.9, 320 * 0.07);


        this.fondo = new Fondo(imagenes.fondo_2, 480 * 0.5, 320 * 0.5);

        this.disparosJugador = [];
        this.disparosEnemigo = [];

        this.enemigos = [];

        this.bombas = [];

        this.explosiones = [];

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
            if (this.bombas[i].estado == estados.muriendo) {
                var explosion = this.bombas[i].explota();
                this.explosiones.push(explosion);
                this.espacio.agregarCuerpoDinamico(explosion);
                this.bombas.splice(i, 1);

            }
            else {
                this.bombas[i].actualizar();
            }

        }
        for (var i = 0; i < this.explosiones.length; i++) {
            this.explosiones[i].actualizar();
            if (this.explosiones[i].estado == estados.muriendo) {
                this.espacio.eliminarCuerpoDinamico(this.explosiones[i]);
                this.explosiones.splice(i, 1);

            }
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
            if (this.jugador.colisiona(this.bombas[i]) && this.bombas[i].estado == estados.moviendo) {
                this.bombasJugador++;
                this.bombas.splice(i, 1);
            }
        }

        //colisiones con explosion
        for (var i = 0; i < this.explosiones.length; i++) {
            if (this.jugador.colisiona(this.explosiones[i])) {
                this.jugador.golpeado();

            }
            for (var j = 0; j < this.enemigos.length; j++) {
                if (this.explosiones[i].colisiona(this.enemigos[j])) {
                    this.enemigos[i].impactado();
                }
            }
            for (var j = 0; j < this.piedras.length; j++) {
                if (this.explosiones[i].colisiona(this.piedras[j])) {
                    this.espacio.eliminarCuerpoEstatico(this.piedras[j]);
                    this.piedras.splice(j, 1);
                }
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
                    this.enemigos[j].impactado(this.disparosJugador[i]);
                    this.disparosJugador.splice(i, 1);
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
        // colisiones , jugador - corazon
        // colisiones Con Bomba
        for (var i = 0; i < this.corazones.length; i++) {
            if (this.jugador.colisiona(this.corazones[i])) {
                if (this.jugador.vidas < 6) {
                    this.jugador.vidas = this.jugador.vidas + 2;
                    this.corazones.splice(i, 1);
                }
                if (this.jugador.vidas >= 6) {
                    this.jugador.vidas = 6;
                    this.corazones[i].x = this.corazones[i].x + this.jugador.vx;
                    this.corazones[i].y = this.corazones[i].y + this.jugador.vy;
                }
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
        this.calculaVida();

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

    calculaVida() {
        var vida = this.jugador.vidas
        if (vida >= 2) {
            this.corazon_1.imagen.src = imagenes.vida_llena;
            if (vida == 3) {
                this.corazon_2.imagen.src = imagenes.vida_media;
                this.corazon_3.imagen.src = imagenes.vida_vacia;
            }
            else if (vida >= 4) {
                this.corazon_2.imagen.src = imagenes.vida_llena;
                if (vida == 4) this.corazon_3.imagen.src = imagenes.vida_vacia;
                if (vida == 5) this.corazon_3.imagen.src = imagenes.vida_media;
                if (vida == 6) this.corazon_3.imagen.src = imagenes.vida_llena;

            }
            else {
                this.corazon_3.imagen.src = imagenes.vida_vacia;
                this.corazon_2.imagen.src = imagenes.vida_vacia;
            }
        }
        else if (vida == 1) {
            this.corazon_1.imagen.src = imagenes.vida_media;
            this.corazon_3.imagen.src = imagenes.vida_vacia;
            this.corazon_2.imagen.src = imagenes.vida_vacia;
        }
        else {
            this.corazon_1.imagen.src = imagenes.vida_vacia;
            this.corazon_3.imagen.src = imagenes.vida_vacia;
            this.corazon_2.imagen.src = imagenes.vida_vacia;
        }
    }

    dibujar() {
        this.calcularScroll();
        this.fondo.dibujar();

        this.corazon_1.dibujar();
        this.corazon_2.dibujar();
        this.corazon_3.dibujar();

        for (var i = 0; i < this.bloques.length; i++) {
            this.bloques[i].dibujar(this.scrollX, this.scrollY);
        }
        for (var i = 0; i < this.piedras.length; i++) {
            this.piedras[i].dibujar(this.scrollX, this.scrollY);
        }

        for (var i = 0; i < this.disparosJugador.length; i++) {
            this.disparosJugador[i].dibujar(this.scrollX, this.scrollY);
        }
        this.disparosEnemigo.forEach(x => x.dibujar(this.scrollX, this.scrollY));

        for (var i = 0; i < this.bombas.length; i++) {
            this.bombas[i].dibujar(this.scrollX, this.scrollY);
        }
        for (var i = 0; i < this.explosiones.length; i++) {
            this.explosiones[i].dibujar(this.scrollX, this.scrollY);
        }
        this.jugador.dibujar(this.scrollX, this.scrollY);
        for (var i = 0; i < this.enemigos.length; i++) {
            this.enemigos[i].dibujar(this.scrollX, this.scrollY);
        }
        for (var i = 0; i < this.explosiones.length; i++) {
            this.explosiones[i].actualizar();
        }

        this.corazon_1.dibujar();
        this.corazon_2.dibujar();
        this.corazon_3.dibujar();
        this.puertas.forEach(x => x.dibujar(this.scrollX, this.scrollY));

        for (var i = 0; i < this.corazones.length; i++) {
            this.corazones[i].dibujar(this.scrollX, this.scrollY);
        }

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
                if (orientacionX > 20) { // de 0 a 20 no contabilizamosdw
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
        if (controles.bomba) {
            if (this.bombasJugador > 0) {
                this.bombasJugador--
                var nuevaBomba = this.jugador.poneBomba();
                if (nuevaBomba != null) {
                    this.espacio.agregarCuerpoDinamico(nuevaBomba);
                    this.bombas.push(nuevaBomba);
                }
                controles.bomba = false;
            }
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

        if (controles.arma !== 0) {
            this.jugador.cambiarArma(controles.arma);
        }

    }

    limpiarDisparos(tipo, i) {
        if (tipo[i] != null &&
            tipo[i].matarDisparo()) {

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
                this.piedras.push(bloque);
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
                bomba.y = bomba.y - bomba.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.bombas.push(bomba);
                this.espacio.agregarCuerpoDinamico(bomba);
                break;
            case "b":
                var enemigo = new Boss(x, y);
                enemigo.y = enemigo.y - enemigo.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.enemigos.push(enemigo);
                this.espacio.agregarCuerpoDinamico(enemigo);
                break;

            case "c":
                var corazon = new Modelo(imagenes.corazon, x, y);
                corazon.y = corazon.y - corazon.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.corazones.push(corazon);
                this.espacio.agregarCuerpoDinamico(corazon);
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