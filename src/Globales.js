var pulsaciones = []; // actuales registradas

var tipoPulsacion = {}; // tipos
tipoPulsacion.inicio = 1;
tipoPulsacion.mantener = 2;

var entradas = {}; // tipos
entradas.pulsaciones = 1;
entradas.teclado = 2;
entradas.gamepad = 3;
var entrada = entradas.pulsaciones;


var nivelActual = 0;
var nivelMaximo = 2;

var cuerpo = {};
cuerpo.dinamico = 1;
cuerpo.estatico = 2;

var estados = {};
estados.moviendo = 2; // Incluye parado, derecha , izquierda
estados.saltando = 3;
estados.muriendo = 4;
estados.muerto = 5;
estados.disparando = 6;
estados.impactado = 7;
estados.invencible = 8;
estados.enterrado = 9;
estados.enterrandose = 10;

var orientaciones = {};
orientaciones.arriba = 1;
orientaciones.abajo = 2;
orientaciones.derecha = 3;
orientaciones.izquierda = 4;

var TECLAS = {};
TECLAS.ARRIBA = 87;
TECLAS.ABAJO = 83;
TECLAS.DERECHA = 68;
TECLAS.IZQUIERDA = 65;
TECLAS.BOMBA = 81;
TECLAS.RECURSO = 32;
TECLAS.ATAQUE_ARRIBA = 38;
TECLAS.ATAQUE_ABAJO = 40;
TECLAS.ATAQUE_DERECHA = 39;
TECLAS.ATAQUE_IZQUIERDA = 37;

var pixel = {};
pixel.alto = 32;
pixel.ancho = 40;

var axis = {};
axis.X = "X";
axis.Y = "Y";