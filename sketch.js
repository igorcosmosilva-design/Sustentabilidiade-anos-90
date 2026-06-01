// ================= VARIÁVEIS GLOBAIS =================
let estadoAtual = "INTRO"; // INTRO, MENU, OPCOES, TRANSICAO, FASE1 a 5, GAMEOVER, VITORIA
let tempoRestante = 30;
let vidas = 3;
let pontuacao = 0;
let multiplicadorVelocidade = 1.0; 

// Variáveis de Transição
let faseAlvo = 1;
let cliquesParaIniciar = 0;

// Textos e Descrições das Fases
let introducoesFases = [
  "", 
  "FASE 1: PLANTIO SUSTENTÁVEL\n\nO campo precisa de cuidados ecológicos.\nColete Água/Adubo (Azul) e evite agrotóxicos perigosos (Vermelho).",
  "FASE 2: TRANSPORTE CONSCIENTE\n\nHora de pegar a estrada rumo à cidade!\nO caminhão começa devagar e vai acelerando. Desvie dos buracos.",
  "FASE 3: SELEÇÃO DE QUALIDADE\n\nNo galpão de triagem dos alimentos.\nSepare rapidamente as maçãs boas (Verde) das estragadas (Marrom).",
  "FASE 4: DISTRIBUIÇÃO URBANA\n\nA van de entregas chegou ao centro comercial!\nO trânsito vai apertar e acelerar. Desvie dos carros vermelhos.",
  "FASE 5: USINA DE COMPOSTAGEM CAÓTICA\n\nALERTA de Nova Mecânica! A esteira magnética está instável!\nOs itens caem oscilando em ZIGUE-ZAGUE rápido. Pegue orgânicos!"
];

// Variáveis do Jogador e Entidades
let jogador;
let itens = [];
let nuvens = [];
let arvores = [];
let itensColetados = 0; 

// Variáveis de Opções e Dificuldade
let dificuldades = ["FÁCIL", "NORMAL", "DIFÍCIL"];
let diffIndex = 1; 
let somLigado = true;
let menuOpcaoSelecionada = 0;
let taxaSpawnBase = 60;

// Textos da Intro
let yTextoIntro;
let textoSustentabilidade = 
  "SENAR-PR e SEED-PR apresentam:\n\n" +
  "AGRO FORTE, FUTURO SUSTENTAVEL\n\n\n\n" +
  "Ano 199X.\n\n" +
  "O world percebeu que produzir alimentos\n" +
  "exigia grande responsabilidade.\n\n\n" +
  "Sua missao:\n" +
  "1. Plantio sustentavel no campo.\n" +
  "2. Transporte sem desperdicio.\n" +
  "3. Selecao de alimentos com qualidade.\n" +
  "4. Distribuicao urbana eficiente.\n" +
  "5. Compostagem dos residuos.\n\n\n" +
  "O equilibrio esta em suas maos!";

function setup() {
  createCanvas(600, 400);
  textFont('Courier New'); 
  textStyle(BOLD);
  yTextoIntro = height + 50; 
  
  iniciarJogador();
  gerarCenarioFundo();
}

function draw() {
  switch (estadoAtual) {
    case "INTRO": drawIntro(); break;
    case "MENU": drawMenu(); break;
    case "OPCOES": drawOpcoes(); break;
    case "TRANSICAO": drawTransicao(); break;
    case "FASE1": drawFase(1, 110, 190, 240, "PLANTIO CONSCIENTE", "Pegue Água/Adubo. Evite Poluição (Vermelho)!"); break;
    case "FASE2": drawFase(2, 80, 80, 80, "TRANSPORTE EFICIENTE", "Desvie dos buracos! Cuidado com a aceleração."); break;
    case "FASE3": drawFase(3, 160, 110, 80, "SELEÇÃO DE QUALIDADE", "Pegue maçãs boas. Evite as podres/marrons!"); break;
    case "FASE4": drawFase(4, 50, 50, 50, "DISTRIBUIÇÃO URBANA", "Desvie do trânsito que acelera com o tempo!"); break;
    case "FASE5": drawFase(5, 30, 30, 40, "USINA DE RECICLAGEM", "Cuidado! Itens oscilando em zigue-zague rápido!"); break;
    case "GAMEOVER": drawGameOver(); break;
    case "VITORIA": drawVitoria(); break;
  }
  
  aplicarEfeitoCRT(); 
  desenharBordaPreta(); 
}

