var PLAY = 1;
var END = 0;
var gameState = PLAY;

var boy, boyImage, boy2Image;

var garden, gardenImage;

var invisibleGround;

var gameOver, gameOverImage;

var mask, maskImage, maskGroup;

var corona, coronaImage, coronaGroup;

var Score = 0;

function preload() {
  boyImage = loadImage("boy1.png");
  boy2Image = loadImage("boy2.png")

  gardenImage = loadImage("background.jpg");
  maskImage = loadImage("mask.png");
  coronaImage = loadImage("corona.png");
  gameOverImage = loadImage("game over.png");

}

function setup() {
  createCanvas(750, 350);

  garden = createSprite(375, 150, 400, 600);
  garden.addImage(gardenImage);
    garden.velocityX = -3
  garden.x = garden.width / 2;

  boy = createSprite(150, 260, 10, 10);
  boy.addImage(boyImage);
  boy.scale = 0.5;
  
  gameOver = createSprite(375,175,750,350);
  gameOver.addImage(gameOverImage );
  gameOver.visible = false;
  gameOver.scale = 0.7

Score = 0

  invisibleGround = createSprite(375, 320, 750, 10);
  invisibleGround.visible = false;

  maskGroup = new Group();
  coronaGroup = new Group();


}

function draw() {
  background("grey");
  
   
   if (gameState===PLAY){
  
   if (garden.x < 0) {
    garden.x = garden.width / 2;
  }
   
  if (keyDown("space")) {
    boy.velocityY = -10;
  }
     
    if (boy.isTouching(maskGroup)){
    Score = Score +5;
    maskGroup.destroyEach();
  }
     
     boy.velocityY = boy.velocityY + 0.4

   safe();
  unsafe();
     
     if(boy.isTouching(coronaGroup)){
       gameState = END;
     } 
     
   }
  else if(gameState === END){
    garden.velocityX = 0;
    boy.velocityY = 0;
   maskGroup.setVelocityXEach(0);
    coronaGroup.setVelocityXEach(0);
    
    corona.visible = false
    mask.visible = false
    
    Score .visible = false
    
    maskGroup.setLifetimeEach(-1);
    coronaGroup.setLifetimeEach(-1);
    
    gameOver.visible = true;
    
boy.addImage(boy2Image);
    boy.scale = 0.2
  
  }
     


  drawSprites();
  
  
  
  stroke("blue");
  textSize(20);
  fill("blue");
  text("Score:" + Score, 290, 50);

  boy.collide(invisibleGround)
}

function safe() {
  if (frameCount % 100 === 0) {
    mask = createSprite(700, 200, 10, 10);
    mask.addImage(maskImage);
    mask.y = Math.round(random(90, 150));
    mask.scale = 0.1;
    mask.velocityX = -5;
    mask.lifetime = 150; 

    maskGroup.add(mask)
  }
}

function unsafe(){
   if (frameCount % 200 === 0) {
    corona = createSprite(700, 100, 10, 10);
   corona.addImage(coronaImage);
    corona.y = Math.round(random(290, 290));
    corona.scale = 0.2;
    corona.velocityX = -5;
    corona.lifetime = 150;

    coronaGroup.add(corona);
  }
  
  
}