
let car;
let backgroundImage;
let countdown = 3;

mousedata=[];


function preload() {
  backgroundImage = loadImage('track1.png'); // Ensure the correct path to the image file
}

function setup() {
  createCanvas(1000, 1000);
  car = new Car();
}

function draw() {
  background(backgroundImage);
  mousedata.push([mouseX,mouseY,Date.now()]);

  car.update(mouseX, mouseY);
  car.display();

}

class Car {
  constructor() {
    this.x = width * 0.75; // Ensure the initial position is within canvas bounds
    this.y = height * 0.6; // Ensure the initial position is within canvas bounds
    this.width = 50;
    this.height = 20;
    this.color = color(255, 0, 0);
    this.alive = true;
  }

  update(targetX, targetY) {
    if (!this.alive) {
      this.reset();
      noLoop(); 
      setTimeout(function() {
      loop()
      }, 3000); 
      
    }
    // Check if the pixel color matches red or white
    let pixelColor = get(floor(this.x), floor(this.y));

    // Check if the pixel color matches red or white
    let redValue = red(pixelColor);
    let greenValue = green(pixelColor);
    let blueValue = blue(pixelColor);
    if ((redValue === 255 && greenValue === 255 && blueValue === 255) || (redValue === 189 && greenValue === 30 && blueValue === 45)) {
      this.die();
      return; // Call the die() function if the car intersects with red or white
    } else {
      this.speed = 0.05 * Math.sqrt((mouseX-this.x)*(mouseX-this.x)+(mouseY-this.y)*(mouseY-this.y)); // Continue moving the car
    }

    let dx = targetX - this.x;
    let dy = targetY - this.y;
    let angle = atan2(dy, dx);
    this.x += cos(angle) * this.speed;
    this.y += sin(angle) * this.speed;
  }

  die() {
    this.alive = false; // Set the alive flag to false to indicate that the car is dead
    this.x = width * 0.75; // Ensure the initial position is within canvas bounds
    this.y = height * 0.6;  // Reset the car's position to the center of the canvas
    this.alive = false; // Reset the car's position when it dies
    // Additional actions to perform when the car dies (e.g., stop movement, display message, etc.)
    console.log("Car died!");
  }

  reset() {
    this.x = width * 0.75; // Ensure the initial position is within canvas bounds
    this.y = height * 0.6;  // Reset the car's position to the center of the canvas
    this.alive = true; // Set the alive flag to true to indicate that the car is alive again
  }

  display() {
    //if (!this.alive) return; // If the car is dead, don't display it

    push();
    translate(this.x, this.y);
    rotate(atan2(mouseY - this.y, mouseX - this.x));
    fill(this.color);
    rectMode(CENTER);
    rect(0, 0, this.width, this.height);
    pop();
  }
}