// ================= TELAS DO JOGO =================

function drawIntro() {
  background(10);
  fill(50, 200, 50); textAlign(CENTER, TOP); textSize(16);
  text(textoSustentabilidade, width / 2, yTextoIntro);
  
  yTextoIntro -= 0.8; 
  
  if (frameCount % 60 < 30) {
    fill(255, 255, 0); textSize(14);
    text("DICA: CLIQUE NA TELA COM O MOUSE PRIMEIRO!", width / 2, height - 50);
    text("PRESSIONE [ENTER] OU [ESPAÇO] PARA PULAR", width / 2, height - 25);
  }
  
  if (yTextoIntro < -480) estadoAtual = "MENU";
}

function drawMenu() {
  background(10, 40, 20); 
  
  fill(0); textAlign(CENTER); textSize(42);
  text("AGRO SUSTENTÁVEL", width / 2 + 4, 104);
  fill(100, 255, 100); text("AGRO SUSTENTÁVEL", width / 2, 100);
  
  textSize(22); fill(255);
  text("[1] INICIAR JOGO", width / 2, 220);
  text("[2] OPÇÕES", width / 2, 270);
  
  textSize(12); fill(150);
  text("Cumpra as 5 metas para garantir um futuro verde.", width/2, height - 40);
  
  if (frameCount % 40 < 20) {
    fill(255, 0, 0); textSize(16); text("INSERT COIN", width / 2, 330);
  }
}

function drawOpcoes() {
  background(20, 20, 60);
  fill(255); textAlign(CENTER); textSize(30); text("OPÇÕES DE JOGO", width / 2, 80);
  
  textSize(20); textAlign(LEFT);
  fill(menuOpcaoSelecionada === 0 ? color(255, 255, 0) : color(255));
  text("Dificuldade: < " + dificuldades[diffIndex] + " >", 150, 180);
  fill(menuOpcaoSelecionada === 1 ? color(255, 255, 0) : color(255));
  text("Música/Som : < " + (somLigado ? "LIGADO" : "DESLIGADO") + " >", 150, 230);
  fill(menuOpcaoSelecionada === 2 ? color(255, 255, 0) : color(255));
  text("VOLTAR AO MENU", 150, 280);
  
  textAlign(CENTER); textSize(12); fill(150);
  text("Use SETAS para escolher. ENTER para confirmar.", width/2, height - 50);
}

function drawTransicao() {
  background(10, 30, 10);
  fill(50, 255, 50); textAlign(CENTER, TOP); textSize(24);
  
  // Exibição da Descrição Completa da Fase Atual
  rect(40, 40, width - 80, height - 160, 0); 
  fill(10, 30, 10); rect(44, 44, width - 88, height - 168, 0);
  
  fill(50, 255, 50);
  text(introducoesFases[faseAlvo], 60, 60, width - 120, height - 180);
  
  // Pergunta e Instrução de Entrada
  textSize(24); fill(255);
  text("VOCÊ ESTÁ PRONTO?", width / 2, height - 90);
  
  if (frameCount % 40 < 25) {
    fill(255, 255, 0); textSize(14);
    text("Click enter 2 vezes para iniciar a fase " + faseAlvo, width / 2, height - 55);
  }
  
  fill(200); textSize(12);
  text("Cliques registrados: " + cliquesParaIniciar + " / 2", width / 2, height - 35);
}

// ================= MOTOR DAS FASES =================

