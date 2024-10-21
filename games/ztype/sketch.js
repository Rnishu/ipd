const WORDS = [
    "apple", "zebra", "quartz", "jump", "vex", "kite", "dog", "fox", "yellow", "wizard",
    "python", "java", "react", "flutter", "binary", "keyboard", "mouse", "screen", "logic",
    "matrix", "network", "algorithm", "packet", "queue", "data", "vector", "pixel", "gamma",
    "omega", "delta", "hacker", "secure", "encryption", "debug", "compile", "execute",
    "cache", "disk", "memory", "thread", "input", "output", "buffer", "syntax", "function",
    "variable", "constant", "operator", "control", "loop", "condition", "stack", "heap",
    "recursion", "optimize", "complex", "simplify", "divide", "multiply", "subtract",
    "addition", "random", "sorted", "unordered", "linked", "array", "graph", "tree",
    "vertex", "node", "edge", "cycle", "loop", "binary", "decimal", "hexadecimal",
    "octal", "bitwise", "shift", "xor", "and", "or", "not", "modulus", "increment",
    "decrement", "absolute", "sqrt", "power", "factorial", "prime", "range", "string",
    "char", "boolean", "true", "false", "null", "undefined", "exception", "throw",
    "catch", "finally", "import", "export", "module", "require", "define", "asynchronous",
    "callback", "promise", "resolve", "reject", "async", "await", "render", "component",
    "props", "state", "lifecycle", "context", "refactor", "test", "debug", "build",
    "deploy", "server", "client", "request", "response", "api", "json", "xml",
    "schema", "query", "database", "table", "record", "field", "primary", "foreign",
    "join", "index", "key", "lookup", "binary", "hash", "encryption", "decryption",
    "security", "certificate", "firewall", "attack", "defense", "exploit", "patch",
    "update", "version", "backup", "restore", "virtual", "container", "docker",
    "kubernetes", "cloud", "aws", "azure", "gcp", "hosting", "domain", "dns",
    "route", "gateway", "ip", "address", "protocol", "tcp", "udp", "http", "https",
    "socket", "session", "cookie", "token", "oauth", "authentication", "authorization",
    "ssl", "tls", "secure", "encryption", "hash", "public", "private", "key", "signature",
    "checksum", "digest", "cipher", "aes", "rsa", "sha256", "md5", "bcrypt", "salt",
    "randomize", "entropy", "complexity", "efficiency", "scalability", "performance",
    "latency", "throughput", "bandwidth", "load", "balancer", "concurrency", "parallel",
    "thread", "asynchronous", "synchronous", "process", "execution", "scheduler",
    "priority", "queue", "task", "job", "worker", "threadpool", "idle", "active",
    "block", "wait", "signal", "interrupt", "mutex", "semaphore", "lock", "deadlock",
    "race", "condition", "threadsafe", "nonblocking", "polling", "timeout"
];

let keyData = []; // Array to hold keystroke data
var focus; // Astroid the player is currently typing out
var field = [];

var score = 0;

var planetCrust; // color of crust
var planetMantle; // color of mantle

let speed = 1;        // Initial speed
let acceleration = 10;  // How much speed increases over time (can adjust this to fit the difficulty curve)

var ship; // color of ship

function preload() {
    backgroundImage = loadImage('space.avif'); // Ensure the correct path to the image file
    boogieImage = loadImage('boogie.png');
}

function setup() {

    createCanvas(windowWidth - 20, windowHeight - 20);

    planetCrust = randomColor();
    planetMantle = randomColor();
    ship = randomColor();

    field.push(new Asteroid(random(width - 150) + 75, 0, random(WORDS), randomColor()));

    focus = null;
}

function draw() {

    background(backgroundImage);

    drawBase();
    drawLazer();
    drawScore();
    handleField();

    if (frameCount % 60 == 0) {
        speed += acceleration;
    }
}

/**
 * updates & draws Astroids
 * manages field array
 * increments score
 * manages focus
 * creates Asteroids
 */
function handleField() {

    for (var i = field.length - 1; i >= 0; i--) {

        field[i].update();

        if (field[i].intact) {
            // astroid is still on-screen

            field[i].draw();
        } else {
            // Astroid has been destroyed

            score += field[i].text.length;
            field.splice(i, 1); // delete from array
            focus = null;
        }
    }

    /* attempt new Astroid */
    if (frameCount % 60 === 0) { // every second

        if (random() > map(speed, 0, 1000, 0.8, 0.01)) { // more difficult as game progresses

            field.push(new Asteroid(random(width - 150) + 75, 0, random(WORDS), randomColor()));
        }
    }
}

