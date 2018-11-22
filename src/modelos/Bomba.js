class Bomba extends Modelo {

    constructor(rutaImagen, x, y,explota) {
        super(rutaImagen, x, y)
        this.aExplotar= new Animacion(imagenes.bomba_explota,this.ancho,this.alto,3,5,this.finAnimacionExplotar.bind(this));
        this.aParada=new Animacion(imagenes.bomba,this.ancho,this.alto,1,1);
        this.aExplotado=new Animacion(imagenes.explosion,this.ancho,this.alto,3,12);
        this.animacion=this.aParada;
        this.estado=estados.moviendo;
    }

    actualizar (){
        // Actualizar animación
        this.animacion.actualizar();

        switch (this.estado){
            case estados.explotando:
                this.animacion = this.aExplotar;
                break;
            case estados.muriendo:
                this.animacion = this.aExplotado;
                break;
        }

    }
    finAnimacionExplotar(){
        this.estado=estados.muriendo;
    }
    dibujar (scrollX, scrollY){
        scrollX = scrollX || 0;
        scrollY = scrollY || 0;

        this.animacion.dibujar(this.x - scrollX, this.y - scrollY);
    }




}