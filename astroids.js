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
    Render();
}

function Render() {
    
}