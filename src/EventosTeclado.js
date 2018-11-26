var teclas = [];

window.addEventListener('keydown', onKeyDown, false);
window.addEventListener('keyup', onKeyUp, false);

function onKeyDown(event) {
    entrada = entradas.teclado;
    // agregar la tecla pulsada si no estaba
    var posicion = teclas.indexOf(event.keyCode);
    if (posicion == -1) {
        teclas.push(event.keyCode);
        switch (event.keyCode) {
            case 32:
                controles.bomba = true;
                break;
            case 27:
                controles.pausar = true;
                break;
            case TECLAS.ATAQUE_ARRIBA:
                controles.disparo = orientaciones.arriba;
                break;
            case TECLAS.ATAQUE_ABAJO:
                controles.disparo = orientaciones.abajo;
                break;
            case TECLAS.ATAQUE_DERECHA:
                controles.disparo = orientaciones.derecha;
                break;
            case TECLAS.ATAQUE_IZQUIERDA:
                controles.disparo = orientaciones.izquierda;
                break;
            case TECLAS.ABAJO:
                controles.moverY = 1;
                break;
            case TECLAS.ARRIBA:
                controles.moverY = -1;
                break;
            case TECLAS.DERECHA:
                controles.moverX = 1;
                break;
            case TECLAS.IZQUIERDA:
                controles.moverX = -1;
                break;
            case TECLAS.ATAQUE_DISTANCIA:
                controles.arma = arma.distancia;
                break;
            case TECLAS.ATAQUE_PARALIZANTE:
                controles.arma = arma.paralizante;
                break;
            case TECLAS.ATAQUE_CUERPO:
                controles.arma = arma.cuerpo;
                break;
        }
    }
}

function onKeyUp(event) {
    // sacar la tecla pulsada
    var posicion = teclas.indexOf(event.keyCode);
    teclas.splice(posicion, 1);
    console.log("Tecla levantada");

    switch (event.keyCode) {
        case 32:
            controles.continuar = false;
            break;
        case 27:
            controles.pausar = false;
            break;
        case TECLAS.ABAJO:
            if (controles.moverY == 1) {
                controles.moverY = 0;
            }
            break;
        case TECLAS.ARRIBA:
            if (controles.moverY == -1) {
                controles.moverY = 0;
            }
            break;
        case TECLAS.DERECHA:
            if (controles.moverX == 1) {
                controles.moverX = 0;
            }
            break;
        case TECLAS.IZQUIERDA:
            if (controles.moverX == -1) {
                controles.moverX = 0;
            }
            break;
        case TECLAS.ATAQUE_ARRIBA:
        case TECLAS.ATAQUE_ABAJO:
        case TECLAS.ATAQUE_DERECHA:
        case TECLAS.ATAQUE_IZQUIERDA:
            controles.disparo = 0;
            break;
        case TECLAS.ATAQUE_DISTANCIA:
        case TECLAS.ATAQUE_PARALIZANTE:
        case TECLAS.ATAQUE_CUERPO:
            controles.arma = 0;
            break;

    }
}

