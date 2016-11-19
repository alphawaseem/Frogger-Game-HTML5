// Enemies our player must avoid

 //Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min;
}

class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    // row : num of rows b/w 1-3 
    // sets the enemy starting position based upon row number
    setStartPosition(){
        this.row = getRandomInt(1,4);
        let x , y ;
        if(this.row==1){
            x = -101;
            y = 60 ;
        } else if( this.row==2) {
            x = -101;
            y = 73*2 ;
        } else {
            x =-101;
            y = 75*3;
        }
        this.x = x;
        this.y = y;
        this.left = this.x + 2;
        this.right = this.x + 99;
        this.top = this.y + 79;
        this.bottom = this.y + 141;
    }

    // set the speed of the bugs
    setSpeed(){
        this.speed = getRandomInt(25,350);
    }

    // reset the bug to start position and reset to new speed
    reset(){
        this.setSpeed();
        this.setStartPosition();
    }
    constructor(){
        this.sprite = 'images/enemy-bug.png';
        this.reset();
    }
   
   // detect collision using AABB collision method
    catchPlayer(player){
        if(!(this.left>player.right ||
            this.right<player.left||
            this.top>player.bottom||
            this.bottom<player.top)){
            player.setStartPosition();
        }
    }
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if(this.x < 506){
            this.x = this.x + this.speed * dt;
            this.left = this.x + 17;
            this.right = this.x + 83;
        }
        else {
            this.reset();
        }
    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    
}

// 
const xOffset = 100; 
const yOffset = 82;

//start boundary of canvas
const startBoundary = 1;
//end boundary of canvas
const endBoundary = 401;

// set the char sprite based on level
let charSprites = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
]
class Player {
    
    //set starting position of player
    setStartPosition(){
        
        this.y = endBoundary;
        this.x = startBoundary;
        this.left = this.x + 17;
        this.right = this.x + 83;
        this.top = this.y + 63;
        this.bottom = this.y + 137;
        this.row = 0;
    }

    //reset the player position to start
    reset(){
        this.setStartPosition();
    }
    constructor(){
        this.sprite = charSprites[level];
        this.setStartPosition();
    }

    //move player left by xOffset
    moveLeft(){
        if(this.x > startBoundary){
            this.x = this.x - xOffset ;
            this.left = this.x + 17;
        }
    }

    //move player right by xOffset
    moveRight(){
        if(this.x < endBoundary){
            this.x = this.x + xOffset;
            this.right = this.x + 83;
        }
    }

    //move player Down by yOffset
    moveDown(){
        if(this.y < endBoundary){
            this.y = this.y + yOffset;
            this.bottom = this.y+137;
            if(this.row>0){
                this.row--;
            }
        }
    }

    //move player up by yOffset
    moveUp(){
        if(this.y > startBoundary){
            this.y = this.y - yOffset;
            this.top = this.y + 63;
            if(this.row<=5){
                this.row++;
            }
        }
    }

    // update the player position
    update(){
        this.left = this.x + 17;
        this.right = this.x + 83;
        this.top = this.y + 63;
        this.bottom = this.y + 137;
        if(player.row == 5){ // reached to water
            player.reset(); // reset the player position
            gotoNextLevel();
        }
    }

    //draw the player
    render(){
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    //handle the input
    handleInput(keyCode){
        if(keyCode == 'left'){
            this.moveLeft();
        } else if(keyCode == 'right') {
            this.moveRight();
        } else if ( keyCode == 'down') {
            this.moveDown();
        } else if (keyCode == 'up'){
            this.moveUp();
        }
    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

let numOfBugs = 6; // number of bugs in the game
let level = 0; // level of the game
let allEnemies;

function gotoNextLevel(){
    if(level<6){
        level++; // increase the level after reaching to water
        numOfBugs++;// increase no of bugs
        player.sprite = charSprites[level]; // set new char sprite
        populateBugs(); // popuplate bugs
        if(level<5)
            $(".level-heading").text(`Level ${level+1}`);
        else
            $(".level-heading").text('Thank you soo much!!! You saved us!');
    }
}
function populateBugs(){
    allEnemies=[];
    for(let i=0;i<numOfBugs;i++){
        allEnemies.push(new Enemy());
    }
}
populateBugs();
let player = new Player();


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
