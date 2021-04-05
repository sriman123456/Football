var BlueTeamscore=0;
var RedTeamscore=0;
var loss,gameoverImg;
var restart,restartImg;
var g1,g2,g3,g4,g5,g6,g7;
var goal1,goal2;
var ball,ballImg;
var paddle,paddleImg;
var paddle1,paddle1Img
var d1,d1Img;
var d2,d2Img;
var start,startImg;
var won,wonImg;
var water;
var logo,logoImg;
var replay,replayImg;


function preload(){
  gameoverImg=loadImage("gameover.gif");
  restartImg=loadImage("restart.png");
  ballImg=loadImage("ball.png");
  paddleImg=loadImage("paddle.png");
  paddle1Img=loadImage("paddle1.png");
  d1Img=loadImage("d1.png");
  d2Img=loadImage("d2.png");
  startImg=loadImage("start.png");
  wonImg=loadImage("won.png");
  water=loadSound("water.mp3");
  logoImg=loadImage("logo.png");
  replayImg=loadImage("replay.png");
  
}


function setup() {
  createCanvas(1360, 650);

  d1=createSprite(50,330);
  d1.addImage(d1Img);
  d1.scale=1;

  d2=createSprite(1300,330);
  d2.addImage(d2Img);
  d2.scale=1;

  ball=createSprite(695,325);
  ball.addImage(ballImg);
  ball.scale=0.2;

  start=createSprite(695,325);
  start.addImage(startImg);
  start.scale=2;

  logo=createSprite(2000,100);
  logo.addImage(logoImg);
  logo.scale=1;
  logo.velocityX=-5;
  logo.lifetime=500;

  won=createSprite(690,325);
  won.addImage(wonImg);
  won.scale=2;
  won.visible=false;

  loss=createSprite(690,275);
  loss.addImage(gameoverImg);
  loss.scale=1;
  loss.visible=false;

  restart=createSprite(690,345);
  restart.addImage(restartImg);
  restart.scale=1;
  restart.visible=false;

  replay=createSprite(690,550);
  replay.addImage(replayImg);
  replay.scale=1;
  replay.visible=false;

  
  paddle1=createSprite(350,330);
  paddle1.addImage(paddle1Img);
  paddle1.scale=0.5;

  paddle2=createSprite(1045,330);
  paddle2.addImage(paddleImg);
  paddle2.scale=0.5;
      
  g1=createSprite(680,5,1360,10);
  g2=createSprite(5,325,10,650);
  g3=createSprite(680,645,1360,10);
  g4=createSprite(1355,325,10,650);
  g5=createSprite(695,325,10,630);
  g5.depth=-1;
  g6=createSprite(350,325,10,630);
  g6.depth=-1;
  g7=createSprite(1045,325,10,630);
  g7.depth=-1;

  goal1=createSprite(1340,325,15,150);
  goal2=createSprite(20,325,15,150);

  g1.shapeColor="blue";
  g2.shapeColor="blue";
  g3.shapeColor="blue";
  g4.shapeColor="blue";
  g5.shapeColor="cyan";
  g6.shapeColor="cyan";
  g7.shapeColor="cyan";

  goal1.shapeColor="yellow";
  goal2.shapeColor="yellow";
  
  BlueTeamscore=0;
  RedTeamscore=0;
  
}

function draw() {
  background("black");

  fill("cyan");
  textSize(30);
  textFont("BlueTeamScore")
  text("BlueTeamScore: "+ BlueTeamscore, 425,50);

  fill("cyan");
  textSize(30);
  textFont("RedTeamScore")
  text("RedTeamScore: "+ RedTeamscore, 775,50);

 
  if(keyDown("UP")){
    paddle1.y = paddle1.y-10;
  }

  if(keyDown("DOWN")){
    paddle1.y = paddle1.y+10;
  }

  if(keyDown("RIGHT")){
    paddle1.x = paddle1.x+10;
  }

  if(keyDown("LEFT")){
    paddle1.x = paddle1.x-10;
  }

  if(ball.isTouching(goal1)){
    BlueTeamscore=BlueTeamscore+1;
    ball.x=695;
    ball.y=325;
    }

  if(ball.isTouching(goal2)){
    RedTeamscore=RedTeamscore+1;
    ball.x=695;
    ball.y=325;
    }

  if(mousePressedOver(start)){
    ball.velocityY=8;
    ball.velocityX=16;
    start.destroy();

  }
  paddle2.y = ball.y;


  if (ball.isTouching(paddle1)){
    water.play();
  }

  if (ball.isTouching(paddle2)){
    water.play();
  }

  if (ball.isTouching(g1)){
    water.play();
  }

  if (ball.isTouching(g3)){
    water.play();
  }

  if(BlueTeamscore >= 5){ 
     won.visible=true;
     replay.visible=true;
     ball.velocityX=0;
     ball.velocityY=0;
     ball.x=695;
     ball.y=325;
     paddle1.x=350;
     paddle1.y=330;
     paddle2.x=1045;
     paddle2.y=330;
  }

  if(RedTeamscore >= 5){ 
    loss.visible=true;
    restart.visible=true;
    ball.velocityX=0;
    ball.velocityY=0;
    ball.x=695;
    ball.y=325;
    paddle1.x=350;
    paddle1.y=330;
    paddle2.x=1045;
    paddle2.y=330;
 }


 
 if(mousePressedOver(restart)){
  reset();
 }

 if(mousePressedOver(replay)){
   won.visible=false;
   replay.visible=false;
   reset();
 }
  
  ellipse(695,325,350,350);
  fill("black")
  ellipse(695,325,330,330);

  ball.bounceOff(g1);
  ball.bounceOff(g2);
  ball.bounceOff(g3);
  ball.bounceOff(g4);
  ball.bounceOff(paddle1);
  ball.bounceOff(paddle2);

  paddle1.collide(g1);
  paddle1.collide(g2);
  paddle1.collide(g3);
  paddle1.collide(g4);
  paddle1.collide(g7);
  paddle1.collide(goal2);
  paddle1.collide(paddle2);

  paddle2.bounceOff(g1);
  paddle2.bounceOff(g2);
  paddle2.bounceOff(g3);
  paddle2.bounceOff(g4);
  paddle2.bounceOff(g6);
  paddle2.bounceOff(goal1);
  
  drawSprites();
}
  
function reset(){
  BlueTeamscore=0;
  RedTeamscore=0;
  loss.visible=false;
  restart.visible=false;
  ball.velocityY=8;
  ball.velocityX=16;
  ball.x=695;
  ball.y=325;
  paddle1.x=350;
  paddle1.y=330;
  paddle2.x=1045;
  paddle2.y=330;
}

