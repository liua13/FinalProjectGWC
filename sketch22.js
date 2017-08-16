var start = false;
var pressed = false;

var beginPic;
var imgBegin;
var buttonPic;
var imgButton;
var imgClear; 
var imgRestart;
var imgReplay;

var imgScenery;
var mainSprite;

var bground;
var imgBackGood;
var imgBackOkay;
var imgBackBad;

var imgGood1;
var imgGood2;
var imgGood3;
var imgGood4; 

var imgOkay1;
var imgOkay2;
var imgOkay3;
var imgOkay4;

var imgBad1;
var imgBad2;
var imgBad3;
var imgBad4; 

var imgAspen;
var imgWindex;
var imgCastile;
var imgDawn;
var imgLush;
var imgNeutro;

var textAspen;
var textWindex;
var textCastile;
var textDawn;
var textLush;
var textNeutro;

var imgLife;
var imgDeath; 
var life = 0; 

var allItems;
var info;
var jumpVar = 0;

class Product{
	constructor(name, x_pos, y_pos, imgURL, good) {
		this.name = name;
		this.object = createSprite(x_pos, y_pos);
		this.object.addImage(imgURL);
		this.good = good;
		this.info = ""
	}
}

class ProductList{
	constructor(){
		this.good = [];
		this.bad = [];
		this.life = [];
		this.goodScenery = [];
	}
	
	addProduct(name, x_pos, y_pos, imgURL, good, infoURL){
		var newProduct = new Product(name, x_pos, y_pos, imgURL, good);
		newProduct.info = infoURL;
		if (newProduct.good){
			this.good.push(newProduct);
		} else {
			this.bad.push(newProduct);
		}
	}
	
	addScenery(name, x_pos, y_pos, imgURL, level){
		var newProduct = new Product(name, x_pos, y_pos, imgURL, level);
		if (newProduct.good == "good"){
			this.goodScenery.push(newProduct);
		} else if (newProduct.good == "okay"){
			this.okayScenery.push(newProduct);
		} else {
			this.badScenery.push(newProduct);
		}
	}
	
	addLife(name, x_pos, y_pos, imgURL){
		var newProduct = new Product(name, x_pos, y_pos, imgURL, true);
		this.life.push(newProduct);
	}
}

function preload() {
	imgBegin = loadImage("images/scenery/start.png");
	imgButton = loadImage("images/play.png");	
	imgRestart = loadImage("images/scenery/restart.png");
	imgReplay = loadImage("images/replay.png");
	imgClear = loadImage("images/scenery/clear.png");
	
	imgLife = loadImage("images/life.png");
	imgDeath = loadImage("images/death.png");
	
	imgGood1 = loadImage("images/scenery/good_house1.png");
	imgGood2 = loadImage("images/scenery/good_house2.png");
	imgGood3 = loadImage("images/scenery/good_house3.png");
	imgGood4 = loadImage("images/scenery/good_house4.png");
	
	imgOkay1 = loadImage("images/scenery/okay_house1.png");
	imgOkay2 = loadImage("images/scenery/okay_house2.png");
	imgOkay3 = loadImage("images/scenery/okay_house3.png");
	imgOkay4 = loadImage("images/scenery/okay_house4.png");
	
	imgBad1 = loadImage("images/scenery/bad_house1.png");
	imgBad2 = loadImage("images/scenery/bad_house2.png");
	imgBad3 = loadImage("images/scenery/bad_house3.png");
	imgBad4 = loadImage("images/scenery/bad_house4.png");
	
	imgBackGood = loadImage("images/scenery/good_background.png");
	imgBackOkay = loadImage("images/scenery/okay_background.png");
	imgBackBad = loadImage("images/scenery/bad_background.png");
	
	imgAspen = loadImage("images/products/aspen.png");
	imgWindex = loadImage("images/products/windex.png");
	imgDawn = loadImage("images/products/dawn.png");
	imgCastile = loadImage("images/products/castile soap.png");
	imgLush = loadImage("images/products/lush.png");
	imgNeutro = loadImage("images/products/neutro.png");
	
	textAspen = loadImage("images/scenery/text_aspen.png");
	textWindex = loadImage("images/scenery/text_windex.png");
	textDawn = loadImage("images/scenery/text_dawn.png");
	textCastile = loadImage("images/scenery/text_castile.png");
	textLush = loadImage("images/scenery/text_lush.png");
	textNeutro = loadImage("images/scenery/text_neutro.png");
}

