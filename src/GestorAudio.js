
var musicaAmbiente = new Audio("res/musica_ambiente.ogg");
musicaAmbiente.volume=0.1;
musicaAmbiente.loop = true;

var efectos = {
    disparo : "res/efecto_disparo.wav",
    explosion : "res/efecto_explosion.mp3",
    muere: "res/muere.wav",
    da:"res/da.wav",
    golpeo:"res/golpe.wav"
}

function reproducirMusica() {
    musicaAmbiente.play();
}

function pararMusica() {
    musicaAmbiente.stop();
}

function reproducirEfecto( srcEfecto ) {
    var efecto = new Audio( srcEfecto );
    efecto.play();
}