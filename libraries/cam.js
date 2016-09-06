var img;

function setup() {
    createCanvas(720, 480);
    img = createCapture();
    img.hide();
}

function draw() {
    image(img, 0, 0, width, height);
    filter(POSTERIZE, 5)
}