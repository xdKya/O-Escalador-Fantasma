var imagemDaTorre, torre;
var imagemDaPorta, porta, grupoDePortas;
var imagemDeEscalador, escalador, grupoDeEscaladores;
var fantasma, imagemDoFantasma;
var grupoDeBlocoInvisivel, blocoInvisivel;
var estadoJogo = "JOGAR";

function preload(){
  imagemDaTorre = loadImage("tower.png");
  imagemDaPorta = loadImage("door.png");
  imagemDeEscalador = loadImage("climber.png");
  imagemDoFantasma = loadImage("ghost-standing.png");
  somAssustador = loadSound("spooky.wav");
  
}

function setup(){
  createCanvas(595,595);
  
  //sprites torre
  torre = createSprite(width/2,9);
  torre.addImage("tower",imagemDaTorre);
  torre.velocityY = 4;
  
  //grupos
  grupoDePortas = new Group();
  grupoDeEscaladores = new Group();
  grupoDeBlocoInvisivel = new Group();
  
  //sprite fantasma
  fantasma = createSprite (300,300);
  fantasma.addImage("fantasma",imagemDoFantasma);
  fantasma.scale = 0.4;
  
  
  }


function draw(){
  background(200);
  
  if(estadoJogo === "JOGAR"){
  
  if(torre.y > 600){
      torre.y =9;
    }
  
  gerarportas();
  controles();
  
  //gravidade
  fantasma.velocityY = fantasma.velocityY + 1;
  
  if(grupoDeEscaladores.isTouching(fantasma)){
    fantasma.velocityY = 0;
  }
  
  
  if(grupoDeBlocoInvisivel.isTouching(fantasma)|| fantasma.y >600){
    fantasma.destroy();
    estadoJogo = "FIM";
  }
  
  
  
  
  
  
  drawSprites();
}
  
  
  if(estadoJogo === "FIM"){
    background("black");
    stroke("yellow");
    fill("red");
    textSize(50);
    text("GAME OVER",150,300);
  }
  
  
}

function gerarportas(){
  if (frameCount % 100 ===0){
    var porta = createSprite(300,-50);
    porta.addImage(imagemDaPorta);
    
    var escalador = createSprite(10,15);
    escalador.addImage(imagemDeEscalador);
    
    var blocoInvisivel = createSprite(200,30);
    blocoInvisivel.width = escalador.width;
    blocoInvisivel.height = 2;
    
       
    porta.x = Math.round(random(120,450));
    porta.velocityY = 4;
    
    escalador.x = porta.x;
    escalador.velocityY = porta.velocityY;
    
    blocoInvisivel.x = porta.x;
    blocoInvisivel.velocityY = porta.velocityY;
    
    porta.lifetime = 700;
    escalador.lifetime = 700;
    
    
    //blocoInvisivel.debug = true;
    blocoInvisivel.visible = false;
    
    grupoDePortas.add(porta);
    grupoDeEscaladores.add(escalador);
    grupoDeBlocoInvisivel.add(blocoInvisivel);
    
    fantasma.depth = porta.depth;
    fantasma.depth = fantasma.depth + 1;
  }
}

function controles(){
  if(keyDown("left")){
    fantasma.x = fantasma.x - 4;
  }
  
  if(keyDown("right")){
    fantasma.x = fantasma.x + 4;
  }
  
  if(keyDown("SPACE")){
    fantasma.velocityY = -10;
  }
}