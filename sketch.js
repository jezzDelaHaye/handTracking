// Hand Pose Detection with ml5.js — pinch to grab and drag a rect

let video;
let handPose;
let hands = [];

let rectX, rectY;
const RECT_SIZE = 50;

let grabbed = false;
const PINCH_THRESHOLD = 30;
const GRAB_RADIUS = 30;

function preload() {
  handPose = ml5.handPose({ flipped: true });
}

function gotHands(results) {
  hands = results;
}

function setup() {
  createCanvas(640, 480);
  rectX = width / 2;
  rectY = height / 2;
  video = createCapture(VIDEO, { flipped: true });
  video.hide();
  handPose.detectStart(video, gotHands);
}

function draw() {
  background(0);
  image(video, 0, 0);

  let isPinching = false;
  let pointX, pointY;

  if (hands.length > 0) {
    for (let hand of hands) {
      if (hand.confidence > 0.1) {

        let thumbTip = hand.keypoints[4];
        let indexTip = hand.keypoints[8];
        let pinchDist = dist(thumbTip.x, thumbTip.y, indexTip.x, indexTip.y);

        if (pinchDist < PINCH_THRESHOLD) {
          isPinching = true;
          pointX = (indexTip.x + thumbTip.x) / 2;
          pointY = (indexTip.y + thumbTip.y) / 2;
        }

        for (let i = 0; i < hand.keypoints.length; i++) {
          let keypoint = hand.keypoints[i];

          if (i > 0) {
            stroke(255);
            strokeWeight(2);
            let lastKeyPoint = hand.keypoints[i - 1];
            line(keypoint.x, keypoint.y, lastKeyPoint.x, lastKeyPoint.y);
          }

          noStroke();
          if (hand.handedness == "Left") {
            fill(255, 0, 255);
          } else {
            fill(255, 255, 0);
          }
          circle(keypoint.x, keypoint.y, 16);
        }
      }
    }
  }

  if (isPinching) {
    if (!grabbed) {
      if (abs(rectX - pointX) < GRAB_RADIUS && abs(rectY - pointY) < GRAB_RADIUS) {
        grabbed = true;
      }
    }
    if (grabbed) {
      rectX = pointX;
      rectY = pointY;
    }
  } else {
    grabbed = false;
  }

  rectMode(CENTER);
  noStroke();
  if (grabbed) {
    fill(255, 200, 0);
  } else {
    fill(255);
  }
  rect(rectX, rectY, RECT_SIZE, RECT_SIZE);
}

function keyPressed() {
  if (keyCode === 32) {
    rectX = width / 2;
    rectY = height / 2;
    grabbed = false;
  }
}