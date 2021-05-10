var bg1,bg2;
var aladdin,aladdin_img;
var jasmine,jasmine_img;
var jaffar, jaffar_img;
var gini,gini_img;
var carpet, carpet_img;
var play,play_img;
var reset,reset_img;
var edges;
var gameOver,gameOver_img;
var coin,coin_img,coinGroup;
var rock,rockGroup,rock1_img,rock2,rock2Group,rock2_img;
var fire,fire_img,fireGroup;
var conffeti,conffeti_img;
var congrats,congrats_img;
var coinSound,dieSound,fireSound,jumpSound,resetSound,winSound;

var score = 0;
var lives = 3;

var gameState = "start";

function preload(){
    bg_img = loadImage("images/bg0.jpg");
    bg_img1 = loadImage("images/bg1.jpg");
    bg_img2 = loadImage("images/bg2.jpg");
    aladdin_img = loadImage("image/Aladdin.png");
    jasmine_img = loadImage("images/jasmine.png");
    jaffar_img = loadImage("images/jaffar.png");
    gini_img = loadImage("images/genie.png");
    carpet_img = loadImage("images/carpet.jpg");
    play_img = loadImage("images/play Button.jpg");
    rock1_img = loadImage("images/rock1.jpg");
    rock2_img = loadImage("images/rock2.jpg");
    star_img = loadImage("images/star.jpg");
    coin_img = loadImage("images/coin.jpg");
    gameOver_img = loadImage("images/game over.jpg");
    reset_img = loadImage("images/reset.png");
    fire_img = loadImage("images/fire.jpg");
    conffeti_img = loadImage("images/conffeti.jpg");
    congrats_img = loadImage("images/congras.png");

    coinSound = loadSound("Sounds/coin.mp3");
    dieSound = loadSound("Sounds/die.mp3");
    fireSound = loadSound("Sounds/fire.mp3");
    jumpSound = loadSound("Sounds/jump.mp3");
    resetSound = loadSound("Sounds/reset.mp3");
    winSound = loadSound("Sounds/win.mp3");
}
function setup(){
    createCanvas(windowWidth,windowHeight);
    edges = createEdgeSprite();

    //for start and start function
    setStart();
    //level1
    setLevelOne();
    //level2
    setLevelTwo();
    //end
    setEnd();
    }
function draw(){
    background("black");
    drawSprite();

    if(gameState === "Start"){
        startState();
    }

    //level 1
    if(gameState === "LevelOne"){
        playLevelOne();
    }

    //level 2
    if(gameState === "LevelTwo"){
        playLevelTwo();
    }

    //level end
    if(gameState === "end"){
        endState();
    }

    //level end 2
    if(gameState === "End2"){
        end2State();
    }

    //win
    if(gameState === "Win"){
        Win();
    }
}

function startState(){
    textSize(25);
    fill(254,180,21);
    stroke("white");
    text("instructions: 1. Use arrow keys to move Aladdin \n 2. Avoid rock and reach score 1000 \n 3. Save Jasmine from jaffar",width/2-25);
    bg1.visible = true;
    carpet.visible = true;
    gini.visible = true;
    aladdin.visible = true;
    play.visible = true;

    if(mousePressedOver(play)){
        resetSound.play();
        clear();
        gameState = "LevelOne";
    }
}

function setStart(){
    bg = createSprite(width/2,height/2,width,height);
    bg.addImage(bg_img);
    bg.visible = false;

    carpet = createSprite(width/2-400,height/2+250);
    carpet.addImage(carpet_img);
    carpet.scale = 0.5;
    carpet.visible = false;

    gini = createSprite(width/2+400,height/2);
    gini.addImage(gini_img);
    gini.scale = 0.5;
    gini.visible = false;
    
    play = createSprite(width/2,height/2+125);
    play.addImage(play_img);
    play.scale = 0.15;
    play.visible = false;
}

