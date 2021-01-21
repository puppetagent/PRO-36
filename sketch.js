var dog, happyDog, database, foodS, foodStock, food;

var dog1Img, dog2Img;

var feed,addFood;

var fedTime,lastFed;

var foodObj;

var bedroom, garden, washroom;

var readState;

var currentTime;

var sadDog ; 

var gameState = "happy";

function preload()
{
  //dog1Img = loadImage("images/Dog.png");
  //dog2Img = loadImage("images/happy dog.png");
  bedroom = loadImage("images/Bed Room.png");
  garden = loadImage("images/Garden.png");
  washroom = loadImage("images/Wash Room.png");
  sadDog = loadImage("images/Dog.png");
  }


function setup() {
  createCanvas(800,800);

  database = firebase.database();

  foodObj = new Food();

  foodStock = database.ref('food');
  foodStock.on("value",readStock);

  readState=database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  });

  dog = createSprite(300,300,10,10);
  //dog.addImage(dog1Img);
  dog.scale=0.5;

  feed = createButton("Feed the Dog");
  feed.x=700;
  feed.y=95;
  feed.mousePressed(feedDog);

  addFood = createButton("Add Food");
  addFood.x=800;
  addFood.y=95;
  addFood.mousePressed(addFoods);

}


function draw() {  
  background("green");

    if(gameState!=="Hungry") {
      feed.hide();
      addFood.hide();
      dog.remove();
    }else{
      feed.show();
      addFood.show();
      dog.addImage(sadDog);
    }

  fedTime = database.ref('feedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });

        fill(255,255,254);
        textSize(15);
        
    if(lastFed>=12){
      text("Last Feed: "+lastFed%12 +" PM",350,30);
    } else if (lastFed === 0){
      text("Last Feed: 12 PM",350,30);
    } else {
      text("Last Feed: "+lastFed +" PM",350,30);
    }

    currentTime = hour();
    
    if (currentTime==(lastFed+1)){
      update("Playing");
      foodObj.garden();
    }else if (currentTime==(lastFed+2)) {
      update("Sleeping");
      foodObj.bedroom();
    }else if (currentTime==(lastFed+2) && (currentTime<=(lastFed+4))){
      update("Bathing");
      foodObj.washroom();
    }else{
      update("Hungry");
      foodObj.display();
    }

    drawSprites();
  
  //milk.display();
}

function feedDog () {
  //dog.addImage(dog2Img);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime: hour()
  })

}

function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

function readStock (data) {
  foodS=data.val();
  foodObj.updateFoodStock(foodS)
}

function writeStock (x) {
  if(x<=0){
    x = 0;
  }else{
    x=x-1;
  }
   database.ref('/').update({
     food:x
   })

}

function update(state) {
  database.ref('/').update ({
    gameState : state
  })
}