function setup() {
	createCanvas(577, 380);
	beginButton = createSprite(300, 100);
	
	bground = createSprite(288, 190);
	bground.addImage(imgBackGood);
	
	allItems = new ProductList();
		
	allItems.addScenery("Good1", 198, 142, imgGood1, "good");
	allItems.addScenery("Good1", 509, 142, imgGood2, "good");
	allItems.addScenery("Good1", 699, 142, imgGood3, "good");
	allItems.addScenery("Good1", 1087, 142, imgGood4, "good");
	
	info = createSprite(width/2, 185);
	info.addImage(imgClear);
	
	allItems.addProduct("Aspen", 3000, 261, imgAspen, true, textAspen);
	allItems.addProduct("Windex", 4200, 262, imgWindex, false, textWindex);
	
	allItems.addProduct("Castile Soap", 3700, 263, imgCastile, true, textCastile);
	allItems.addProduct("Dawn", 2400, 263, imgDawn, false, textDawn);

	allItems.addProduct("Lush", 1700, 262, imgLush, true, textLush);
	allItems.addProduct("Neutro", 1000, 263, imgNeutro, false, textNeutro);
	
	allItems.addLife("Life1", 450, 30, imgLife);
	allItems.addLife("Life2", 500, 30, imgLife);
	allItems.addLife("Life3", 550, 30, imgLife);
	
	mainSprite = createSprite(50, 240, width/3, height/3);
	mainSprite.addAnimation("walk", "images/main/main_walk1.png", "images/main/main_walk2.png", "images/main/main_walk3.png", "images/main/main_walk2.png", "images/main/main_walk1.png", "images/main/main_walk4.png", "images/main/main_walk5.png", "images/main/main_walk4.png");
	mainSprite.addAnimation("jump", "images/main/main_jump.png");
	mainSprite.addAnimation("die", "images/main/main_sad.png");
	
	imgScenery = [[imgBackGood, imgBackOkay, imgBackBad], [imgGood1, imgGood2, imgGood3, imgGood4], [imgOkay1, imgOkay2, imgOkay3, imgOkay4], [imgBad1, imgBad2, imgBad3, imgBad4]];
	
	if(!start){
		beginPic = createSprite(289, 190);
		beginPic.addImage(imgBegin);
		buttonPic = createSprite(300, width/2);
		buttonPic.addImage(imgButton);
	}
}

function draw() {
	background(200);
	drawSprites();

	beginGame();
	
	if(start){		
		jump();
		
		if(keyDown("space")){
			jumpVar += 1;
		} else {
			jumpVar = 0;
		}
		
		offObject();
		moveObject();
		
		offScenery();
		moveScenery();
		
		objectCollide();
		die();
	}
}

function jump(){
	if(keyDown("space") && jumpVar <= 45-(life*1.75)){
		up();
		mainSprite.changeAnimation("jump");
	} else {
		down();
		mainSprite.changeAnimation("walk");
	}
}

function up(){
	var speed = 2;
	while(mainSprite.position.y >= 180){
		mainSprite.position.y -= speed;
		speed -=0.02;
	}
}

function down(){
	var speed = 0;
		while(mainSprite.position.y <= 240){
			speed += 0.02;
			mainSprite.position.y += speed;
		}
}

function getRandom(min, max){
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function offObject(){
	for(var i = 0; i < allItems.good.length; i++){
		if(allItems.good[i].object.position.x <= 25){
			allItems.good[i].object.position.x = getRandom(800, 2500);
		}
		
		if(allItems.bad[i].object.position.x <= 25){
			allItems.bad[i].object.position.x = getRandom(800, 2500);
		}
	}
}

function moveObject(){
	setTimeout(function(){
		for(var i = 0; i < allItems.good.length; i++){
			allItems.good[i].object.position.x -= (life + 1)*3;
			allItems.bad[i].object.position.x -= (life + 1)*3;
		}
	}, 100);
}

function offScenery(){
	var begin = [-196, -115, -74, -315];
	var end = [1207, 1289, 1331, 1090];
	for(var i = 0; i < allItems.goodScenery.length; i++){
		if(allItems.goodScenery[i].object.position.x <= begin[i]){
			allItems.goodScenery[i].object.position.x = end[i];
		}
	}
}

function moveScenery(){
	setTimeout(function(){
		for(var i = 0; i < allItems.goodScenery.length; i++){
			allItems.goodScenery[i].object.position.x -= 2;
		}
	}, 100);
}

function objectCollide(){
	for(var i = 0; i < allItems.good.length; i++){
		if(mainSprite.overlap(allItems.good[i].object)){
			allItems.good[i].object.position.x = getRandom(800, 6000);
			info.addImage(allItems.good[i].info);
			
			setTimeout(function(){
				info.addImage(imgClear);
			}, 1500);
		}
		
		if(mainSprite.overlap(allItems.bad[i].object)){
			allItems.bad[i].object.position.x = getRandom(800, 6000);
			allItems.life[life].object.addImage(imgDeath);
			info.addImage(allItems.bad[i].info);
			
			setTimeout(function(){
				info.addImage(imgClear);
			}, 1500);
			
			if (life < 2){
				bground.addImage(imgScenery[0][life+1]);
				for(var i = 0; i < allItems.goodScenery.length; i++){
					allItems.goodScenery[i].object.addImage(imgScenery[life+2][i]);
				}
			}
			life += 1;
		}
	}
}

function die(){
	if (life > 2 && start){
		start = false;
		mainSprite.changeAnimation("die");
		setTimeout(function(){
			beginPic.addImage(imgRestart);
			buttonPic.addImage(imgReplay);
		}, 1000);
	}
}

function beginGame(){
	if(!start && pressed){
		life = 0;
		start = true;
		mainSprite.changeAnimation("walk");
		beginPic.addImage(imgClear);
		buttonPic.addImage(imgClear);
		bground.addImage(imgBackGood);
		
		for(var i = 0; i < allItems.life.length; i++){
			allItems.life[i].object.addImage(imgLife);
		}
		
		for(var i = 0; i < allItems.goodScenery.length; i++){
			allItems.goodScenery[i].object.addImage(imgScenery[1][i]);
		}
		
		pressed = false;
	}
}

function mousePressed(){
	var distance = dist(mouseX, mouseY, 300, width/2);
	if (distance < 80){
		pressed = true;
	}
}