function drawFase(numFase, bgR, bgG, bgB, titulo, dica) {
  background(bgR, bgG, bgB);
  
  // Controle de velocidade das fases de locomoção (Garante largada suave)
  if (numFase === 2 || numFase === 4) {
    multiplicadorVelocidade = map(tempoRestante, 20, 0, 0.7, 1.7);
  } else {
    multiplicadorVelocidade = 1.0;
  }
  
  if (numFase === 1) { animarNuvens(); desenharChao(34, 139, 34); jogador.mostrar(color(220, 180, 130), "fazendeiro"); }
  else if (numFase === 2) { animarArvores(); desenharFaixasRua(); jogador.mostrar(color(200, 50, 50), "caminhao"); }
  else if (numFase === 3) { desenharChao(100, 50, 20); jogador.mostrar(color(150, 200, 250), "cesto"); } 
  else if (numFase === 4) { animarPredios(); desenharFaixasRua(); jogador.mostrar(color(255, 255, 255), "van"); }
  else if (numFase === 5) { desenharChao(80, 80, 90); jogador.mostrar(color(100, 60, 30), "composteira"); }
  
  atualizarHUD("FASE " + numFase + ": " + titulo, dica);
  
  if (frameCount % 60 === 0 && tempoRestante > 0) tempoRestante--;
  if (tempoRestante <= 0 && (numFase === 1 || numFase === 3 || numFase === 5)) gameOver(); 
  
  if (tempoRestante <= 0 && vidas > 0) {
    if (numFase === 2) iniciarTransicao(3);
    else if (numFase === 4) iniciarTransicao(5);
  }

  let limiteY = height - 80; 
  jogador.mover(numFase === 2 || numFase === 4 ? "ambos" : "horizontal");
  jogador.restringir(50, limiteY);

  let taxaAtual = taxaSpawnBase - (diffIndex * 10);
  if (numFase === 2 || numFase === 4) taxaAtual = max(25, taxaAtual - (multiplicadorVelocidade * 10));
  if (numFase === 5) taxaAtual = 20; // Spawn frenético e caótico na fase 5
  
  if (frameCount % floor(taxaAtual) === 0) gerarItem(numFase);
  
  gerenciarItens(numFase);
}

function drawGameOver() {
  background(0);
  fill(255, 0, 0); textAlign(CENTER); textSize(60);
  text("GAME OVER", width / 2, height / 2 - 20);
  textSize(18); fill(255);
  text("O ciclo sustentável foi interrompido.", width / 2, height / 2 + 30);
  if (frameCount % 40 < 20) {
    fill(255, 255, 0); text("PRESSIONE [R] PARA REINICIAR", width / 2, height / 2 + 90);
  }
}

function drawVitoria() {
  background(30, 120, 30);
  fill(255, 215, 0); textAlign(CENTER); textSize(40);
  text("CICLO COMPLETO!", width / 2, height / 2 - 40);
  textSize(18); fill(255);
  text("Você garantiu sustentabilidade do campo à mesa!", width / 2, height / 2 + 10);
  textSize(24); fill(100, 255, 100);
  text("PONTUAÇÃO FINAL: " + pontuacao, width / 2, height / 2 + 60);
  if (frameCount % 40 < 20) {
    fill(255); textSize(16); text("PRESSIONE [R] PARA JOGAR NOVAMENTE", width / 2, height / 2 + 110);
  }
}

// ================= CONTROLES E TRANSIÇÕES =================

function processarAcaoAvançar() {
  if (estadoAtual === "INTRO") {
    estadoAtual = "MENU";
  } else if (estadoAtual === "TRANSICAO") {
    cliquesParaIniciar++;
    if (cliquesParaIniciar >= 2) {
      prepararFase(faseAlvo);
    }
  } else if ((estadoAtual === "GAMEOVER" || estadoAtual === "VITORIA")) {
    estadoAtual = "MENU"; yTextoIntro = height + 50; 
  }
}

function mousePressed() { processarAcaoAvançar(); }

