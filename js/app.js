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

    // row : num of row b/w 1-3 
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
    }

    setSpeed(){
        this.speed = getRandomInt(25,200);
    }
    reset(){
        this.setSpeed();
        this.setStartPosition();
    }
    constructor(){
        this.sprite = 'images/enemy-bug.png';
        this.reset();
    }
   
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update(dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        if(this.x < 506)
            this.x = this.x + this.speed * dt;
        else {
            this.reset();
        }

    }

    // Draw the enemy on the screen, required method for game
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    
}


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    update(){}
    render(){}
    handleInput(){}
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [new Enemy(),new Enemy(), new Enemy(),new Enemy(),new Enemy(),new Enemy(),new Enemy()];
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
