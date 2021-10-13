let target;
let chaser;

function setup() {
  createCanvas(windowWidth, windowHeight);

  target = new targetMover(); //assign new instances of the target and chaser objects
  chaser = new chaserMover();
  background(0, 255);
}

function draw() {
  background(0, 255);
  target.update(); //call the methods for animating the target and chaser, as well as generate output for both
  chaser.update(target.x, target.y); //send into the chaser methods the location of target from target method
}

function targetMover() {
  this.x = width / 2;
  this.y = height / 2;
  this.xt = random(width);
  this.yt = random(height);
  this.speed = 0.03;

  this.update = function () {
    if (random() < 0.025) {
      this.xt = random(width);
      this.yt = random(height);
    }
    this.x = lerp(this.x, this.xt, this.speed);
    this.y = lerp(this.y, this.yt, this.speed);
    push();
    stroke(200, 200, 255, 255);
    strokeWeight(32);
    point(this.x, this.y);
    pop();
  };
}

//particle system that chase target when it's close. the chases move slower that the target so so target will pull away from them, making them stop chasing.
function chaserMover() {
  this.x = []; //declare arrays to hold the position of chaser's system
  this.y = [];
  this.speed = [];
  this.quant = 250;
  this.d = height * 0.1; //how close before chasing?

  for (let i = 0; i < this.quant; i++) {
    //cycle through the quantity of particles and assign an initial state to the array elements.
    this.x.push(random(width));
    this.y.push(random(height));
    this.speed.push(random(0.005, 0.03));
  }

  this.update = function (xt, yt) {
    //generate the movement and output for the chaser objects. The update methods receives the location of the target.
    for (let i = 0; i < this.quant; i++) {
      let d = dist(xt, yt, this.x[i], this.y[i]);
      if (d < this.d) {
        this.x[i] = lerp(this.x[i], xt, this.speed[i]);
        this.y[i] = lerp(this.y[i], yt, this.speed[i]);
        push();
        stroke(150, 150, 175, 255);
        strokeWeight(3);
        line(this.x[i], this.y[i], xt, yt);
        stroke(0, 0, 255, 255);
        strokeWeight(16);
        point(this.x[i], this.y[i]);
        pop();
      } else {
        push();
        stroke(0, 0, 255, 255);
        strokeWeight(8);
        point(this.x[i], this.y[i]);
        pop();
      }
    }
  };
}
