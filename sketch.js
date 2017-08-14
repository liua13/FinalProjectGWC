var beginPic;
var imgBegin;
var imgButton;
var start;
var imgClear; 

var bground;
var imgBack;
var mainSprite;
var randomItem;

var imgGood1;
var imgGood2;
var imgGood3;
var imgGood4; 

var imgAspen;
var imgDawn;
var imgLush;
var imgNeutro;

var imgLife;
var imgDeath; 
var life; 

var allItems;

class Product{
	constructor(name, x_pos, y_pos, imgURL, good) {
		this.name = name;
		this.object = createSprite(x_pos, y_pos);
		this.object.addImage(imgURL);
		this.good = good;
	}
}

class ProductList{
	constructor(){
		this.good = [];
		this.bad = [];
		this.goodScenery = [];
		this.okayScenery = [];
		this.badScenery = [];
		this.life = [];
	}
	
	addProduct(name, x_pos, y_pos, imgURL, good){
		var newProduct = new Product(name, x_pos, y_pos, imgURL, good);
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
	imgBegin = loadImage("images/start.png");
	imgButton = loadImage("images/play.png");	
	imgClear = loadImage("images/scenery/clear.png");
	
	imgLife = loadImage("images/life.png");
	imgDeath = loadImage("images/death.png");
	
	imgGood1 = loadImage("images/scenery/good_house1.png");
	imgGood2 = loadImage("images/scenery/good_house2.png");
	imgGood3 = loadImage("images/scenery/good_house3.png");
	imgGood4 = loadImage("images/scenery/good_house4.png");
	
	imgBack = loadImage("images/scenery/good_background.png");
	imgAspen = loadImage("images/products/aspen.png");
	imgDawn = loadImage("images/products/dawn.png");
	imgLush = loadImage("images/products/lush.png");
	imgNeutro = loadImage("images/products/neutro.png");
}
function setup() {
	createCanvas(577, 380);
	beginButton = createSprite(300, 100);
	
	beginGame();
	
	bground = createSprite(288, 190);
	bground.addImage(imgBack);
	
	allItems = new ProductList();
		
	allItems.addScenery("Good1", 198, 142, imgGood1, "good");
	allItems.addScenery("Good1", 509, 142, imgGood2, "good");
	allItems.addScenery("Good1", 699, 142, imgGood3, "good");
	allItems.addScenery("Good1", 1087, 142, imgGood4, "good");
	
	mainSprite = createSprite(50, 240, width/3, height/3);
	mainSprite.addAnimation("walk", "images/main/main_walk1.png", "images/main/main_walk2.png", "images/main/main_walk3.png", "images/main/main_walk2.png", "images/main/main_walk1.png", "images/main/main_walk4.png", "images/main/main_walk5.png", "images/main/main_walk4.png");
	mainSprite.addAnimation("jump", "images/main/main_jump.png");
	
	allItems.addProduct("Aspen", 4000, 261, imgAspen, true);
	allItems.addProduct("Dawn", 3000, 263, imgDawn, false);
	allItems.addProduct("Lush", 2000, 262, imgLush, true);
	allItems.addProduct("Neutro", 1000, 263, imgNeutro, false);
	
	allItems.addLife("Life1", 450, 30, imgLife);
	allItems.addLife("Life2", 500, 30, imgLife);
	allItems.addLife("Life3", 550, 30, imgLife);
		
	start = false; 
	
	if(!start){
		beginPic = createSprite(289, 190);
		beginPic.addImage(imgBegin);
		life = 0;
	}
}
function draw() {
	background(200);
	drawSprites();
	
	if(keyDown("space") & !start){
		start = true;
		beginPic.addImage(imgClear);
		alert(start);
	}
	
	if(keyDown("r")){
		alert(start);
	}
	
	if(start){
		if(keyDown("space")){
		  mainSprite.changeAnimation("jump");
		  jump();
		  
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
	up();
	
	setTimeout(function(){
		down();
		mainSprite.changeAnimation("walk");
	}, 350);
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
			allItems.good[i].object.position.x -= 5;
			allItems.bad[i].object.position.x -= 5;
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
			allItems.good[i].object.position.x = getRandom(800, 2500);
		}
		
		if(mainSprite.overlap(allItems.bad[i].object)){
			allItems.bad[i].object.position.x = getRandom(800, 2500);
			allItems.life[life].object.addImage(imgDeath);
			life += 1;
		}
	}
}

function die(){
	if (life > 2){
		//start = false;
		beginPic.addImage(imgBegin);
	}
}

function beginGame(){
	if(keyDown("space") & !start){
		start = true;
		beginPic.addImage(imgClear);
		alert(start);
	}
}