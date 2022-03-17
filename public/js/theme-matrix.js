// Matrix canvas
const c = document.getElementById("c");
const ctx = c.getContext("2d");

// making the canvas full screen
c.height =
  "innerHeight" in window
    ? window.innerHeight
    : document.documentElement.offsetHeight;
c.width =
  "innerWidth" in window
    ? window.innerWidth
    : document.documentElement.offsetWidth;

// latin characters - taken from the unicode charset
// converting the string into an array of single characters
const matrix =
  "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ123456789@#$%^&*()*&^%+-/~{[|`]}".split(
    ""
  );

const font_size = 10;
// an array of drops - one per column
const drops = [];
// x below is the x coordinate
// 1 = y co-ordinate of the drop(same for every drop initially)
for (let x = 0; x < c.width / font_size; x++) {
  drops[x] = 1;
}

// make the canvas black from the beginning
ctx.fillStyle = "#000000";
ctx.fillRect(0, 0, c.width, c.height);

// drawing the characters
function draw() {
  // Black BG for the canvas
  // translucent BG to show trail
  ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
  ctx.fillRect(0, 0, c.width, c.height);

  ctx.font = font_size + "px arial";

  // looping over drops
  for (let i = 0; i < drops.length; i++) {
    // only use the random function once to save cpu
    const rand = Math.random();

    // reset the background so that the characters don't blend into each other
    ctx.fillStyle = "#000000";
    ctx.fillRect(i * font_size, (drops[i] - 1) * font_size, 10, 10);

    // a random character to print
    const text = matrix[Math.floor(rand * matrix.length)];
    //  Gitea green
    ctx.fillStyle = "#5AA509";
    ctx.fillText(text, i * font_size, drops[i] * font_size);

    // incrementing Y coordinate
    drops[i]++;

    // sending the drop back to the top randomly after it has crossed the screen
    // adding a randomness to the reset to make the drops scattered on the Y axis
    if (drops[i] * font_size > c.height && rand > 0.975) {
      drops[i] = 1;
    }
  }
}

setInterval(draw, 35);