function keyPressed() {
  let ehBotaoAcao = (keyCode === ENTER || keyCode === 13 || keyCode === 32 || key === 'Enter');
  if (ehBotaoAcao) processarAcaoAvançar();
  
  if (estadoAtual === "MENU") {
    if (key === '1') iniciarTransicao(1);
    if (key === '2') { estadoAtual = "OPCOES"; menuOpcaoSelecionada = 0; }
  }
  
  if (estadoAtual === "OPCOES") {
    if (keyCode === UP_ARROW) menuOpcaoSelecionada = max(0, menuOpcaoSelecionada - 1);
    if (keyCode === DOWN_ARROW) menuOpcaoSelecionada = min(2, menuOpcaoSelecionada + 1);
    if (keyCode === LEFT_ARROW) {
      if (menuOpcaoSelecionada === 0) diffIndex = max(0, diffIndex - 1);
      if (menuOpcaoSelecionada === 1) somLigado = !somLigado;
    }
    if (keyCode === RIGHT_ARROW) {
      if (menuOpcaoSelecionada === 0) diffIndex = min(2, diffIndex + 1);
      if (menuOpcaoSelecionada === 1) somLigado = !somLigado;
    }
    if (ehBotaoAcao && menuOpcaoSelecionada === 2) estadoAtual = "MENU";
  }
  if ((key === 'r' || key === 'R')) {
     if(estadoAtual === "GAMEOVER" || estadoAtual === "VITORIA") processarAcaoAvançar();
  }
}

function iniciarTransicao(num) {
  estadoAtual = "TRANSICAO";
  faseAlvo = num;
  cliquesParaIniciar = 0;
}

function prepararFase(num) {
  estadoAtual = "FASE" + num;
  itens = [];
  itensColetados = 0;
  
  if (num === 1) { vidas = 3 - diffIndex; if (vidas < 1) vidas = 1; pontuacao = 0; }
  
  if (num === 1) tempoRestante = 30; 
  if (num === 2) tempoRestante = 20; 
  if (num === 3) tempoRestante = 30; 
  if (num === 4) tempoRestante = 20; 
  if (num === 5) tempoRestante = 30; 

  jogador.x = width / 2;
  jogador.y = height - 100;
  jogador.velocidade = (num === 5) ? 8 : 6; // Jogador ganha um pouco mais de velocidade na fase 5
}

function gameOver() { estadoAtual = "GAMEOVER"; }

// ================= VISUAIS RETRO E CENÁRIOS BRUTOS =================

function desenharBordaPreta() {
  stroke(0);
  strokeWeight(20); 
  noFill();
  rect(0, 0, width, height);
  noStroke(); 
}

function aplicarEfeitoCRT() {
  fill(0, 30); noStroke();
  for (let i = 0; i < height; i += 4) rect(0, i, width, 2);
}

function atualizarHUD(titulo, dica) {
  fill(0, 180); rect(0, 0, width, 50);
  fill(255); textSize(14); textAlign(LEFT);
  text("VIDAS: " + vidas + " | TEMPO: " + tempoRestante + "s | PTS: " + pontuacao, 15, 22);
  textAlign(RIGHT); fill(100, 255, 100); text(titulo, width - 15, 22);
  textAlign(CENTER); fill(255, 255, 0); text(dica, width / 2, 42);
}

function desenharChao(r, g, b) {
  fill(r, g, b); rect(0, height - 70, width, 70);
  fill(r-20, g-20, b-20);
  for(let i=0; i<width; i+=40) rect(i + 10, height - 40, 20, 10); 
}

function desenharFaixasRua() {
  fill(150, 150, 0); rect(80, 50, 10, height); rect(510, 50, 10, height);
  fill(255); 
  let velocidadeRua = (10 + (diffIndex * 2)) * multiplicadorVelocidade; 
  for(let i = -50; i < height; i+=60) rect(width/2 - 5, i + (frameCount * velocidadeRua) % 60, 10, 30); 
}

function gerarCenarioFundo() {
  for (let i=0; i<4; i++) nuvens.push({x: random(width), y: random(50, 150), w: random(40, 60), h: random(20, 30), v: random(0.5, 1.5)});
  for (let i=0; i<6; i++) arvores.push({x: (i%2===0 ? random(10, 60) : random(530, 580)), y: random(height)});
}

