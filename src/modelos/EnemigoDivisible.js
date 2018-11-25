class EnemigoDivisible extends BaseEnemigo {

    constructor(x, y) {
        super(imagenes.enemigo_divisible, x, y)
        this.estado = estados.moviendo;

        this.aMoverDrecha = new Animacion(imagenes.enemigo_divisible_derecha,
            this.ancho, this.alto, 8, 4);

        this.aMoverIzda = new Animacion(imagenes.enemigo_divisible_izquierda,
            this.ancho, this.alto, 8, 4);

        this.animacion = this.aMoverDrecha;

        this.start_vx = 0.5;
        this.start_vy = 0.5;

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

        if (this.vx < 0) {
            this.animacion = this.aMoverIzda;
        }
        else
            this.animacion = this.aMoverDrecha;
    }

    impactado() {
        if (this.vida > 0)
            this.vida--;
        else {
            this.estado = estados.muerto;
            var enemigo_dividio = new EnemigoDividido(this.x, this.y);
            this.ponerEnPantalla(enemigo_dividio);
            gameLayer.enemigos.push(enemigo_dividio);
            gameLayer.espacio.dinamicos.push(enemigo_dividio);
        }
    }


    bisectriz(x, y, x_destino, y_destino) {
        var x_aux = x - x_destino;
        var y_aux = y - y_destino;

        var normal = Math.sqrt(Math.pow(x_aux, 2) + Math.pow(y_aux.y, 2));
        x_aux = x_aux / normal;
        y_aux = y_aux / normal;

        var x_resultado = x.destino;
        var y_resultado = -x_aux * x_resultado / y_aux;
        normal = Math.sqrt(Math.pow(x_aux, 2) + Math.pow(y_aux.y, 2));

    }

    ponerEnPantalla(hijo) {
        if (!(gameLayer === undefined || gameLayer.anchoMapa === undefined || gameLayer.altoMapa === undefined)) {
            var jugador = this;
            hijo.x = 480*0.2 * (Math.random() - 0.5) + jugador.x;
            hijo.y = 320*0.2 * (Math.random() - 0.5) + jugador.y;
            while (this.x < 32 || this.y < 40 ||
            this.x > gameLayer.anchoMapa || this.y > gameLayer.altoMapa ||
            gameLayer.espacio.estaticos.some(x => x.colisiona(this)) ||
            gameLayer.espacio.dinamicos.some(x => x!==this && x.colisiona(this))) {
                hijo.x = 480*0.2 * (Math.random() - 0.5) + jugador.x;
                hijo.y = 320*0.2 * (Math.random() - 0.5) + jugador.y;
            }
        }
    }


}