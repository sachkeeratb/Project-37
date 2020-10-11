var stickman, stickman_running;
var ground;

var coinImage, coinsGroup;

var score;

function preload(){
  stickman_running = loadImage("stickman1.png");
  
  coinImage = loadImage("coin.png");
}

function setup() {
  createCanvas(600, 200);
  
  stickman = createSprite(600,150,20,50);
  stickman.addImage("running", stickman_running);
  stickman.scale = 0.5;
  
  ground = createSprite(200,180,100000,20);

  coinsGroup = new Group();

  score = 0;
}

function draw() {
  background(255);

  text("Score: "+ score, 500,150);  
  
  camera.position.x = displayWidth/2;

  if(keyDown(LEFT_ARROW)){
    camera.position.x = camera.position.x-4;
  }
    
  if(keyDown("space")) {
    stickman.velocityY = -10;
  }
  
  stickman.velocityY = stickman.velocityY + 0.8

  stickman.collide(ground);

  spawnCoins();
    
  drawSprites();
}

function spawnCoins() {
  if(World.frameCount % 60 === 0) {
    var coin = createSprite(600,165,10,40);
    coin.y = Math.round(random(0,100));
    
    coin.addImage(coinImage);
    
    //assign scale and lifetime to the obstacle           
    coin.scale = 0.25;
    coin.lifetime = 110;
    coinsGroup.add(coin);

    if(stickman.x ===coin.x) {
      coinsGroup.destroyEach();
      score++;
    }
  }
}
