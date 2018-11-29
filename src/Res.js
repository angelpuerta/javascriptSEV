// Precargado de recursos

// CUIDADO CON EL disparo_jugador
var imagenes = {
    jugador: "res/jugador.png",
    fondo: "res/fondo.png",
    enemigo: "res/enemigo.png",
    enemigo_movimiento: "res/enemigo_movimiento.png",
    disparo_jugador: "res/disparo_jugador.png",


    disparo_enemigo: "res/disparo_enemigo.png",
    icono_puntos: "res/icono_puntos.png",
    fondo_2: "res/fondo_3.png",
    jugador_idle_derecha: "res/iddle-caminando-derecha.png",
    jugador_idle_izquierda: "res/iddle-caminando-izquierda.png",
    jugador_idle_arriba: "res/iddle-camina-atras.png",
    jugador_idle_abajo: "res/iddle-camina-alante.png",
    jugador_corriendo_derecha: "res/caminando-derecha.png",
    jugador_corriendo_izquierda: "res/caminando-izquierda.png",
    jugador_corriendo_arriba: "res/camina-atras.png",
    jugador_corriendo_abajo: "res/camina-alante.png",
    suelo: "res/suelo.png",
    enemigo_morir: "res/enemigo_morir.png",
    piedra1: "res/piedra1.png",
    piedra2: "res/piedra2.png",
    piedra3: "res/piedra3.png",
    pared: "res/pared.png",
    paredB: "res/paredB.png",
    paredI: "res/paredI.png",
    paredD: "res/paredD.png",
    paredAD: "res/parebad.png",
    paredBD: "res/paredebd.png",
    paredAI: "res/paredeai.png",
    paredBI: "res/paredbi.png",
    bloque_tierra: "res/pared.png",

    copa: "res/copa.png",


    menu_fondo: "res/menu_fondo.png",
    boton_jugar: "res/boton_jugar.png",
    mensaje_como_jugar: "res/mensaje_como_jugar.png",
    mensaje_ganar: "res/mensaje_ganar.png",
    mensaje_perder: "res/mensaje_perder.png",

    puerta_arriba_abierta: "res/puerta_arriba_cerrada.png",
    puerta_arriba_cerrada: "res/puerta_arriba.png",

    puerta_abajo_abierta: "res/puerta_abajo_cerrada.png",
    puerta_abajo_cerrada: "res/puerta_abajo.png",

    puerta_derecha_abierta: "res/puerta_derecha_cerrada.png",
    puerta_derecha_cerrada: "res/puerta_derecha.png",

    puerta_izquierda_abierta: "res/puerta_izquierda_cerrada.png",
    puerta_izquierda_cerrada: "res/puerta_izquierda.png",

    enemigo_vuela_izquierda: "res/enemigos/persiguevuela_izquierda.png",
    enemigo_vuela_derecha: "res/enemigos/persiguevuela_derecha.png",
    enemigo_vuela: "res/enemigos/enemigo_vuela.png",
    enemigo_axis: "res/enemigos/enemigo_axis.png",
    enemigo_axis_animacion: "res/enemigos/enemigo_axis_frente.png",
    enemigo_axis_cubriendose: "res/enemigos/enemigo_axis_cubriendose.png",
    enemigo_subterraneo: "res/enemigos/enemigo_subterraneo.png",
    enemigo_subterraneo_animacion: "res/enemigos/enemigo_subterraneo_animacion.png",
    enemigo_subterraneo_esconderse: "res/enemigos/enemigo_subterraneo_esconderse.png",
    enemigo_divisible: "res/enemigos/enemigo_divisible.png",
    enemigo_divisible_derecha: "res/enemigos/enemigo_divisible_derecha.png",
    enemigo_divisible_izquierda: "res/enemigos/enemigo_divisible_izquieda.png",
    enemigo_dividido: "res/enemigos/enemigo_dividido.png",
    enemigo_dividido_animacion: "res/enemigos/enemigo_dividido_animacion.png",
    bomba: "res/bomba.png",
    bomba_explota: "res/bombaexplota.png",
    explosion: "res/explosion.png",
    icono_explosion: "res/icono_explosion.png",
    vida_llena: "res/vida_llena.png",
    vida_media: "res/vida_media.png",
    vida_vacia: "res/vida_vacia.png",

    pudaño: "res/pudaño.png",
    pucadencia: "res/pucadencia.png",
    puvelocidad: "res/puvelocidad.png",
    cadencia: "res/cadencia.png",
    daño: "res/daño.png",
    velocidad: "res/velocidad.png",
    disparo_paralizante: "res/disparo_paralizante.png",
    ataque_cuerpo_animacion: "res/slash_animacion.png",
    ataque_cuerpo: "res/slash.png",
    boss_dukeofflies: "res/Bosses/boss_dukeofflies.png",
    boss_dukeofflies_animacion: "res/Bosses/boss_dukeofflies_animacion.png",
    corazon: "res/corazon.png"
};


function cargarImagenes(indice) {
    var imagenCargar = new Image();
    imagenCargar.src = rutasImagenes[indice];
    imagenCargar.onload = function () {
        if (indice < rutasImagenes.length - 1) {
            indice++;
            cargarImagenes(indice);
        } else {
            iniciarJuego();
        }
    }
}