function animarNuvens() {
  fill(255, 230); noStroke();
  for (let n of nuvens) {
    rect(n.x, n.y, n.w, n.h);
    rect(n.x - 10, n.y + 10, n.w + 20, n.h - 10);
    n.x += n.v; if (n.x > width + 50) n.x = -50;
  }
}

function animarArvores() {
  let velocidadeRua = (8 + (diffIndex * 2)) * multiplicadorVelocidade; 
  for (let a of arvores) {
    fill(139, 69, 19); rect(a.x - 5, a.y, 10, 20); 
    fill(34, 100, 34); rect(a.x - 15, a.y - 15, 30, 30); 
    a.y += velocidadeRua;
    if (a.y > height + 40) { a.y = -40; a.x = (random(1) < 0.5) ? random(10, 60) : random(530, 580); }
  }
}

function animarPredios() {
  fill(30, 30, 40); rect(0, 50, width, height);
  let velocidadeRua = (10 + (diffIndex * 2)) * multiplicadorVelocidade; 
  for (let a of arvores) {
    fill(80, 80, 100); rect(a.x - 20, a.y, 40, 70); 
    fill(255, 255, 0); rect(a.x - 10, a.y + 10, 8, 8); 
    a.y += velocidadeRua;
    if (a.y > height + 40) { a.y = -40; a.x = (random(1) < 0.5) ? random(10, 60) : random(530, 580); }
  }
}

// ================= ENTIDADES QUADRADAS STYLE =================

function iniciarJogador() {
  jogador = {
    x: width / 2, y: height - 100, w: 40, h: 40, velocidade: 6,
    mostrar: function(corBase, tipo) {
      if (tipo === "fazendeiro") {
        fill(corBase); rect(this.x, this.y, this.w, this.h); 
        fill(0, 0, 255); rect(this.x, this.y + 20, this.w, 20); 
        fill(255, 220, 150); rect(this.x + 10, this.y - 15, 20, 20); 
        fill(200, 200, 50); rect(this.x + 5, this.y - 20, 30, 5); rect(this.x + 10, this.y - 25, 20, 10); 
      } else if (tipo === "caminhao" || tipo === "van") {
        fill(tipo==="van"? 255 : 170); rect(this.x, this.y, this.w, this.h + 20); 
        fill(corBase); rect(this.x + 5, this.y - 15, this.w - 10, 20); 
        fill(30); rect(this.x - 5, this.y + 10, 5, 15); rect(this.x + this.w, this.y + 10, 5, 15); 
        rect(this.x - 5, this.y + 40, 5, 15); rect(this.x + this.w, this.y + 40, 5, 15); 
      } else if (tipo === "cesto" || tipo === "composteira") {
        fill(corBase); rect(this.x, this.y, this.w + 10, this.h); 
        fill(0, 60); rect(this.x + 5, this.y + 5, this.w, this.h - 10); 
      }
    },
    mover: function(direcoes) {
      if (keyIsDown(LEFT_ARROW)) this.x -= this.velocidade;
      if (keyIsDown(RIGHT_ARROW)) this.x += this.velocidade;
      if (direcoes === "ambos") {
        if (keyIsDown(UP_ARROW)) this.y -= this.velocidade;
        if (keyIsDown(DOWN_ARROW)) this.y += this.velocidade;
      }
    },
    restringir: function(minX, maxY) {
      this.x = constrain(this.x, minX, width - minX - this.w);
      this.y = constrain(this.y, 50, maxY);
    }
  };
}

function gerarItem(fase) {
  let velocidade = random(3, 5) + diffIndex;
  let tipo = random(1) < 0.7 ? "bom" : "ruim";
  if (fase === 2) { tipo = "ruim"; velocidade *= 1.1; } 
  if (fase === 4) { tipo = "ruim"; velocidade *= 1.2; } 
  if (fase === 5) { velocidade = random(5, 7) + diffIndex; } // Fase 5 é inerentemente mais rápida
  itens.push(new Item(random(120, width - 120), -40, tipo, velocidade, fase));
}

