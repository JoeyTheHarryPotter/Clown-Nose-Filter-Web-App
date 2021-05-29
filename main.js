noseX = 0;
noseY = 0;

function preload(){
    clown_nose = loadImage('https://i.postimg.cc/yx2PVTPR/Clown-Nose-Transparent.png');
}

function setup(){
    canvas = createCanvas(300, 300);
    canvas.position(810, 200);
    video = createCapture(VIDEO);
    video.size(300, 300);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

classifier = ml5.imageClassifier('MobileNet', modelLoaded);

function draw(){
    image(video, 0, 0, 300, 300);

    // fill(60, 121, 171);
    // stroke(255, 215, 0);
    // circle(noseX, noseY, 20);
    image(clown_nose, noseX, noseY, 30, 30);
}

function take_snapshot(){
    save('my_filter_image.png');
}

function modelLoaded(){
    console.log("Pose Net Initialized!");
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);
        noseX = results[0].pose.nose.x - 15;
        noseY = results[0].pose.nose.y - 15;
        console.log("Nose X = " + noseX);
        console.log("Nose Y = " + noseY);
    }
}