function setLevelOne(){
    bg1 = createSprite(width/2,height/2-350,width,height);
    bg1.addImage(bg_img1);
    bg1.scale = 3.5;
    bg1.visible = false;

    carpet1 = createSprite(width/2-650,height-50);
    carpet1.addImage(carpet_img);
    carpet1.setCollider("rectangle",0,-30,carpet.width-100,carpet.height-300);
    carpet1.scale = 0.4;
    carpet1.visible = false;

    aladdin1 = createSprite(width/2-650,height-100);
    aladdin1.scale = 0.1;
    aladdin1.addImage(aladdin_img);
    aladdin1.visible = false;

    invisibleGround = createSprite(width/2,height-30,width,30);
    invisibleGround.visible = false;

    rockGroup = new Group();
    rock2Group = new Group();
    coinGroup = new Group();
}
function playLevelOne(){
    bg1.visible  =true;
    carpet1.visible = true;
    aladdin1.visible = true;
    textSize(25);
    textStyle(BOLD);
    fill(0);
    text("score: "+ score,width-200,100);
    text("level 1",width/2,50);

    if(keyDown(UP_ARROW)){
        aladdin1.velocityY = -10;
        carpet1.velocityY = -10;
    }

    if(keyDown(LEFT_ARROW)){
        aladdin1.x = aladdin1.x-5;
        carpet1.x = carpet1.x-5;
    }

    if(keyDown(RIGHT_ARROW)){
        aladdin1.x = aladdin1.x+5;
        carpet1.x = carpet1.x+5;
    }

   aladdin1.velocityY = aladdin1.velocityY+0.5;
   carpet1.velocityY = aladdin1.velocityY;

   carpet1.collide(edges);
   aladdin1.collide(edges);
   carpet1.collide(invisibleGround);
   aladdin1.collide(carpet1);

   if(score === 1000){
       clear();
       rockGroup.destroyEach();
       rock2Group.destroyEach();
       coinGroup.destroyEach();
       gameState = "LevelTwo";
   }

   for(var i = 0; i< coinGroup.length; i++){
       if(coinGroup.get(i).isTouching(aladdin1)){
           coinSound.play();
           coinGroup.get(i).remove;
           score = score+100;
       }
   }
   if(rockGroup.isTouching(aladdin1) || rock2Group.isTouching(aladdin1)){
       dieSound.play();
       gameState = "End";
   }
   rocks();
   createCoins();
}

function rocks(){
    if(frameCount%100 === 0){
        rock = createSprite(width,Math.round(random(50,height-350)),20,20);
        rock.addImage(rock1_img);
        rock.scale = 0.1;
        rock.velocityX = -5;
        rock.lifetime = 300;

        rock2 = createSprite(width,Math.round(random(50,height-350)),20,20);
        rock2.addImage(rock2_img);
        rock2.scale = 0.4;
        rock2.velocityX = -5;
        rock2.lifetime = 300;

        rockGroup.add(rock);
        rock2Group.add(rock2);
    }
}

function createCoins(){
    if(frameCount%100 === 0){
        coin = createSprite(width,Math.round(random(50,width-100)),-50,20,20);
        coin.addImage(coin_img);
        coin.scale = 0.1;
        coin.velocityY = 3;
        coin.lifetime = 300;
        coinGroup.add(coin);
    }
}