class Item {
  constructor(x, y, tipo, vel, fase) {
    this.x = x; this.y = y; this.tipo = tipo; this.vel = vel; this.fase = fase; this.w = 25; this.h = 25;
    this.seedOscilacao = random(0, 100); // Evita que todos os itens da fase 5 dancem no mesmo tempo
  }
  mostrar() {
    noStroke();
    if (this.fase === 1) { 
      if (this.tipo === "bom") { 
        fill(50, 150, 255); triangle(this.x, this.y - 12, this.x - 10, this.y + 10, this.x + 10, this.y + 10); 
      } else { 
        fill(200, 40, 40); rect(this.x - 10, this.y - 10, 20, 20); 
      }
    } else if (this.fase === 2) { 
      fill(30); rect(this.x - 15, this.y - 10, 30, 20); 
    } else if (this.fase === 3) { 
      fill(this.tipo === "bom" ? color(50, 220, 50) : color(139, 69, 19)); 
      rect(this.x - 10, this.y - 10, 20, 20); 
    } else if (this.fase === 4) { 
      fill(220, 40, 40); rect(this.x-10, this.y-15, 20, 30); 
      fill(255,255,0); rect(this.x-8, this.y+10, 4, 4); rect(this.x+4, this.y+10, 4, 4); 
    } else if (this.fase === 5) { 
      if (this.tipo === "bom") { 
        fill(0, 255, 100); rect(this.x - 10, this.y - 10, 20, 20); // Cubo Verde Orgânico Brilhante
        fill(0, 180, 50); rect(this.x - 6, this.y - 6, 12, 12);
      } else { 
        fill(255, 150, 0); rect(this.x - 8, this.y - 12, 16, 24); // Pilha de Resíduo Químico Corrosivo
        fill(255, 0, 0); rect(this.x - 4, this.y - 4, 8, 8);
      }
    }
  }
  atualizar() { 
    if (this.fase === 2 || this.fase === 4) {
      this.y += (this.vel * multiplicadorVelocidade); 
    } else if (this.fase === 5) {
      this.y += this.vel;
      // MECÂNICA EXCLUSIVA FASE 5: Movimento horizontal matemático em zigue-zague senoidal
      this.x += sin((this.y * 0.06) + this.seedOscilacao) * 6; 
      this.x = constrain(this.x, 80, width - 80); // Mantém nas margens da esteira
    } else {
      this.y += this.vel; 
    }
  }
  bater(j) { return (this.x > j.x - 12 && this.x < j.x + j.w + 12 && this.y > j.y - 12 && this.y < j.y + j.h + 12); }
}

function gerenciarItens(numFase) {
  let faseDeColeta = (numFase === 1 || numFase === 3 || numFase === 5);
  for (let i = itens.length - 1; i >= 0; i--) {
    itens[i].atualizar(); itens[i].mostrar();
    
    if (itens[i].bater(jogador)) {
      if (faseDeColeta) {
        if (itens[i].tipo === "bom") { 
          pontuacao += 15 * (diffIndex + 1); 
          itensColetados++; 
        } else { 
          vidas--; 
          background(255, 0, 0, 150); 
          if (vidas <= 0) gameOver(); 
        }
      } else { 
        vidas--; pontuacao -= 10; background(255, 0, 0, 150); if (vidas <= 0) gameOver();
      }
      itens.splice(i, 1);
    } else if (itens[i].y > height) {
      if (!faseDeColeta) pontuacao += 5; 
      itens.splice(i, 1);
    }
  }
  
  if (faseDeColeta && itensColetados >= 12) {
    if (numFase === 1) iniciarTransition(2);
    else if (numFase === 3) iniciarTransicao(4);
    else if (numFase === 5) estadoAtual = "VITORIA";
  }
}

// Pequeno fix auxiliar para rotas internas alternadas
function iniciarTransition(num) { iniciarTransicao(num); }