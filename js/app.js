// Enemies our player must avoid
let Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.speed = Math.floor(Math.random() * 100) + 125;
    this.x = Math.floor(Math.random() * (-183)) - 83;
    this.y = Math.random() * 170 + 50;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    //calculate new x coordinate
    let newX = this.x + this.speed * dt;

    // When enemy moves outside reset the enemy with new values
    if (newX >= 498) {
        this.x = -83;
        // get new y coordinat and speed for the enemy
        this.speed = Math.floor(Math.random() * 100) + 125;
        this.y = Math.random() * 170 + 50;
    }
    else
        this.x =  newX;
    //check for collision
    if((Math.abs(this.x - player.x) <= 70) && (Math.abs(this.y - player.y) < 52))
        player.reset();
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function() {
    this.x = 202;
    this.y = 415;
    this.sprite = 'images/char-boy.png';
}

// to get render method method from Enemy
Player.prototype = Object.create(Enemy.prototype);
Player.prototype.constructor = Player;

Player.prototype.update = function() {
    // show winner banner if the player reaches the top
    console.log(this.x, this.y);
    if(this.y < 23) {
        winner.style.visibility = 'visible';
    }

    // reset the game if player jums of the top.
    if(this.y < -40) {
        this.reset();
    }
}

Player.prototype.reset = function() {
    //hide the winner banner
    winner.style.visibility = 'hidden';
    this.y = 414;
    this.x = 202;
}

Player.prototype.handleInput = function(key) {
    switch(key) {
        case 'left':    this.x -= (this.x > 25) ? 25 : 0;               break;
        case 'right':   this.x += (this.x < 400) ? 25 : 0;              break;
        case 'up':      this.y -= 30;                                   break;
        case 'down':    this.y += (this.y < 400)? 30:0;                 break;
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



let allEnemies = [ new Enemy(), new Enemy(), new Enemy(), new Enemy(), new Enemy()];
let player = new Player()

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

// get winner banner
winner = document.getElementsByTagName('h1')[0];

