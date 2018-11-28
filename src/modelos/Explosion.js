class Explosion extends Modelo {

    constructor(x, y) {
        super(imagenes.icono_explosion, x, y)
        this.aExplotar= new Animacion(imagenes.explosion,this.ancho,this.alto,6,12,this.finAnimacionExplsion.bind(this));

        this.estado=estados.explotando;

    }

    actualizar (){
        // Actualizar animación
        if(this.estado!=estados.muriendo) {
            this.aExplotar.actualizar();
        }


    }
    finAnimacionExplsion(){
        this.estado=estados.muriendo;



    }


    dibujar (scrollX, scrollY){
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;

        this.aExplotar.dibujar(this.x - scrollX, this.y - scrollY);
    }
    colisiona (modelo){
        var colisiona = false;

        if ( modelo.x - modelo.ancho/2 <=  this.x + this.imagen.width/2
            && modelo.x + modelo.ancho/2 >= this.x - this.imagen.width/2
            && this.y + this.imagen.height/2 >= modelo.y - modelo.alto/2
            && this.y - this.imagen.height/2 <= modelo.y + modelo.alto/2 ){

            colisiona = true;

        }
        return colisiona;
    }




}