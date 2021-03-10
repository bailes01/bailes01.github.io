

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
var frame = 0;
var scale = 1;
var still = true;
var grav = 2;
let bg = new Image();
var jump = false;

bg.src = './images/bg.png';

    

class Player{
    constructor(x,y){
        this.velx = 0;
        this.vely = 0;
        this.img_x = 768;
        this.img_y = 384;
        this.sections = getSections(768, 384 ,6,3);
        this.now_sections = this.sections['right'];
        this.x_sections = 6;
        this.y_sections = 3;
        this.section_size = this.img_y / this.y_sections;
        this.x = x;
        
        this.moving = "right";
        this.img = new Image();
        this.img.src = './images/endy2.png';
        
        this.y = height-this.section_size - 500;
        this.img.onload = function() {
            loop();
        };
    }
    draw(){
        var section = this.section;
        ctx.drawImage(this.img, section.x, section.y, section.xs, section.ys,this.x, this.y,  section.xs * scale, section.ys * scale);
        // ctx.drawImage(this.img, 100,100);
        frame += 1;
        frame %= 8;
    }

    update(){
        if (Key.isDown(Key.UP)) {
            this.moveUp();
        }
        if (Key.isDown(Key.LEFT)) {
            this.now_sections = this.sections["left"];
            this.section = this.now_sections[frame];
            this.moveLeft();
        }
        if (Key.isDown(Key.DOWN)) {
            this.moveDown();
        }
        if (Key.isDown(Key.RIGHT)) {
            this.now_sections = this.sections["right"];
            this.section = this.now_sections[frame];
            // this.section = this.sections["right"][frame];
            this.moveRight();
        }
        if(!(Key.isDown(Key.UP) || Key.isDown(Key.LEFT) || Key.isDown(Key.DOWN) || Key.isDown(Key.RIGHT))){
            this.section = this.now_sections[8];
        }

    }

    moveRight(){
        this.x +=8;
    }

    moveLeft(){
        this.x -=8;
    }
    
    
}

var Key = {
    _pressed: {},
  
    LEFT: 65,
    // UP: 87,
    RIGHT:  68,
    // d
    
    isDown: function(keyCode) {
        return this._pressed[keyCode];
    },
    
    onKeydown: function(event) {
        this._pressed[event.keyCode] = true;
    },
    
    onKeyup: function(event) {
        delete this._pressed[event.keyCode];
    }
  };

// Player.prototype.update = function(){
//     var section = this.sections[frame];
    


//     frame += 1;
//     frame %= 8;
// }



    


function Section(_x, _y, xs, ys){
    this.x = _x;
    this.y = _y;
    this.xs = xs;
    this.ys = ys;
}

function getSections(img_size_x, img_size_y, img_sections_x, img_sections_y){
    var sections = {};
    var left = [];
    var right = [];
    var x_section_size = Math.round(img_size_x/img_sections_x);
    var y_section_size = Math.round(img_size_y/img_sections_y);
    for (var y = 0; y < img_size_y; y += y_section_size){
        for (var x = 0; x < img_size_x/2; x += x_section_size){
            var section = new Section(x, y, x_section_size, y_section_size);
            right.push(section);
        }
    }
    for (var y = 0; y < img_size_y; y += y_section_size){
        for (var x = img_size_x - x_section_size; x >= img_size_x/2; x -= x_section_size){
            var section = new Section(x, y, x_section_size, y_section_size);
            console.log(section);
            left.push(section);
        }
    }
    sections['left'] = left;
    sections['right'] = right;
    return sections;
}


function drawBg(img_size){
    for (var y = 0; y < height; y += img_size){
        for (var x = 0; x < width; x += img_size){
            ctx.drawImage(bg, x, y);
            
        }
    }
}


function loop() {
    
    drawBg(32);
    player.update();
    player.draw();
    
    setTimeout(function() {
        requestAnimationFrame(loop);
    }, 1000/10);
}

var player = new Player(100,100);
window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);


// let spots = [];

// function Spot(x, y, color){
//     this.init_x = x;
//     this.init_y = y;
//     this.x = x;
//     this.y = y;
//     this.color = color;
// }

// function newSpot(init_x, init_y){
//     var color = "rgb("+random(10,200)+","+random(10,200)+","+random(10,200)+")";
//     console.log(color);
//     let spot = new Spot(init_x, init_y, color);
//     spots.push(spot);
// }

// Spot.prototype.draw = function(){
//     ctx.beginPath();
//     ctx.fillStyle = this.color;
//     ctx.arc(this.x,this.y, 2, 0, 2 * Math.PI);
//     ctx.fill();
// }

// Spot.prototype.update = function(){
//     var init_x = this.init_x / width;
//     var init_y = this.init_y / height;
//     this.x = init_x**2 - init_x*timeDiff + init_y*timeDiff - init_x;
//     this.y = init_y**2 - timeDiff**2 - init_x*init_y, init_y*timeDiff - init_y;
// }
