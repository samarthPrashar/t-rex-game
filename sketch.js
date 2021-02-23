var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;

var cloud, cloudsGroup, cloudImage;
var obstaclesGroup, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6;

var score;
var gameState = "play";
var cloudGroup, cactusGroup;

var gameOver , gameOverImage 
var restart , restartImage

function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  
  trex_collided = loadAnimation("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
  cloudImage = loadImage("cloud.png");
  
  obstacle1 = loadImage("obstacle1.png");
  obstacle2 = loadImage("obstacle2.png");
  obstacle3 = loadImage("obstacle3.png");
  obstacle4 = loadImage("obstacle4.png");
  obstacle5 = loadImage("obstacle5.png");
  obstacle6 = loadImage("obstacle6.png");
  
  gameOverImage = loadImage("gameOver.png")
  restartImage = loadImage("restart.png")
  
}

function setup() {
  createCanvas(600, 200);
  
  trex = createSprite(50,180,20,50);
  trex.addAnimation("running", trex_running);
  trex.addAnimation("collided" , trex_collided)
  trex.scale = 0.5;
  
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  
  
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudGroup = new Group();  
  cactusGroup = new Group();
  
  score = 0;
  trex.setCollider("circle",0,0,50)
  // trex.debug = true 
  
  gameOver = createSprite(300,50,10,10)
  gameOver.addImage("gameover" , gameOverImage )
  gameOver.scale = 1.5
  gameOver.visible = false 
  
  restart = createSprite(300,100,10,10)
  restart.addImage("restart", restartImage )
  restart.scale = 0.4
  restart.visible = false
}

function draw() 
{
  background(180);
  
  text("Score: "+ score, 500,50);
  
  
         if(gameState === "play")
         {
         ground.velocityX = -4;
           ground.velocityX = -4 - score/200;
        
        score = score + Math.round(getFrameRate()/60);
        
         if(keyDown("space")&& trex.y >= 160) 
         {
            trex.velocityY = -13;
         }
        
        if (ground.x < 0)
         {
            ground.x = ground.width/2;
        }
                      
        //spawn the clouds
        spawnClouds();

        //spawn obstacles on the ground
        spawnObstacles();
        
          if( cactusGroup.isTouching (trex))
          {
            gameState = "end" 
          }         
      }
  
  
    else if(gameState === "end")
    {
      ground.velocityX = 0;
      
      
      cactusGroup.setVelocityXEach(0)
      cactusGroup.setLifetimeEach(-2)
      
      cloudGroup.setVelocityXEach(0)
      cloudGroup.setLifetimeEach(-2)
      
      gameOver.visible = true
      
      restart.visible = true
      
      trex.changeAnimation("collided" , trex_collided);
      
      if(mousePressedOver(restart)){
        reset();
      }
      
    }
  
  trex.velocityY = trex.velocityY + 0.8
  
  trex.collide(invisibleGround);
  
  
    
  drawSprites();
}

function spawnObstacles(){
 if (frameCount % 60 === 0){
   var obstacle = createSprite(400,165,10,40);
   obstacle.velocityX = -6;
   obstacle.velocityX = -6 - score/200
   
   cactusGroup.add(obstacle);

   
    // //generate random obstacles
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
 }
}




function spawnClouds() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    cloud = createSprite(600,100,40,10);
    cloud.y = Math.round(random(10,60));
    cloud.addImage(cloudImage);
    cloud.scale = 0.5;
    cloud.velocityX = -3;
    cloud.velocityX = -3 - score/200 ;
    
    cloudGroup.add(cloud);
    
     //assign lifetime to the variable
    cloud.lifetime = 200;
    
    //adjust the depth
    cloud.depth = trex.depth;
    trex.depth = trex.depth + 1;
  }
  
}

function reset(){
 
  
  score = 0
  
  cactusGroup.destroyEach();
  
  cloudGroup.destroyEach();
  
  
  
  restart.visible = false
  
  gameOver.visible = false
  
   gameState ="play"; 
  
  trex.changeAnimation("running", trex_running)
}