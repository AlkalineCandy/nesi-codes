
// Enemies our player must avoid
let allEnemies = []; //must be empty
let enemyNumber = 6; //can be easily changed for more enemies


const Player = function () { // features of the player
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 390;
    this.width = 101;
    this.height = 171;

    this.render = function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    this.handleInput = function (direction) { // implements what the arrow keys do, adds win scenario
        switch (direction) {
            case 'up':
                this.y = this.y > 0 ? this.y -= 85 : this.y -= 0;
                break;
            case 'down':
                this.y = this.y < 389 ? this.y += 85 : this.y += 0;
                break;
            case 'left':
                this.x = this.x > 0 ? this.x -= 100 : this.x += 0;
                break;
            case 'right':
                this.x = this.x < 400 ? this.x += 100 : this.x += 0;
                break;
            default:
                return;
        }

        if (this.y < 0) {
           alert("Congratulations! You won, now try again! :D");
        }
    }
}

Player.prototype.checkForCollision = function (enemyArray) { //collision detecter function, creates an array
    let collisionDetected = false;
    for (i = 0; i < enemyArray.length; i++) {
        if (this.x + 25 < enemyArray[i].x + enemyArray[i].width - 10 &&
            this.x + this.width - 10 > enemyArray[i].x &&
            this.y < enemyArray[i].y + enemyArray[i].height - 100 &&
            this.y + this.height - 100 > enemyArray[i].y)
            collisionDetected = true;
    }
    return collisionDetected;
}


Player.prototype.update = function () { // resets the game
    if (this.checkForCollision(allEnemies) || this.y < 0) {
        this.x = 200;
        this.y = 390;
    }
}

const player = new Player(); // initiates the game



const Enemy = function () {

    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images

    let enemyRows = [55, 142, 222]; // the y coordinates of he 3 rows in which the bugs will move

    this.sprite = 'images/enemy-bug.png';
    this.x = Math.random() - 95; // bugs start off-screen with their nose on-screen
    this.y = enemyRows[Math.floor(Math.random() * enemyRows.length)]; // bugs randomly appear in one of the rows
    this.width = 101; // dimensions of the bugs 
    this.height = 171;

    this.speed = 10 + Math.floor(Math.random() * 350); // speed randomly elected

    this.render = function () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }



};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.

    if (this.x > 500) {
        this.x = Math.random() - 95;
    } else {
        this.x += this.speed * dt;
    }

};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player



// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function (e) {
    e.preventDefault(); // prevents scrolling
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});


for (let i = 0; i < enemyNumber; i++) { // a loop for the easy handling of enemyNumber's 
    allEnemies.push(new Enemy());
}