let moles = [];
let score = 0;
let timeLeft = 30;
let intervals = [];
let speed = 1;
let acceleration = 0.3; // Initial acceleration
let maxMoles = 2; // Starting limit for moles
let mouseData = []; // Array to store mouse movements

function preload(){
    gardenImage = loadImage('garden.avif');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  intervals.push(setInterval(generateMole, Math.round(600 + 400 / speed)));
}

function draw() {
  background(gardenImage);
  textSize(20);
  fill(0);
  text(`Score: ${score}`, 10, 30);
  text(`Time Left: ${Math.round(timeLeft)}`, 10, 60);

  // Display moles and remove them if their time expires
  for (let i = moles.length - 1; i >= 0; i--) {
    moles[i].display();
    if (moles[i].time <= 0) {
      moles.splice(i, 1);
    }
  }

  // For the first 20 seconds: Linear difficulty increase
  if (timeLeft > 10 && frameCount % 120 === 0) {
    speed += acceleration;
    maxMoles = min(5, maxMoles + 1); // Gradually increase mole limit up to 5
    clearInterval(intervals[0]);
    intervals[0] = setInterval(generateMole, Math.round(5000 / speed));
  }

  // For the last 10 seconds: Exponential difficulty increase
  if (timeLeft <= 10 && frameCount % 60 === 0) {
    speed *= 1.5; // Exponentially increase speed
    maxMoles = min(7, maxMoles + 1); // Allow up to 7 moles
    clearInterval(intervals[0]);
    intervals[0] = setInterval(generateMole, Math.round(4000 / speed)); // Faster mole generation
  }

  // Reduce time left
  timeLeft -= 1 / frameRate();
  if (timeLeft <= 0) {
    clearInterval(intervals[0]);
    timeLeft = 0;
    text('Game Over :)', width / 2 - 50, height / 2);
    saveMouseData(); // Save the mouse movement data as a CSV at the end of the game
  }
}

// Log mouse movements
function mouseMoved() {
  let timestamp = millis(); // Get the timestamp in milliseconds
  mouseData.push({ x: mouseX, y: mouseY, time: timestamp, speed: speed });
}

function generateMole() {
  if (moles.length < maxMoles) { // Limit the number of moles on screen
    let mole = new Mole(random(width), random(height));
    moles.push(mole);
  }
}

function mousePressed() {
  if (timeLeft > 0) { // Only allow clicking when the game is still active
    for (let mole of moles) {
      if (dist(mouseX, mouseY, mole.x, mole.y) < mole.size / 2) {
        score++;
        mole.hit();
      }
    }
  }
}

class Mole {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.size = 70;
    this.time = 3; // Display time in seconds
  }
  
  display() {
    fill(139, 69, 19); // Brown color for mole
    ellipse(this.x, this.y, this.size);
    fill(255); // White color for mole's eyes
    ellipse(this.x - 10, this.y - 10, 10);
    ellipse(this.x + 10, this.y - 10, 10);
    fill(0); // Black color for pupils
    ellipse(this.x - 10, this.y - 10, 5);
    ellipse(this.x + 10, this.y - 10, 5);
    this.time -= 1 / frameRate();
  }
  
  hit() {
    this.time = 0; // Remove mole after being hit
  }
}

// Save the mouse data as CSV
function saveMouseData() {
  let csvContent = "data:text/csv;charset=utf-8,";
  csvContent += "x,y,timestamp,speed\n"; // Header
  mouseData.forEach(function(row) {
    csvContent += `${row.x},${row.y},${row.time},${row.speed}\n`;
  });
  let encodedUri = encodeURI(csvContent);
  let link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", "mouse_data.csv");
  document.body.appendChild(link);
  link.click(); // This will download the CSV file
}
