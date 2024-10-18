/*To play, select the square that is a different color by typing the number that corresponds to the square. After 3 wrong answers, the game is over.
 */

//color variables
let c;
let r;
let g;
let b;
let lives=3;
var mode;
let score=0;

//makes each square an object
let s1, s2, s3, s4, s5, s6, s7, s8, s9;
let change;

function setup() {
  createCanvas(500, 500);
  textSize(50);
  background("white");
  noLoop();
  mode = 0;
}

function draw() {
  /* tutorial to make start page
  https://youtu.be/TgHhEzKlLb4
  mode 0-> start page
  mode 1-> begin game
  */
  
  if (mode == 0) {
    push();
    background ("purple");
    fill("white")
    text("Color Game", 120, 50);
    textSize(20);
    text("How to Play:", 20, 100);
    text("There are 9 colored squares,", 20, 125);
    text("but one is slightly different", 20, 150)
    
    text("Type the number that corresponds to the square ", 20, 200);
    text("that is a different color ", 20, 225);
    
    text("Press the up arrow to start the game", 20, 275);
    pop();
  } else if (mode == 1) {
    startGame();
  } //end draw loop
}
//makes square objects
class SQ {
  constructor(x, y, l, w) {
    //c = color(r, g, b);
    //fill(c);
    this.square = rect(x, y, l, w);
  }
}


function mousePressed() {
  /* Check if mouse is clicked inside square 1 (50, 50, 100, 100) */
  if (mouseX >= 50 && mouseX <= 150 && mouseY >= 50 && mouseY <= 150) {
    if (change == "s1") {
      correct();
    } else {
      incorrect();
    }
    endGame();
  }

  /* Check if mouse is clicked inside square 2 (200, 50, 100, 100) */
  if (mouseX >= 200 && mouseX <= 300 && mouseY >= 50 && mouseY <= 150) {
    if (change == "s2") {
      correct();
    } else {
      incorrect();
    }
    endGame();
  }

  /* Check if mouse is clicked inside square 3 (350, 50, 100, 100) */
  if (mouseX >= 350 && mouseX <= 450 && mouseY >= 50 && mouseY <= 150) {
    if (change == "s3") {
      correct();
    } else {
      incorrect();
    }
    endGame();
  }

  /* Check if mouse is clicked inside square 4 (50, 200, 100, 100) */
  if (mouseX >= 50 && mouseX <= 150 && mouseY >= 200 && mouseY <= 300) {
    if (change == "s4") {
      correct();
    } else {
      incorrect();
    }
    endGame();
  }

  /* Check if mouse is clicked inside square 5 (200, 200, 100, 100) */
  if (mouseX >= 200 && mouseX <= 300 && mouseY >= 200 && mouseY <= 300) {
    if (change == "s5") {
      correct();
    } else {
      incorrect();
    }
    endGame();
  }

  /* Check if mouse is clicked inside square 6 (350, 200, 100, 100) */
  if (mouseX >= 350 && mouseX <= 450 && mouseY >= 200 && mouseY <= 300) {
    if (change == "s6") {
      correct();
    } else {
      incorrect();
    }
    endGame();
  }

  /* Check if mouse is clicked inside square 7 (50, 350, 100, 100) */
  if (mouseX >= 50 && mouseX <= 150 && mouseY >= 350 && mouseY <= 450) {
    if (change == "s7") {
      correct();
    } else {
      incorrect();
    }
    endGame();
  }

  /* Check if mouse is clicked inside square 8 (200, 350, 100, 100) */
  if (mouseX >= 200 && mouseX <= 300 && mouseY >= 350 && mouseY <= 450) {
    if (change == "s8") {
      correct();
    } else {
      incorrect();
    }
    endGame();
  }

  /* Check if mouse is clicked inside square 9 (350, 350, 100, 100) */
  if (mouseX >= 350 && mouseX <= 450 && mouseY >= 350 && mouseY <= 450) {
    if (change == "s9") {
      correct();
    } else {
      incorrect();
    }
    endGame();
  }
}



