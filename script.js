const butterfly = document.getElementById("butterfly");
const obstacle = document.getElementById("obstacle");
const scoreText = document.getElementById("score");
const background = document.getElementById("game");
document.getElementById("gameOverModal").classList.add("hidden");

let jumping = false;
let score = 0;
let gameOver = false;

// Background
const ctx = background.getContext("2d");
const sky = new Image();
sky.src = "assets/background-sky.png";
const soil = new Image();
soil.src = "assets/background-soil.png";
const grass = new Image();
grass.src = "assets/background-grass.png";

let bg1X = 0, bg2X = 0, bg3X = 0;
const speed1 = 1;
const speed2 = 0.5;
const speed3 = 0.5;

function draw() {
    // ctx.clearRect(0, 0, background.width - 2, background.height);
  
    bg1X -= speed1;
    bg2X -= speed2;
    bg3X -= speed3;
  
    // Loop gambar
    if (bg1X <= -background.width) bg1X = 0;
    if (bg2X <= -background.width) bg2X = 0;
    if (bg3X <= -background.width) bg3X = 0;
  
    ctx.drawImage(sky, bg1X, 0, background.width, background.height);
    ctx.drawImage(sky, bg1X + background.width, 0, background.width, background.height);
  
    ctx.drawImage(soil, bg2X, 0, background.width, background.height);
    ctx.drawImage(soil, bg2X + background.width, 0, background.width, background.height);
  
    ctx.drawImage(grass, bg3X, 0, background.width, background.height);
    ctx.drawImage(grass, bg3X + (background.width - 2), 0, background.width, background.height);
  
    requestAnimationFrame(draw);
};

function showGameOverModal() {
  const modal = document.getElementById("gameOverModal");
  modal.classList.remove("hidden");
  const finalScore = document.getElementById("finalScore");
  finalScore.textContent = "Your Score: " + score;
}

function restartGame() {
  location.reload();
}


// Animasi rintangan
function moveObstacle() {
  let obsPos = window.innerWidth;

  const interval = setInterval(() => {
    if (gameOver) {
      clearInterval(interval);
      showGameOverModal();
    }

    obsPos -= 10;
    // obstacle.style.right = `${-obsPos + window.innerWidth}px`;
    obstacle.style.right = (-obsPos + window.innerWidth) + "px";


    if (obsPos < -60) {
      obsPos = window.innerWidth + Math.random() * 500;
    }

    // Deteksi tabrakan
    const butterflyTop = butterfly.getBoundingClientRect().top;
    console.log("nilai butterfly top", butterflyTop)
    const obsLeft = obstacle.getBoundingClientRect().left;
    console.log("nilai obstacle left", obsLeft)
    console.log("window innerHeigt", window.innerHeight)


    if (
      obsLeft < 167 && 
      obsLeft > 136 &&
      butterflyTop > window.innerHeight - 301
    ) {
      gameOver = true;
    }
  }, 30);
}

// Fungsi lompat
function jump() {
  if (jumping || gameOver) return;
  jumping = true;

  let up = 0;
  const jumpInterval = setInterval(() => {
    if (up >= 250) {
      clearInterval(jumpInterval);
      let down = 0;
      const fallInterval = setInterval(() => {
        if (down >= 250) {
          clearInterval(fallInterval);
          jumping = false;
        } else {
          butterfly.style.bottom = `${200 + 200 - down}px`;
          down += 50;
        }
      }, 20);
    } else {
      butterfly.style.bottom = `${200 + up}px`;
      up += 50;
    }
  }, 150);
}

// Deteksi input
document.addEventListener("keydown", jump);

// Skor
setInterval(() => {
  if (!gameOver) {
    score++;
    scoreText.textContent = "Score: " + score;
  }
}, 500);



// Mulai permainan
draw();
moveObstacle();

