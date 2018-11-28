class AtaqueCuerpo extends DisparoBase {

    constructor(x, y, orientacion,daño) {
        super(imagenes.ataque_cuerpo, x, y, orientacion);
        this.animacion = new Animacion(imagenes.ataque_cuerpo_animacion,
            this.ancho, this.alto, 2, 5);
        this.daño = 2*daño;
        this.velocidad = 5;
        this.orientar(orientacion);
        this.tiempoParar = 10;
    }


    actualizar() {
        if (this.tiempoParar > 0)
            this.tiempoParar--;
        else {
            this.vy = 0;
            this.vx = 0;
        }

        this.animacion.actualizar();
    }

    dibujar(scrollX, scrollY) {
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;

        this.animacion.dibujar(this.x - scrollX, this.y - scrollY);

    }


}