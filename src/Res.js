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
    icono_vidas: "res/icono_vidas.png",
    icono_recolectable: "res/icono_recolectable.png",
    fondo_2: "res/fondo_3.png",
    jugador_idle_derecha: "res/iddle-caminando-derecha.png",
    jugador_idle_izquierda: "res/iddle-caminando-izquierda.png",
    jugador_idle_arriba: "res/iddle-camina-atras.png",
    jugador_idle_abajo: "res/iddle-camina-alante.png",
    jugador_corriendo_derecha: "res/caminando-derecha.png",
    jugador_corriendo_izquierda: "res/caminando-izquierda.png",
    jugador_corriendo_arriba: "res/camina-atras.png",
    jugador_corriendo_abajo: "res/camina-alante.png",
    enemigo_correr_izquierda: "res/enemigo_correr_izquierda.png",
    suelo: "res/suelo.png",
    enemigo_morir: "res/enemigo_morir.png",
    pared: "res/pared.png",
    bloque_tierra: "res/pared.png",
    bloque_metal: "res/bloque_metal.png",
    bloque_fondo_muro: "res/bloque_fondo_muro.png",
    copa: "res/copa.png",
    pad: "res/pad.png",
    boton_disparo: "res/boton_disparo.png",
    boton_salto: "res/boton_salto.png",
    boton_pausa: "res/boton_pausa.png",
    menu_fondo: "res/menu_fondo.png",
    boton_jugar: "res/boton_jugar.png",
    mensaje_como_jugar: "res/mensaje_como_jugar.png",
    mensaje_ganar: "res/mensaje_ganar.png",
    mensaje_perder: "res/mensaje_perder.png",
    puerta_abierta: "res/open_door.png",
    puerta_cerrada: "res/closed_door.png",
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
    vida_llena:"res/vida_llena.png",
    vida_media:"res/vida_media.png",
    vida_vacia:"res/vida_vacia.png",
    icono_explosion: "res/icono_explosion.png",
    disparo_paralizante: "res/disparo_paralizante.png",
    ataque_cuerpo_animacion: "res/slash_animacion.png",
    ataque_cuerpo: "res/slash.png",
    boss_dukeofflies: "res/Bosses/boss_dukeofflies.png",
    boss_dukeofflies_animacion: "res/Bosses/boss_dukeofflies_animacion.png",
    corazon: "res/corazon.png"
};

var rutasImagenes = Object.values(imagenes);
cargarImagenes(0);

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