/*after the condition to check if change equals the correct square
this will change the color of all the squares
*/
function correct() {
  r = random(255);
  b = random(255);
  g = random(255);
  c = color(r, g, b);
  score++;
  redraw();
  //console.log("dra3w");
}

/*after the condition to check if change equals the correct square  
if it is wrong it will subtract a life then change the color of all the squares
*/
function incorrect() {
  push();
  textSize(20);
  lives -= 1;
  fill("black");
  text("lives: " + lives, 300, 10, 100);
  text("score: " + score, 400, 10, 100);
  redraw();
  pop();
}

//function to end the game when there are no more lives left
function endGame() {
  if (lives == 0) {
    push();
    fill("red");
    rect(0, 0, 500, 500);
    fill("black");
    textSize(75);
    text("Game Over", 70, 70);
    textSize(30);
    text("Score: " + score, 170, 175);
    text("press the up arrow to play again ", 30, 300);
    pop();
    //starts game over without having to refresh
    mode=0;
    lives=3; 
    score=0;
  }
}

function keyPressed() {
  if (keyCode === UP_ARROW) {
    mode=1;
    startGame();
  } 
}

//all the code to play the game
function startGame() {
  clear();
  background("white");

  push();
  textSize(20);
  fill("black");
  //label squares
  text("1", 35, 75);
  text("2", 180, 75);
  text("3", 335, 75);
  text("4", 35, 225);
  text("5", 180, 225);
  text("6", 335, 225);
  text("7", 35, 375);
  text("8", 180, 375);
  text("9", 335, 375);
  text("lives: " + lives, 300, 20);
  text("score: " + score, 400, 20);
  pop();

  //set color
  r = random(255);
  b = random(255);
  g = random(255);
  c = color(r, g, b);
  fill(c);

  //test square
  //change ="s1";

  //pick a random square to change the color
  change = random(["s1", "s2", "s3", "s4", "s5", "s6", "s7", "s8", "s9"]);

  if (change == "s1") {
    //c="red";
    push();
    c = color(r, g + random(50), b);
    fill(c);
    s1 = new SQ(50, 50, 100, 100);
    pop();
  } else s1 = new SQ(50, 50, 100, 100);

  if (change == "s2") {
    push();
    c = color(r, g - 46, b + random(50));
    fill(c);
    s2 = new SQ(200, 50, 100, 100);
    pop();
  } else s2 = new SQ(200, 50, 100, 100);

  if (change == "s3") {
    push();
    c = color(r - random(50), g, b);
    fill(c);
    s3 = new SQ(350, 50, 100, 100);
    pop();
  } else s3 = new SQ(350, 50, 100, 100);

  if (change == "s4") {
    c = color(r + random(20), g, b + random(70));
    push();
    fill(c);
    s4 = new SQ(50, 200, 100, 100);
    pop();
  } else s4 = new SQ(50, 200, 100, 100);

  if (change == "s5") {
    c = color(r + 30, g - random(70), b);
    push();
    fill(c);
    s5 = new SQ(200, 200, 100, 100);
    pop();
  } else s5 = new SQ(200, 200, 100, 100);

  if (change == "s6") {
    c = color(r - random(60), g + 46, b + random(20));
    push();
    fill(c);
    s6 = new SQ(350, 200, 100, 100);
    pop();
  } else s6 = new SQ(350, 200, 100, 100);

  if (change == "s7") {
    c = color(r - random(70), g + 46, b);
    push();
    fill(c);
    s7 = new SQ(50, 350, 100, 100);
    pop();
  } else s7 = new SQ(50, 350, 100, 100);

  if (change == "s8") {
    c = color(r + 20, g, b + random(70));
    push();
    fill(c);
    s8 = new SQ(200, 350, 100, 100);
    pop();
  } else s8 = new SQ(200, 350, 100, 100);

  if (change == "s9") {
    c = color(r + 10, g + random(40), b + random(20));

    fill(c);
    s9 = new SQ(350, 350, 100, 100);
  } else s9 = new SQ(350, 350, 100, 100);
}
