

let ctx = document.getElementById('mon_canvas').getContext("2d");
let projectile;
let interval;
let gameTimerInterval;
let canon;
let target;
let score = 0;
let fighter = document.getElementById('fighter');
let targetEnemy = document.getElementById('target');
let gameTimer = 0; 
let speed = 10;
let state = 0;

//returns a random integer from 1 to val
function randNumber(val){
    return Math.floor(Math.random() * val) + 1;   
}

function resetGame(){
    gameTimer = 0;
    score = 0;
    clearInterval(interval);
    
}

function Timer(time){
    
}

function text(x,y,txt,size,font,color){
    ctx.fillStyle = color;//'#ff0000'
    ctx.font = size + ' ' + font;
    ctx.fillText(txt, y, x);
}

class Target {
    constructor(width, height) {
        this.xPos = -10;
        this.yPos = -10;
        this.width = width;
        this.height = height;
    }
    drow(x,y){
/*         this.xPos = x;
        this.yPos = y;
        ctx.fillStyle = '#ff0000';
        ctx.beginPath();
        ctx.rect(x, y, this.width, this.height);
        ctx.fill(); */
        this.xPos = x;
        this.yPos = y;
        ctx.drawImage(targetEnemy, x, y, this.width, this.height);
    }
    collides(projectile){
        if (this.xPos < projectile.xPos + (projectile.radius * 2)  &&
            this.xPos + this.width > projectile.xPos &&
            this.yPos < projectile.yPos + (projectile.radius * 2) &&
            this.yPos + this.height > projectile.yPos){
            return  true;// collision detected!
        } else {
            return false;// no collision detected!
        }
    } 


}
// class for projectile
class Projectile {
    constructor(xPos, yPos, radius) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.radius = radius;
    }
    move(xOffset, yOffset){
        
        this.xPos += xOffset;
        this.yPos += yOffset;
    }
    drow(){
        ctx.fillStyle = '#ffffff';
        ctx.beginPath();
        ctx.arc(this.xPos, this.yPos, this.radius,Math.PI * 2,false);
        ctx.fill();
    }
    shoot(speed){        
            interval = setInterval(()=>{
                if(this.yPos > 0){ 
                    ctx.clearRect(this.xPos - this.radius, this.yPos - this.radius, this.radius * 2, this.radius * 2);
                    projectile.move(0, -speed);
                    projectile.drow();
                    if(target.collides(projectile) === true){
                        score++;
                        console.log("you hit me");
                        ctx.clearRect(0, 0, 1000, 50);
                        ctx.clearRect(target.xPos, target.yPos, target.width, target.height);
                        text(40,500,'Score ' + score + '   Time : ' + gameTimer + 's', '32px', 'sans-serif', '#ff0000');
                        target.drow(randNumber(930), 50 + randNumber(510));
                    }else{
                        console.log("you missed")
                    }
                }else{
                    clearInterval(interval);
                    this.yPos = 635;
                }
            },5);
        
    }
    
}

//class for canon
class Canon {
    constructor(xPos, yPos, width, height) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.width = width;
        this.height = height;
    }
    move(xOffset, yOffset){
        ctx.clearRect(this.xPos, this.yPos, this.width, this.height);
        this.xPos += xOffset;
        this.yPos += yOffset;
        canon.drow();
    }
    drow(){
        //ctx.fillStyle = '#b8b500';
        //ctx.beginPath();
        //ctx.rect(this.xPos, this.yPos, this.width, this.height);
        //ctx.fill();
        ctx.drawImage(fighter, this.xPos, this.yPos, this.width, this.height);
    }
}
function game(){
    gameTimerInterval = setInterval(() => {

        gameTimer++;
        ctx.clearRect(0, 0, 1000, 50);
        text(40,500,'Score ' + score + '   Time : ' + gameTimer + 's', '32px', 'sans-serif', '#ff0000');
}, 1000);

// create a target
target = new Target(60,30);
target.drow(randNumber(930), 50 + randNumber(510));

// create a canon
canon = new Canon(195,645,40,60);
canon.drow();

// create a projectile
projectile = new Projectile(215,635,4);
}

// detect spaseBar key strokes
document.addEventListener('keydown', (k) => {
    if(k.keyCode === 32){
        // clear interval if any
        clearInterval(interval);
        projectile.shoot(speed);
    }
    console.log(k.keyCode)
});

document.addEventListener("keydown", (k) => {
    if(k.code === "ArrowLeft") {

        canon.move(-10,0);
        projectile.move(-10,0);
        
    } else if(k.code === "ArrowRight") {
        canon.move(10,0);
        projectile.move(10,0);
        
    }
}); 

document.getElementById('restartBtn').addEventListener('click',()=>{
    
    resetGame();
    
});

document.getElementById('startBtn1').addEventListener('click',()=>{
    if(state == 0){
    game();
    state = 1;
    console.log("startBtn");
    }
    
});



