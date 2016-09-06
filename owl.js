var owlcount = 20
var wiggleBounds = 0//0.5
var owls = new Array(owlcount)
var hearts = new Array()
var bgColor
function windowResized(){
    resizeCanvas(windowWidth, windowHeight)
}

function setup() {
    // create canvas
    createCanvas(windowWidth, windowHeight);
    bgColor = randomColor()
    for (var i = 0; i < owlcount; i++) {
        var x = random(width)
        var y = random(height)
        var color = randomColor()
        var scalar = random(0.5, 2.0)
        owls[i] = new owl(x, y, color, scalar)
    }
}

function easeInOutQuad(t) { return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t }
function easeInOutQuint(t){return t<0.5?16*t*t*t*t*t : 1+16*(--t)*t*t*t*t}
function easeInQuad(t){return t*t}
function easeOutQuad(t){return t*(2-t)}

function randomColor() {
    return [random(210, 255), random(180, 140), random(135, 220)]
}

function draw() {
    background(bgColor)
    for (var i = 0; i < owlcount; i++) {
        var currentOwl = owls[i]
        currentOwl.wiggle()
        var randomint = int(random(0, 5000))
        if (randomint == 33) {
            currentOwl.roll();
        }
        if(randomint == 55){
//            hearts.push(new heart(currentOwl.x, currentOwl.y))
        }
        currentOwl.draw()
    }

    for(var i=0;i<hearts.length;i++){
        var currentHeart = hearts[i]
        if(currentHeart.currenty > 0){
            currentHeart.draw();
        }else{
            hearts.splice(currentHeart)
        }
    }
}

function heart(x,y){
    this.x = x;
    this.y = y;
    this.scalefactor = random(0.05, 0.25)

    this.currentx = x-0.0001;
    this.currenty = y-0.0001;

    this.draw = function(){
    //var unitx = this.currentx / 20
    //var offsetx = easeInOutQuad(unitx)

    var unity = 1-(this.currenty / this.y)
    var offsety = easeOutQuad(unity)
    this.currenty = (1-offsety) * this.y

    //this.currentx = this.currentx - 1
    //this.currenty = this.currenty - 1
    //this.currenty = offsety

    push()
    translate(this.currentx,this.currenty)
    scale(this.scalefactor)
    fill('red')
    noStroke()
    ellipse(100,100,100,100)
    ellipse(170,100,100,100)
    triangle(52,115,  135,250,  218,115)

        pop()
    }
}

function owl(x, y, g, s) {
    this.x = x;
    this.y = y;
    this.color = g;
    this.size = s;
    this.wigglex = 0;
    this.nosescrunch = 0;
    this.eyeroll = 0;
    this.angle = 0;
    this.rollin = false;
    this.wigglin = false;
    this.hearts = false;

    this.wiggle = function(){
        this.wigglin = true;
    }

    this.roll = function () {
        this.rollin = true;
    }

    this.draw = function () {
        push()
        if (this.rollin) {
            this.angle = (this.angle + 5);
            if (this.angle > 360) {
                this.angle = 0;
                this.rollin = false;
            }
        }else if(this.wigglin){

        }
        translate(this.x + this.wigglex, this.y)
        //map input to [0,1]
        var input = this.angle / 360
        var output = easeInOutQuint(input)
        var degrees = output * 360
        var rads = radians(degrees)
        rotate(rads)
        scale(this.size)
        stroke(this.color)
        strokeWeight(70)
        line(0, -35, 0, -65)
        noStroke()
        fill(255 - this.color)
        ellipse(-17.5, -65, 35, 35)//left dome
        ellipse(17.5, -65, 35, 35)//right dome
        arc(0, -65, 70, 70, 0, PI)
        fill(g)
        ellipse(-14 + this.eyeroll, -65 + this.nosescrunch, 8, 8)//left eye
        ellipse(14 + this.eyeroll, -65 + this.nosescrunch, 8, 8)//right eye
        quad(0, -58 + this.nosescrunch, 4, -51 + this.nosescrunch, 0, -44 + this.nosescrunch, -4, -51 + this.nosescrunch)//beak
        pop()
    }
}