function setLevelTwo(){
    bg2 = createSprite(width/2,height/2-350,width,height);
    bg2.addImage(bg_img2);
    bg2.visible = false;
    bg2.scale = 3;

    carpet2 = createSprite(width/2-650,height-50);
    carpet2.addImage(carpet_img);
    carpet2.setCollider("rectangle",0,-30,carpet.width-100,carpet.height-300);
    carpet2.scale = 0.4;
    carpet2.visible = false;

    aladdin2 = createSprite(width/2-650,height-100);
    aladdin2.addImage(aladdin_img);
    aladdin2.scale = 0.2;
    aladdin.visible = false;

    invisibleGround2 = createSprite(width/2,height-30,width,30);
    invisibleGround2.visible = false;

    jaffar = createSprite(width-150,height/2,50,50);
    jaffar.addImage(jaffar_img);
    jaffar.scale = 0.5;
    jaffar.visible = false;

    jasmine = createSprite(width-300,height-100,50,50);
    jasmine.addImage(jasmine_img);
    jasmine.scale = 0.2;
    jasmine.visible = false;

    fireGroup = new Group();
}
function playLevelTwo(){
    bg2.visible = true;
    carpet2.visible = true;
    aladdin2.visible = true;
    jaffar.visible = true;
    jasmine.visible = true;

    jaffar.bounceOff(invisibleGround2);
    jaffar.velocityY = 4;

    textSize(25);
    textStyle(BOLD);
    fill(255);
    text("lives" + lives,width/2-700,100);
    text("level 2 ",width/2,50);

    if(keyDown(UP_ARROW)){
        aladdin2.velocityY = -10;
        carpet2.velocityY = -10;
    }

    if(keyDown(LEFT_ARROW)){
        aladdin2.x = aladdin2.x-5;
        carpet2.x = carpet2.x-5;
    }

    if(keyDown(RIGHT_ARROW)){
        aladdin2.x = aladdin2.x+5;
        carpet2.x = carpet2.x+5;
    }

    aladdin2.velocityY = aladdin2.velocityY+0.5;
    carpet2.velocityY = aladdin2.velocityY;

    carpet2.collide(edges);
    aladdin2.collide(edges);
    carpet2.collide(invisibleGround2);
    aladdin.collide(carpet2);

    if(lives === 0){
        dieSound.play();
        gameState = "End2";
    }

for(var i = 0;i<fireGroup.length;i++){
    if(fireGroup.get(i).isTouching(aladdin2)){
        dieSound.play();
        fireSound.get(i).remove();
        lives--;
    }
    }
    if(carpet2.isTouching(jasmine)){
        winSound.play();
        gameState = "Win";
    }

    createFire();
}

function createFire(){
    fire = createSprite(width-150,Math.round(random(50,height,50)),75,20);
    fire.velocityX = -25;
    fire.addImage(fire_img);
    fire.scale = 0.2;
    fire.lifetime = 500;
    jaffar.y = fire.y;
    fireGroup.add(fire);
    fireSound.play();
}
function setEnd(){
    gameOver = createSprite(width/2,height/2-100,100,100);
    gameOver.addImage(gameOver_img);
    gameOver.scale = 2;
    gameOver.visible = false;

    reset = createSprite(width/2,height/2,100,100);
    reset.addImage(reset_img);
    reset.scale = 0.5;
    reset.visible = false;
}
function endState(){
    rockGroup.destroyEach();
    rock2Group.destroyEach();

    coinGroup.destroyEach();

    aladdin2.setVelocity(0,0);
    carpet2.setVelocity(0,0);

    gameOver.visible = true;
    reset.visible = true;

    if(mousePressedOver(reset)){
        resetSound.play();
        score = 0;
        gameState = "LevelOne";
        gameOver.visible = false;
        reset.visible = false;
    }
}
function end2State(){
    fireGroup.destroyEach();

    aladdin2.setVelocity(0,0);
    carpet2.setVelocity(0,0);
    jaffar.setVelocity(0,0);

    gameOver.visible = true;
    reset.visible = true;

    if(mousePressedOver(reset)){
        resetSound.play();
        lives = 3;
        score = 0;
        gameState = "LevelOne";
        gameOver.visible = false;
        reset.visible = false;
    }
}
function win(){
    fireGroup.destroyEach();
    aladdin2.setVelocity(0,0);
    carpet2.setVelocity(0,0);
    
    jaffar.visible = false;
    reset.visible = true;

    if(frameCount% 15 === 0){
        conffeti = createSprite(Math.round(random(50,width-100)),-10,100,100);
        conffeti.addImage(conffeti_img);
        conffeti.scale = 0.2;
        conffeti.velocityY = 5;
    }
    imageMode(CENTER);
    image(congrats_img,width/2,height/2-150,500,300);

    if(mousePressedOver(reset)){
        resetSound.play();
        location.reload();
        
    }
}