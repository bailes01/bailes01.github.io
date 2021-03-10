

const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;
var frame = 0;
var lastFrame = 0;
var scale = 1;
var meter = 64;
var still = true;
var grav = 9.8;
let bg = new Image();
var jump = false;
var frameToRender = 0;
bg.src = './images/bg.png';

    

class Player{
    constructor(x,y){
        this.velx = 0;
        this.vely = 0;
        this.img_x = 768;
        this.img_y = 384;
        this.walkVel = 3;
        this.sections = getSections(768, 384 ,6,3);
        this.now_sections = this.sections['right'];
        this.x_sections = 6;
        this.y_sections = 3;
        this.section_size = this.img_y / this.y_sections;
        this.x = x;
        
        this.moving = "right";
        this.img = new Image();
        this.img.src = './images/endy2.png';
        
        this.y = (height-this.section_size);
        this.img.onload = function() {
            loop();
        };
    }
    draw(){
        var section = this.section;
        ctx.drawImage(this.img, section.x, section.y, section.xs, section.ys,this.x, this.y,  section.xs * scale, section.ys * scale);
        // ctx.drawImage(this.img, 100,100);
        
        
        

    }

    update(sec){
        if (Key.isDown(Key.LEFT)) {
            this.now_sections = this.sections["left"];
            this.section = this.now_sections[frame];
            this.moveLeft(sec);
        }
        if (Key.isDown(Key.DOWN)) {
            this.moveDown();
        }
        if (Key.isDown(Key.RIGHT)) {
            this.now_sections = this.sections["right"];
            this.section = this.now_sections[frame];
            // this.section = this.sections["right"][frame];
            this.moveRight(sec);
        }
        if(!(Key.isDown(Key.UP) || Key.isDown(Key.LEFT) || Key.isDown(Key.DOWN) || Key.isDown(Key.RIGHT))){
            this.section = this.now_sections[8];
        }
        if (Key.isDown(Key.RIGHT) && Key.isDown(Key.LEFT)){
            this.section = this.now_sections[8];
        }
        if(this.y + this.section_size < height){
            this.section = this.now_sections[8];
            this.fall(sec);
        }else{
            if (Key.isDown(Key.SPACE)) {
                this.jump(sec);
            }
        }
    }
    fall(sec){
        this.vely += grav *  sec;
        if (this.y + this.vely* sec * meter + this.section_size > height){
            this.y = height - this.section_size;
        }else{
            this.y += this.vely * sec * meter;
        }
        
    }
    jump(sec){
        this.vely = -4.55;
        this.y += this.vely* sec * meter;
    }
    moveRight(sec){
        this.x +=this.walkVel * sec * meter;
    }

    moveLeft(sec){
        this.x -=this.walkVel * sec * meter;
    }
    
    
}

var Key = {
    _pressed: {},
  
    LEFT: 65,
    SPACE: 32,
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
    var thisLoop = new Date();
    var sec =  (thisLoop - lastLoop)/1000;
    var framesec = (thisLoop-lastFrame)/1000;
    if (framesec > 1/(player.walkVel*8)){
        player.update(framesec);
        frame +=1;
        lastFrame = thisLoop;
    }
    frame %= 8;
    lastLoop = thisLoop;
    
    player.draw();
    
    setTimeout(function() {
        requestAnimationFrame(loop);
    }, 1000/60);
}
var lastLoop = new Date();
var player = new Player(100,100);
window.addEventListener('keyup', function(event) { Key.onKeyup(event); }, false);
window.addEventListener('keydown', function(event) { Key.onKeydown(event); }, false);



