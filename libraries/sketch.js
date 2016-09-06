var img
var smallPoint = 6;
var largePoint = 10;
var spotsPerStep = 500;
var currentDrawCount = spotsPerStep;
var currentPointSize = largePoint;
var opacity = function () { return random(255) };
var scaleFactor = 1;

function preload() {
    img = loadImage("/me4.jpg")
}

function setup() {
    createCanvas(img.width * scaleFactor, img.height * scaleFactor)
    noStroke();
    background(200);
    img.loadPixels;
}

function randomOffset(maxOffset) {
    return random(maxOffset * 2) - maxOffset
}

function draw() {
    if (currentDrawCount > 0) {
    scale(scaleFactor)
        for (var i = 0; i < 50; i++) {
            var x = floor(random(img.width))
            var y = floor(random(img.height))

            var offsetx = randomOffset(currentPointSize*2)
            var offsety = randomOffset(currentPointSize*2)
            var pixel = img.get(x, y)

            stroke(pixel[0], pixel[1], pixel[2], opacity());
            push()
            for (var j = 1; j <= 3; j++) {
                var delta = currentPointSize/j
                strokeWeight(delta)
                translate(x, y)
                line(offsetx, offsety, 0, 0)

                x = offsetx
                y = offsety
                offsetx = randomOffset(delta)
                offsety = randomOffset(delta)
            }
            pop()
        }
        currentDrawCount--;
    } else {
        if (currentPointSize > smallPoint) {
            currentDrawCount = spotsPerStep;
            currentPointSize--
        } else {
            noLoop()
        }
    }
}