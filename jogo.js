let largura, altura;
let vidas = 1;
let tempo = 11;
let criaMosquitoTempo = 1500;
let nivel = window.location.search.replace("?", "");

if (nivel === "normal") {
    criaMosquitoTempo = 1500;

} else if (nivel == "dificil") {
    criaMosquitoTempo = 1000;

} else {
    criaMosquitoTempo = 750;
}

function ajustaTamanhoPalcoJogo() {
    altura = window.innerHeight;
    largura = window.innerWidth;
    console.log(largura, altura);
}

ajustaTamanhoPalcoJogo();

let cronometro = setInterval(function () {
    tempo -= 1;
    if (tempo < 0) {
        clearInterval(cronometro);
        clearInterval(criaMosquito);
        window.location.href = "./vitoria.html";
    } else {
        document.getElementById("cronometro").innerHTML = tempo;
    }
}, 1000);

function posicaoRandomica() {
    //remover o mosquito caso ele ja exista
    if (document.getElementById("mosquito")) {
        document.getElementById("mosquito").remove();
        if (vidas > 3) {
            window.location.href = "./fim_de_jogo.html";
        }
        else {
            document.getElementById(`v${vidas}`).src = "./imagens/coracao_vazio.png"
            vidas++;
        }
    }

    let posicaoX = Math.floor(Math.random() * largura) - 90;
    let posicaoY = Math.floor(Math.random() * altura) - 90;

    posicaoX = posicaoX < 0 ? 0 : posicaoX;
    posicaoY = posicaoY < 0 ? 0 : posicaoY;

    let mosquito = document.createElement("img");
    mosquito.src = "./imagens/mosca.png";
    mosquito.className = tamanhoAleatorio() + " " + ladoAleatorio();
    mosquito.style.left = posicaoX + "px";
    mosquito.style.top = posicaoY + "px";
    mosquito.style.position = "absolute";
    mosquito.id = "mosquito";
    mosquito.onclick = function () {
        this.remove();
    }
    document.body.appendChild(mosquito);

}

function tamanhoAleatorio() {
    let classe = Math.floor(Math.random() * 3);
    return "mosquito" + (classe + 1);
}

function ladoAleatorio() {
    let classe = Math.floor(Math.random() * 2);
    return (classe === 0) ? "ladoA" : "ladoB";
}

posicaoRandomica();
let criaMosquito = setInterval(posicaoRandomica, criaMosquitoTempo);