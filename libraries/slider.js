var rSlider, gSlider, bSlider, aSlider;
var captureButton, fullscreenButton;
var capture;
var x = 700;
var y = 500;
var img;
var showCam = true

function windowResized(){
    resizeCanvas(windowWidth, windowHeight)
}

function setup() {
    // create canvas
    createCanvas(windowWidth, windowHeight);
    textSize(15)
    noStroke();

    // create sliders
    rSlider = createSlider(0, 255, 100);
    rSlider.position(20, 20);
    gSlider = createSlider(0, 255, 0);
    gSlider.position(20, 50);
    bSlider = createSlider(0, 255, 255);
    bSlider.position(20, 80);
    aSlider = createSlider(0, 255, 128);
    aSlider.position(20, 110);

    //create buttons
    captureButton = createButton('capture');
    captureButton.mousePressed(capture);
    captureButton.position(20, 140)
    fullscreenButton = createButton('fullscreen');
    fullscreenButton.mousePressed(fullscreen);
    fullscreenButton.position(20, 170)

    //create webcam capture
    capture = createCapture(VIDEO)
    capture.size(windowWidth, windowHeight);
    capture.hide()
}

function capture(){
    if(showCam){
        capture.loadPixels()
        showCam = false
    }
}

function fullscreen(){
    fullscreen(true)
}

function draw() {
    if(!showCam){
        updatePixels()
    }
    image(capture, 0,0, windowWidth, windowHeight)
    var r = rSlider.value();
    var g = gSlider.value();
    var b = bSlider.value();
    var a = aSlider.value();
    background(r, g, b, a);
    text("red", 165, 35);
    text("green", 165, 65);
    text("blue", 165, 95);
    text("opacity", 165, 125);
}