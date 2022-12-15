window.onload = function(){ //Inicializa o nosso jogo e roda o looping
    iniciar();
    setInterval(principal, 1000 / 30);
  }
  function iniciar(){ //Condições Iniciais, Movimento do Mouse e Medidas dos Objetos
    //Condições
    posicaoBolaX = posicaoBolaY = 20;
    velocidadeBolaX = velocidadeBolaY = 5;
    posicaoJogador1 = posicaoJogador2 = 200;
    PontosJogador1 = PontosJogador2 = 0;
    efeitoRaquete = 0.2;
    velocidadeJogador2 = 5;
    //Objetos
    alturaCampo = 500;
    larguraCampo = 600;
    larguraLinha = 5;
    larguraRaquete = 11;
    alturaRaquete = 100;
    diametroBola = 10;
    //Estrutura do Canvas e Mouse
    canvas = document.getElementById("canvas");
    areaDesenho = canvas.getContext("2d");
    canvas.addEventListener('mousemove', function(e){
      posicaoJogador1 = e.clientY - alturaRaquete / 2;
    });
  }
  function desenho(){ //Desenhar o campo e os Objetos

    //Campo
    areaDesenho.fillStyle = '#4682B4';
    areaDesenho.fillRect(0, 0, larguraCampo, alturaCampo);

    //Objetos
    areaDesenho.fillStyle = '#FFFFFF'; // Cor dos Objetos
    areaDesenho.fillRect((larguraCampo-larguraLinha) / 2, 0, larguraLinha, alturaCampo); // Linha
    areaDesenho.fillRect(posicaoBolaX - diametroBola / 2, posicaoBolaY-diametroBola / 2, diametroBola, diametroBola); // Bola
    areaDesenho.fillRect(0, posicaoJogador1, larguraRaquete, alturaRaquete); // Raquete 1
    areaDesenho.fillRect(larguraCampo-larguraRaquete, posicaoJogador2, larguraRaquete, alturaRaquete); // Raquete 2
    areaDesenho.fillText("Humano: " + PontosJogador1, 100, 50); // Pontuação Humano
    areaDesenho.fillText("Computador: " + PontosJogador2, larguraCampo-150, 50); // Pontuação Computador

  }
  function principal(){ //Função principal que chama as outras funções
    desenho();
    play();
  }
  function play(){ //Fazer o jogo acontecer (cálculos etc)

    posicaoBolaX = posicaoBolaX + velocidadeBolaX;
    posicaoBolaY = posicaoBolaY + velocidadeBolaY;

    //Bola rebater nas laterais superior e inferior
    if (posicaoBolaY < 0 && velocidadeBolaY < 0) {
      velocidadeBolaY = -velocidadeBolaY;
    }
    if (posicaoBolaY > alturaCampo && velocidadeBolaY > 0) {
      velocidadeBolaY = -velocidadeBolaY;
    }

    //Raquete 1 Rebatendo ou Pontuação do jogador 2
    if(posicaoBolaX < 0){
      if(posicaoBolaY > posicaoJogador1 && posicaoBolaY < posicaoJogador1 + alturaRaquete){
        velocidadeBolaX = -velocidadeBolaX;
        var diferencaY = posicaoBolaY - (posicaoJogador1 + alturaRaquete / 2);
        velocidadeBolaY = diferencaY * efeitoRaquete;
      } else {
        PontosJogador2 = PontosJogador2 + 1;
        reinicio();
      }
    }

    //Raquete 2 Rebatendo ou Pontuação do jogador 1
    if(posicaoBolaX > larguraCampo){
      if(posicaoBolaY > posicaoJogador2 && posicaoBolaY < posicaoJogador2 + alturaRaquete){
        velocidadeBolaX = -velocidadeBolaX;
        diferencaY = posicaoBolaY - (posicaoJogador2 + alturaRaquete / 2);
        velocidadeBolaY = diferencaY * efeitoRaquete;
      } else {
        PontosJogador1 = PontosJogador1 + 1;
        reinicio();
      }
    }

    //Dificuldade
    if (PontosJogador1 > PontosJogador2 + 3) {
      velocidadeJogador2 = velocidadeJogador2 + 1
    }
    if (PontosJogador2 > PontosJogador1+3) {
      velocidadeJogador2 = velocidadeJogador2 - 1;
    }

    //Movimento da Raquete 2
    if (posicaoBolaY > posicaoJogador2 + alturaRaquete/2) {
      posicaoJogador2 = posicaoBolaY + velocidadeJogador2;
    }else {
      posicaoJogador2 = posicaoBolaY - velocidadeJogador2;
    }
  }
  function reinicio(){ //Colocar a Bola em jogo de novo
    posicaoBolaX = alturaCampo / 2 - diametroBola;
    posicaoBolaY = larguraCampo / 2 - diametroBola;
    velocidadeBolaX = -velocidadeBolaX;
    velocidadeBolaY = 3;
  }