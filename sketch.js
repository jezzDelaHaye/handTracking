// Hand Pose Detection with ml5.js
// https://thecodingtrain.com/tracks/ml5js-beginners-guide/ml5/hand-pose

let video;
let handPose;
let hands = [];
let rectX;
let rectY;


function preload() {
  handPose = ml5.handPose({ flipped: true });
}

function mousePressed() {
  //log(hands);
}

function gotHands(results) {
  hands = results;
}

function setup() {
  createCanvas(640, 480);
  rectX = width/2
    rectY = height/2
  video = createCapture(VIDEO, { flipped: true });
  video.hide();
  handPose.detectStart(video, gotHands);
}

function draw() 
{
  background(0);
  image(video, 0, 0);
  fill(255)
  rectMode(CENTER)
  rect(rectX,rectY,50)

  if (hands.length > 0) {
    for (let hand of hands) {
      if (hand.confidence > 0.1) {

        // --- Pinch detection: thumb tip (4) + index tip (8) ---
        let thumbTip = hand.keypoints[4];
        let indexTip = hand.keypoints[8];
        let pinchDist = dist(thumbTip.x, thumbTip.y, indexTip.x, indexTip.y);

        if (pinchDist < 30) 
        {
            let pointX = (indexTip.x + thumbTip.x)/2
            let pointY = (indexTip.y + thumbTip.x)/2
           fill(random(255),random(255),random(255))
            if (abs(rectX - pointX) < 30 && abs(rectY - pointY) < 250) 
            {
                rectX = pointX
                rectY = pointY
            }
        }
        // -----------------------------------------------------

        for (let i = 0; i < hand.keypoints.length; i++) {
          let keypoint = hand.keypoints[i];

          if (hand.handedness == "Left") {
            //fill(255, 0, 255);
          } else {
            //fill(255, 255, 0);
          }

          if (i > 0) {
            strokeWeight(2);
            let lastKeyPoint = hand.keypoints[i - 1];
            line(keypoint.x, keypoint.y, lastKeyPoint.x, lastKeyPoint.y);
          }

          strokeWeight(0);
          circle(keypoint.x, keypoint.y, 16);
        }
      }
    }
  }
}

function keyPressed()
{
    if (keyCode === 32)
    {
        rectX = width/2
        rectY = height/2
    }
}