/**
 * handles user input
 */
function keyPressed() {

    let keyPressedData = {
        key: String.fromCharCode(keyCode).toLowerCase(), // Capture the key pressed
        timestamp: Date.now(), // Capture the current time in milliseconds
        speed: speed // Store the current speed
    };

    // Store the key data in the array
    keyData.push(keyPressedData);

    if (focus) {
        focus.erode(keyCode);
    } else {
        focus = findAsteroid(keyCode, field);

        if (focus) {
            focus.erode(keyCode);
        }
    }
}

/**
 * draws planet as a rectangle
 * draws "ground control" as a triangle
 */
function drawBase() {

    // /* planet */
    fill(planetMantle);
    stroke(planetCrust);
    strokeWeight(5);
    rect(0, height - 15, width, height);

    /* ground control */
    fill(ship);
    stroke(255);
    beginShape();
    vertex(width / 2 - 40, height);
    vertex(width / 2, height - 80);
    vertex(width / 2 + 40, height);
    endShape(CLOSE);

}


/**
 * draws "lazer" between ground control and Asteroid
 */
function drawLazer() {

    if (!focus)
        return;

    stroke(randomColor());
    strokeWeight(focus.completedText.length); // width of line depends on progress

    // point of ground control
    line(width / 2, height - 80, focus.position.x, focus.position.y);

    fill(255);
    noStroke();
    textAlign(LEFT);
    textSize(30);
    text(focus.completedText, 10, height - 40);
}

/**
 * draws the score
 */
function drawScore() {

    textAlign(RIGHT);
    noStroke();
    textSize(30);
    fill(255);
    text(score, 50, height / 2);
}

/**
 * Generates a random color
 */
function randomColor() {

    return color(random(255), random(255), random(255));
}

/**
 * stops loop, draws game over message
 */
function endGame() {
    noLoop();

    // Convert keyData array to CSV format
    let csvContent = "key,timestamp,speed\n"; // Column headers
    keyData.forEach(function(row) {
        csvContent += `${row.key},${row.timestamp},${row.speed}\n`;
    });

    // Save the CSV file
    save([csvContent], "keystroke_data.csv");

    fill(255);
    noStroke();
    textAlign(CENTER);
    textSize(80);
    text("Game Over!", width / 2, height / 2);
}


function Asteroid(x, y, text, color) {

    this.position = createVector(x, y);

    this.color = color; // color

    this.text = text; // text do be typed
    this.size = text.length * 15; // size

    this.completedText = ""; // text which the user has correctly inputted

    this.intact = true; // whether the astroid is on-screen or not
}

/**
 * moves Astroid down the screen
 */
Asteroid.prototype.update = function () {

    // make speed based upon score
    let vely = map(score, 0, 1000, 1, 15);
    let slope = (width / 2 - this.position.x) / (height - this.position.y);
    let velx = slope * vely;
    this.position.y += vely;
    this.position.x += velx;
    
    if (this.position.y > height) {
        endGame();
    }
};

/**
 * based upon keyCode, will add to the completedText
 */
Asteroid.prototype.erode = function (keyCode) {

    var inputChar = String.fromCharCode(keyCode).toLowerCase(); // keyCode to char
    var length = this.completedText.length + 1;

    if (this.text.substring(0, length) === this.completedText + inputChar) // if the character matches text
        this.completedText += inputChar;

    this.intact = (this.completedText !== this.text); // update intact
};

/**
 * draws Astroid
 */

Asteroid.prototype.draw = function () {
    push(); // Save the current drawing state

    // Translate to the asteroid's position for drawing
    translate(this.position.x, this.position.y);

    // Rotate the image based on its velocity or another property if desired
    let angle = atan2(this.position.y - height, this.position.x - width / 2) + PI / 2;
    rotate(angle);

    // Draw the spaceship image
    imageMode(CENTER); // Set image mode to center for correct rotation
    image(boogieImage, 0, 0, this.size, this.size); // Adjust size as needed

    // Optionally draw text in the center of the spaceship
    stroke(80);
    textAlign(CENTER);
    textSize(20);
    fill(255);
    text(this.text, 0, 0); // Center the text based on the translated position

    pop(); // Restore the previous drawing state
};


/**
 * figures out which Astroid within the field array
 * should be targeted
 */
function findAsteroid(code, field) {

    var char = String.fromCharCode(code).toLowerCase();

    for (var i = 0; i < field.length; i++) {
        if (field[i].text.startsWith(char)) {

            return field[i];
        }
    }

    return null;
}