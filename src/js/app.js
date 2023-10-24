import goblinImagePNG from "../img/goblin.png";
import hammerImagePNG from "../img/hammer.png";
const customCursor = document.getElementById("custom-cursor");

document.addEventListener("mousemove", (e) => {
  customCursor.style.left = `${e.clientX}px`;
  customCursor.style.top = `${e.clientY}px`;
});

class Goblin {
  constructor(gameContainer, onGoblinClick) {
    this.gameContainer = gameContainer;
    this.element = new Image();
    this.element.src = goblinImagePNG;
    this.element.classList.add("goblin");
    this.element.style.display = "none";
    this.element.addEventListener("click", onGoblinClick);
    this.currentPosition = { row: 0, col: 0 };
    this.gameContainer.appendChild(this.element);
  }

  getRandomPosition(gridSize) {
    const row = Math.floor(Math.random() * gridSize);
    const col = Math.floor(Math.random() * gridSize);
    return { row, col };
  }

  show() {
    this.currentPosition = this.getRandomPosition(4);
    this.element.style.gridRow = this.currentPosition.row + 1;
    this.element.style.gridColumn = this.currentPosition.col + 1;
    this.element.style.display = "block";
  }

  hide() {
    this.element.style.display = "none";
  }
}

class Hammer {
  constructor(gameContainer) {
    this.gameContainer = gameContainer;
    this.element = new Image();
    this.element.src = hammerImagePNG;
    this.element.classList.add("hammer");
    this.element.style.cursor = `url(${hammerImagePNG}), auto`;
    this.element.style.display = "none";
    this.gameContainer.appendChild(this.element);
  }

  show(position) {
    this.element.style.gridRow = position.row + 1;
    this.element.style.gridColumn = position.col + 1;
    this.element.style.display = "block";
  }

  hide() {
    this.element.style.display = "none";
  }
}

class Game {
  constructor() {
    this.gameContainer = document.querySelector(".game-container");
    this.scoreElement = document.querySelector(".score");
    this.score = 0;
    this.maxMissedCount = 5; 
    this.goblinsToWin = 5; 
    this.missedGoblins = 0; 
    this.clickedGoblins = 0; 
    this.isGameEnded = false; 

    this.goblin = new Goblin(this.gameContainer, this.onGoblinClick.bind(this));
    this.hammer = new Hammer(this.gameContainer);

    this.scoreElement.textContent = `Score: ${this.score}`;
    this.gridCells = document.querySelectorAll(".grid-cell");
    this.gridCells.forEach((cell) => {
      cell.addEventListener("click", () => this.onGridCellClick());
    });

    this.startGameLoop();
  }

  startGameLoop() {
    setInterval(() => {
      if (!this.isGameEnded) {
        this.goblin.show();
        this.missedGoblins++;

        if (this.missedGoblins > this.maxMissedCount) {
          this.endGame(`Игра завершена! Ваш счёт ${this.score}`); 
        }
      }
    }, 1000);
  }

  onGoblinClick() {
    if (!this.isGameEnded) {
      this.score++;
      this.clickedGoblins++;
      this.missedGoblins--;

      this.scoreElement.textContent = `Score: ${this.score}`;
      this.goblin.hide();
    }
  }

  onGridCellClick() {
    if (!this.isGameEnded && this.goblin.element.style.display === "block") {
      this.onGoblinClick();
    }
  }

  endGame(message) {
    alert(message);
    this.isGameEnded = true;
    location.reload(); 
  }
}

const game = new Game();
