class Food{
    constructor() {
        this.foodStock=0;
        this.lastFed;
        this.image = loadImage("images/milk.png");
    }
      
      display(){

        var x = 80,y=100;

        imageMode(CENTER);
        image(this.image,720,220,70,70);
        //image(this.image, 0, 0, this.width, this.height);

        if(this.foodStock!==0){
          for(var i = 0 ; i <this.foodStock;i++){
            if(i%10==0){
              x = 80;
              y=y+50;
            }
              image(this.image,x,y,50,50);
              x = x + 30;
          }
          
        }
      }

      getFoodStock () {
        return this.foodStock
    } 
    
    updateFoodStock (foodStock) {
    
      this.foodStock=foodStock;
    }
     
    getFedTime (lastFed) {
      this.lastFed=lastFed;
    }

    deductFood () {
      if(this.foodStock > 0){
        this.foodStock = this.foodStock - 1;
    }
  }

  update(state){
    database.ref('/').update({
        gameState: state
    });
  }

  bedroom(){
    background(bedroom,800,800);
  }

  garden(){
    background(garden,800,800);
  }

  washroom() {
    background(washroom,800,800);
  }

}