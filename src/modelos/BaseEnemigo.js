class BaseEnemigo extends Modelo {

    constructor(imagen,x, y) {
        super(imagen,x, y);
        this.estado = estados.moviendo;
        this.animacion = new Animacion(imagen,
            this.ancho, this.alto, 6, 1);
        this.vy = 0;
        this.vx = 0;
        this.vida = 1;
    }

    actualizar(){

    }

    isMuerto(){
        return this.estado = estados.muerto;
    }

    impactado() {
        if (this.vida > 0)
            this.vida--;
        else
            this.estado = estados.muerto;
    }


    dibujar (scrollX, scrollY){
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;

        this.animacion.dibujar(this.x - scrollX, this.y - scrollY);
    }

}