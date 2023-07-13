// Bug class
class Bug {
    constructor() {
      this.element = document.createElement('div');
      this.element.className = 'bug';
      this.element.addEventListener('click', this.squash.bind(this));
      document.body.appendChild(this.element);
      this.resetPosition();
      this.startMoving();
    }
  
    resetPosition() {
      const maxWidth = window.innerWidth - this.element.offsetWidth;
      const maxHeight = window.innerHeight - this.element.offsetHeight;
      this.element.style.left = Math.floor(Math.random() * maxWidth) + 'px';
      this.element.style.top = Math.floor(Math.random() * maxHeight) + 'px';
    }
  
    startMoving() {
      const directionX = Math.random() > 0.5 ? 1 : -1;
      const directionY = Math.random() > 0.5 ? 1 : -1;
      const speedX = Math.floor(Math.random() * 3) + 1;
      const speedY = Math.floor(Math.random() * 3) + 1;
      this.moveInterval = setInterval(() => {
        const currentLeft = parseInt(this.element.style.left, 10);
        const currentTop = parseInt(this.element.style.top, 10);
        const newLeft = currentLeft + speedX * directionX;
        const newTop = currentTop + speedY * directionY;
        this.element.style.left = newLeft + 'px';
        this.element.style.top = newTop + 'px';
        if (
          newLeft < 0 ||
          newLeft > window.innerWidth - this.element.offsetWidth ||
          newTop < 0 ||
          newTop > window.innerHeight - this.element.offsetHeight
        ) {
          this.resetPosition();
        }
      }, 20);
    }
  
    squash() {
      this.element.classList.add('squashed');
      this.element.removeEventListener('click', this.squash);
      clearInterval(this.moveInterval);
      setTimeout(() => {
        document.body.removeChild(this.element);
      }, 1000);
      game.incrementScore();
    }
  }
  
  // Game class
  class Game {
    constructor() {
      this.score = 0;
      this.scoreElement = document.getElementById('score');
      this.timerElement = document.getElementById('timer');
      this.timer = 60;
      this.gameInterval = null;
      this.startGame();
    }
  
    startGame() {
      this.score = 0;
      this.scoreElement.textContent = 'Score: 0';
      this.timerElement.textContent = 'Time: ' + this.timer;
      this.gameInterval = setInterval(() => {
        this.timer--;
        this.timerElement.textContent = 'Time: ' + this.timer;
        if (this.timer === 0) {
          clearInterval(this.gameInterval);
          alert('Game Over! Your score: ' + this.score);
          this.resetGame();
        }
      }, 1000);
      this.generateBugs();
    }
  
    generateBugs() {
      this.bugInterval = setInterval(() => {
        new Bug();
      }, 2000);
    }
  
    incrementScore() {
      this.score++;
      this.scoreElement.textContent = 'Score: ' + this.score;
    }
  
    resetGame() {
      clearInterval(this.bugInterval);
      this.timer = 60;
    }
  }
  
  // Initialize the game
  const game = new Game();
  
