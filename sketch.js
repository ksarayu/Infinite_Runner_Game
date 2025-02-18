var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;

var PLAY, END, gameState;


function preload(){
  trex_running = loadAnimation("images/trex1.png","images/trex3.png","images/trex4.png");
  trex_collided = loadAnimation("images/trex_collided.png");
  
  groundImage = loadImage("images/ground2.png");
  
  cloudImage = loadImage("images/cloud.png");
  
  obstacle1 = loadImage("images/obstacle1.png");
  obstacle2 = loadImage("images/obstacle2.png");
  obstacle3 = loadImage("images/obstacle3.png");
  obstacle4 = loadImage("images/obstacle4.png");
  obstacle5 = loadImage("images/obstacle5.png");
  obstacle6 = loadImage("images/obstacle6.png");
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("trex_running", trex_running);
  trex.addAnimation("trex_collided", trex_collided);
  trex.scale = 0.5;
  trex.velocityX = 2;
  
  ground = createSprite(200,180,400,20);
  ground.addImage(groundImage);
  ground.x = ground.width /2;
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = new Group();
  obstaclesGroup = new Group();
  
  score = 0;
  
  PLAY = 1;
  END = 0;
  gameState = PLAY;
}

function draw() {
  background(180);
  
  fill("white")
  textSize(15);
  text("Score: " + score, trex.x + 100,50);

  camera.position.x = trex.x;
  //camera.position.y = trex.y;
  
  if (gameState === PLAY){
    if(keyDown("space")) {
      trex.velocityY = -10;
    }
  
    trex.velocityY = trex.velocityY + 0.8
  
    if (ground.x < 0){
      ground.x = ground.width/2;
    }

    spawnClouds();
    spawnObstacles();
    
    ground.velocityX = -(6 + 3 * score / 100);
    
    score = score + Math.round(getFrameRate()/60);
    
    if(obstaclesGroup.isTouching(trex)){
      gameState = END;
    }
  }
  
  if (gameState === END){
    ground.velocityX = 0;
    trex.velocityX = 0;
    trex.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    cloudsGroup.setVelocityXEach(0);
    
    trex.changeAnimation("trex_collided", trex_collided);
    
    obstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
  }
  
  trex.collide(invisibleGround);

  drawSprites();
}

function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    var cloud = createSprite(600,120,40,10);
    cloud.y = Math.round(random(80,120));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    cloudsGroup.add(cloud);
  }
  
}

function spawnObstacles() {
  if(frameCount % 60 === 0) {
    var obstacle = createSprite(600,165,10,40);
    obstacle.velocityX = -4;
    
    //generate random obstacles
    var rand = Math.round(random(1,6));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      case 6: obstacle.addImage(obstacle6);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.5;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  }
}