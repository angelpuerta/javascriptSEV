class GameLayer extends Layer {

    constructor() {
        super();
        this.jugador = new Jugador(50, 50);//Pa que no se queje
        this.pausa = true;
        this.iniciar();

    }

    iniciar() {
        reproducirMusica();

        if (this.jugador.vidas <= 0)
            this.jugador.vidas = 6;

        this.espacio = new Espacio();

        this.corazon_1 = new Fondo(imagenes.vida_llena, 480 * 0.1, 320 * 0.05);
        this.corazon_2 = new Fondo(imagenes.vida_llena, 480 * 0.125, 320 * 0.05);
        this.corazon_3 = new Fondo(imagenes.vida_llena, 480 * 0.15, 320 * 0.05);

        this.dañoIcono = new Fondo(imagenes.daño, 480 * 0.05, 320 * 0.2);
        this.velocidadIcono = new Fondo(imagenes.velocidad, 480 * 0.05, 320 * 0.30);
        this.cadenciaIcono = new Fondo(imagenes.cadencia, 480 * 0.05, 320 * 0.40);

        this.scrollX = 0;
        this.scrollY = 0;
        this.bombasJugador = 100;
        this.bloques = [];
        this.piedras = [];
        this.corazones = [];
        this.powerups = [];
        this.daño = 1;
        this.velocidad = this.jugador.v;
        this.cadencia = this.jugador.cadenciaDisparo;
        this.dañoTexto = new Texto(this.daño, 480 * 0.1, 320 * 0.22);
        this.velocidadTexto = new Texto(this.velocidad, 480 * 0.1, 320 * 0.32);
        this.cadenciaTexto = new Texto(this.cadencia, 480 * 0.1, 320 * 0.42);

        this.comoJugar = new Fondo(imagenes.mensaje_como_jugar, 480 * 0.5, 320 * 0.5);

        //       this.puntos = new Texto(0, 480 * 0.9, 320 * 0.07);


        this.fondo = new Fondo(imagenes.fondo_2, 480 * 0.5, 320 * 0.5);

        this.mensajeHasGanado = new Fondo(imagenes.mensaje_ganar, 480 * 0.5, 320 * 0.5);


        this.disparosJugador = [];
        this.disparosEnemigo = [];

        this.daño = 1;

        this.enemigos = [];

        this.bombas = [];

        this.explosiones = [];

        this.puertas = [];

        this.cargarMapa("res/" + nivelActual + ".txt");
    }

    guardarNivel() {

        niveles_explorados[nivelActual] = {
            "enemigos": this.enemigos,
            "bombas": this.bombas,
            "corazones": this.corazones,
            "power_ups": this.powerups
        }

    }

    cargarSiguienteNivel() {
        reproducirMusica();


        this.espacio = new Espacio();

        this.corazon_1 = new Fondo(imagenes.vida_llena, 480 * 0.1, 320 * 0.05);
        this.corazon_2 = new Fondo(imagenes.vida_llena, 480 * 0.125, 320 * 0.05);
        this.corazon_3 = new Fondo(imagenes.vida_llena, 480 * 0.15, 320 * 0.05);

        this.dañoIcono = new Fondo(imagenes.daño, 480 * 0.05, 320 * 0.2);
        this.velocidadIcono = new Fondo(imagenes.velocidad, 480 * 0.05, 320 * 0.30);
        this.cadenciaIcono = new Fondo(imagenes.cadencia, 480 * 0.05, 320 * 0.40);
        this.scrollX = 0;
        this.scrollY = 0;
        this.bombasJugador = 100;
        this.bloques = [];
        this.piedras = [];
        this.corazones = [];
        this.powerups = [];
        this.daño = 1;
        this.velocidad = this.jugador.v;
        this.cadencia = this.jugador.cadenciaDisparo;
        this.dañoTexto = new Texto(this.daño, 480 * 0.1, 320 * 0.22);
        this.velocidadTexto = new Texto(this.velocidad, 480 * 0.1, 320 * 0.32);
        this.cadenciaTexto = new Texto(this.cadencia, 480 * 0.1, 320 * 0.42);
        //     this.fondoPuntos = new Fondo(imagenes.icono_puntos, 480 * 0.85, 320 * 0.05);

        //       this.puntos = new Texto(0, 480 * 0.9, 320 * 0.07);


        this.fondo = new Fondo(imagenes.fondo_2, 480 * 0.5, 320 * 0.5);

        this.disparosJugador = [];
        this.disparosEnemigo = [];

        this.daño = 1;

        this.enemigos = [];

        this.bombas = [];

        this.explosiones = [];

        this.puertas = [];


        this.cargarMapa("res/" + nivelActual + ".txt", () => {

            if (niveles_explorados[nivelActual] !== undefined) {
                this.powerups = niveles_explorados[nivelActual]["power_ups"];
                this.enemigos = niveles_explorados[nivelActual]["enemigos"];
                this.corazones = niveles_explorados[nivelActual]["corazones"];
                this.bombas = niveles_explorados[nivelActual]["bombas"];
            }
        });

    }

    actualizar() {


        this.espacio.actualizar();
        this.fondo.vx = -1;
        this.fondo.actualizar();
        this.jugador.actualizar();
        this.enemigos.forEach(x => x.actualizar());
        this.disparosJugador.forEach(x => x.actualizar());
        this.disparosEnemigo.forEach(x => x.actualizar());
        this.cadenciaTexto.valor = this.jugador.cadenciaDisparo;
        this.velocidadTexto.valor = this.jugador.v;
        this.dañoTexto.valor = this.jugador.daño;

        for (var i = 0; i < this.disparosEnemigo.length; i++) {
            if (this.disparosEnemigo[i] != null && this.disparosEnemigo[i].colisiona(this.jugador)) {
                this.jugador.golpeado();


                this.disparosEnemigo.splice(i, 1);
            }
        }

        // Eliminar disparos sin velocidadIcono

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

            }
        }

        // colisiones Con Bomba
        for (var i = 0; i < this.bombas.length; i++) {
            if (this.jugador.colisiona(this.bombas[i]) && this.bombas[i].estado == estados.moviendo) {
                this.bombasJugador++;
                this.bombas.splice(i, 1);
            }
        }
        for (var i = 0; i < this.powerups.length; i++) {
            if (this.jugador.colisiona(this.powerups[i])) {


                if (this.powerups[i].tipo == 0) {

                    this.jugador.v = this.jugador.v * 1.5;
                    if (this.jugador.v > 6)
                        this.jugador.v = 6;

                }
                else if (this.powerups[i].tipo == 1) {
                    this.jugador.daño = this.jugador.daño * 2;
                }
                else if (this.powerups[i].tipo == 2) {
                    if (this.jugador.cadenciaDisparo - 7 > 0)
                        this.jugador.cadenciaDisparo = this.jugador.cadenciaDisparo - 7;
                }
                this.powerups.splice(i, 1);
            }
        }

        //colisiones con explosion
        for (var i = 0; i < this.explosiones.length; i++) {
            if (this.jugador.colisiona(this.explosiones[i])) {
                this.jugador.golpeado();


            }
            for (var j = 0; j < this.enemigos.length; j++) {
                if (this.explosiones[i].colisiona(this.enemigos[j])) {
                    this.enemigos[i].estado = estados.muerto;
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
                    reproducirEfecto(efectos.da);
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
            this.puertas.forEach(x => {
                x.open();
                this.espacio.eliminarCuerpoEstatico(x);
            });
        }

        this.calculaVida();

        for (var i = 0; i < this.puertas.length; i++) {
            if (this.puertas[i] != null && this.puertas[i].isOpen() && this.jugador.colisiona(this.puertas[i])) {
                this.guardarNivel();
                nivelActual = this.puertas[i].getNextLevel();
                this.iniciar();
            }
        }

        if (this.jugador.vidas <= 0) {
            this.iniciar();
            reproducirEfecto(efectos.muere);
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

        for (var i = 0; i < this.powerups.length; i++) {
            this.powerups[i].dibujar(this.scrollX, this.scrollY);
        }

        this.puertas.forEach(x => x.dibujar(this.scrollX, this.scrollY));

        for (var i = 0; i < this.corazones.length; i++) {
            this.corazones[i].dibujar(this.scrollX, this.scrollY);
        }


        this.corazon_1.dibujar();
        this.corazon_2.dibujar();
        this.corazon_3.dibujar();
        this.dañoIcono.dibujar();
        this.cadenciaIcono.dibujar();
        this.velocidadIcono.dibujar();
        this.dañoTexto.dibujar();
        this.cadenciaTexto.dibujar();
        this.velocidadTexto.dibujar();


        if (this.pausa)
            this.comoJugar.dibujar();

        if (this.hasganado()) {
            this.mensajeHasGanado.dibujar();
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

                var nuevaBomba = this.jugador.poneBomba();
                if (nuevaBomba != null) {
                    this.espacio.agregarCuerpoDinamico(nuevaBomba);
                    this.bombas.push(nuevaBomba);
                }
                this.bombasJugador--
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


    cargarMapa(ruta, callback) {
        var fichero = new XMLHttpRequest();
        fichero.open("GET", ruta, false);

        fichero.onreadystatechange = function () {
            var texto = fichero.responseText;
            var lineas = texto.split('\n');
            this.anchoMapa = (lineas[0].length - 1) * 40;
            this.altoMapa = (lineas.length - 1) * 32;
            this.ponerParedes(lineas);
            for (var i = 0; i < lineas.length; i++) {
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
        if (callback !== undefined)
            callback();

    }

    ponerParedes(lineas) {
        var bloque, x, y;


        for (var i = 1; i <= lineas[0].length + 1; i++) {
            x = -40 / 2 + i * 38;
            y = this.altoMapa + 32 * 3 / 2;
            this.agregarParedInvisible(new Bloque(imagenes.piedra1, x, y));
            this.agregarPared(new Bloque(imagenes.paredB, x, y - 2));
            y = -38 / 2;
            this.agregarParedInvisible(new Bloque(imagenes.piedra1, x, y));
            this.agregarPared(new Bloque(imagenes.pared, x, y + 4));

        }
        for (var i = 0; i < lineas.length; i++) {
            x = -35 / 2;
            y = 32 / 2 + i * 32;
            this.agregarParedInvisible(new Bloque(imagenes.piedra1, x, y));
            this.agregarPared(new Bloque(imagenes.paredI, x + 2, y));
            x = this.anchoMapa + 55;
            this.agregarParedInvisible(new Bloque(imagenes.piedra1, x, y));
            this.agregarPared(new Bloque(imagenes.paredD, x - 2, y));
        }
        x = -10;
        y = -10;
        this.agregarPared(new Bloque(imagenes.paredAI, x, y));
        x = this.anchoMapa + 50;
        y = -10;
        this.agregarPared(new Bloque(imagenes.paredAD, x, y));
        x = -10;
        y = this.altoMapa + 42;
        this.agregarPared(new Bloque(imagenes.paredBI, x, y));
        x = this.anchoMapa + 52;
        y = this.altoMapa + 42;
        this.agregarPared(new Bloque(imagenes.paredBD, x, y));
    }

    agregarParedInvisible(bloque) {
        this.espacio.agregarCuerpoEstatico(bloque);
        this.bloques.push(bloque);
    }

    agregarPared(pared) {
        this.espacio.agregarCuerpoDinamico(pared);
        this.bloques.push(pared);
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
                this.jugador.x = x;
                this.jugador.y = y;
                // modificación para empezar a contar desde el suelo
                this.jugador.y = this.jugador.y - this.jugador.alto / 2;
                this.espacio.agregarCuerpoDinamico(this.jugador);
                break;
            case "#":
                var r = Math.random() * 3;
                if (r > 2) var bloque = new Bloque(imagenes.piedra1, x, y);
                else if (r > 1) var bloque = new Bloque(imagenes.piedra2, x, y);
                else var bloque = new Bloque(imagenes.piedra3, x, y);
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
                break;
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
            case "ñ":
                var pudaño = new PowerUp(imagenes.pudaño, x, y, 1);
                pudaño.y = pudaño.y - pudaño.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.powerups.push(pudaño);
                this.espacio.agregarCuerpoDinamico(pudaño);
                break;
            case "v":
                var pudaño = new PowerUp(imagenes.puvelocidad, x, y, 0);
                pudaño.y = pudaño.y - pudaño.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.powerups.push(pudaño);
                this.espacio.agregarCuerpoDinamico(pudaño);
                break;
            case "n":
                var pudaño = new PowerUp(imagenes.pucadencia, x, y, 2);
                pudaño.y = pudaño.y - pudaño.alto / 2;
                // modificación para empezar a contar desde el suelo
                this.powerups.push(pudaño);
                this.espacio.agregarCuerpoDinamico(pudaño);
                break;

            default:
                if (!isNaN(parseInt(simbolo, 10))) {

                    var nextLevel = parseInt(simbolo, 10);
                    this.ponePuerta(x, y, nextLevel);

                }
                break;
        }


    }

    ponePuerta(x, y, nextLevel) {
        var puerta;
        if (y == this.altoMapa + 32) puerta = new Puerta(imagenes.puerta_abajo_cerrada, imagenes.puerta_abajo_abierta, x, y + 15, nextLevel);
        else if (y == 32) puerta = new Puerta(imagenes.puerta_arriba_cerrada, imagenes.puerta_arriba_abierta, x, y - 48, nextLevel);
        else if (x == this.anchoMapa - 20) puerta = new Puerta(imagenes.puerta_derecha_cerrada, imagenes.puerta_derecha_abierta, x + 75, y, nextLevel);
        else if (x == 20) puerta = new Puerta(imagenes.puerta_izquierda_cerrada, imagenes.puerta_izquierda_abierta, x - 35, y, nextLevel);

        else var puerta = new Puerta(imagenes.puerta_izquierda_cerrada, x, y, nextLevel);

        this.espacio.estaticos.filter(x => x.colisiona(puerta)).forEach(x => this.espacio.eliminarCuerpoEstatico(x));

        this.puertas.push(puerta);
        this.espacio.agregarCuerpoEstatico(puerta);


    }

    hasganado() {
        return nivelActual === ultimoNivel && this.enemigos.length === 0;
    }


}