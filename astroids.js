let canvas;
let ctx; // context to draw and work with canvas
let canvasWidth = 1280;
let canvasHeight = 720;
let keys = []; // stores all the keyboard keys that we need

document.addEventListener('DOMContentLoaded', setupCanvas); // execute when the page is loaded

function setupCanvas() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    document.body.addEventListener('keydown', function(e) {
        keys[e.keyCode] = true;
    });

    document.body.addEventListener('keyup', function(e) {
        keys[e.keyCode] = false;
    });

    render();
}
class Ship {
    constructor() {
        this.visible = true;
        this.x = canvasWidth / 2;
        this.y = canvasHeight / 2;
        this.movingForward = false;
        this.speed = 0.1;
        this.velX = 0;
        this.velY = 0;
        this.rotateSpeed = 0.001;
        this.radius = 15; // drawing circle inside a circle
        this.angle = 0;
        this.strokeColor = 'white';
    }

    rotate(dir) {
        this.angle += this.rotateSpeed * dir;
    }

    update() {
        // handle rotating and moving ship
        let radians = this.angle / Math.PI * 180; // degree -> radians
        if(this.movingForward) {
            this.velX += Math.cos(radians) * this.speed;
            this.velY += Math.sin(radians) * this.speed;
        }
        if(this.x < this.radius) {
            this.x = canvas.width;
        }
        if(this.x > canvas.width) {
            this.x = this.radius;
        }
        if(this.y < this.radius) {
            this.y = canvas.height;
        }
        if(this.y > canvas.height) {
            this.y = this.radius;
        }

        this.velX *= 0.99;
        this.velY *= 0.99;

        this.x -= this.velX;
        this.y -= this.velY;
    }

    draw() {
        ctx.strokeStyle = this.strokeColor;
        ctx.beginPath();
        let vertAngle = ((Math.PI *2) / 3); // 1/3 circle
        let radians = this.angle / Math.PI * 180;
        for(let i = 0; i < 3; i++) {
            ctx.lineTo(
                this.x - this.radius * Math.cos(vertAngle * i + radians),
                this.y - this.radius * Math.sin(vertAngle * i + radians)
            );
        }
        ctx.closePath();
        ctx.stroke();
    }

}

let ship = new Ship();

function render() {
    ship.movingForward = (keys[87]); // W key
    if(keys[68]) { // D key
        ship.rotate(1); // rotate right
    }
    if(keys[65]) { // A key
        ship.rotate(-1); // rotate right
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height); // clear screen
    ship.update();
    ship.draw();
    requestAnimationFrame(render); // run render() infitit
}