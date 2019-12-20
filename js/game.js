const Game = {
  canvas: undefined,
  ctx: undefined,
  width: undefined,
  height: undefined,
  fps: 60,
  framesCounter: 0,
  playerKeys: {
    TOP_KEY: 38,
    BOTTOM_KEY: 40,
    SPACE: 32,
  },
  score: 0,

  init: function () {
    this.canvas = document.getElementById('canvas');
    this.ctx = this.canvas.getContext('2d');
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.canvas.width = this.width;
    this.canvas.height = this.height;

    this.start();
  },

  start: function () {
    this.reset();
    this.interval = setInterval(() => {
      this.framesCounter++;

      this.clear();
      this.drawAll();
      this.moveAll();

      var audio = document.getElementById("audio");
      audio.play();

      this.clearObstacles()
      if (this.framesCounter % 70 === 0) this.generateObstacles();
      if (this.framesCounter % 100 === 0) this.score++;
      if (this.isCollision()) this.gameOver();
      if (this.isBulletCollision())
        if (this.framesCounter > 1000) this.framesCounter = 0;
    }, 1000 / this.fps)
  },

  reset: function () {
    this.background = new Background(this.ctx, this.width, this.height);


    this.player = new Player(this.ctx, 130, 200, 'img/player.png', this.width, this.height, this.playerKeys);
    this.obstacles = [];
    ScoreBoard.init(this.ctx, this.score);
  },

  clear: function () {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },

  drawAll: function () {
    this.background.draw();
    this.player.draw(this.framesCounter);
    this.obstacles.forEach(obstacle => obstacle.draw());
    ScoreBoard.draw(this.score);
  },

  moveAll: function () {
    this.background.move();
    this.player.move();
    this.obstacles.forEach(obstacle => obstacle.move());
  },

  generateObstacles: function () {
    let images = ['img/alien.png', 'img/ball.png', 'img/bo-peep.png', 'img/dog.png', 'img/forky.png', 'img/jessie.png', 'img/pork.png', 'img/potato.png', 'img/rex.png', 'img/woody.png', 'img/soldier.png', 'img/soldier2.png', 'img/soldier3.png'];
    let rand = Math.floor(Math.random() * images.length);


    switch (images[rand]) {

      case 'img/alien.png':
        this.obstacles.push(new Obstacle(this.ctx, 200, 200, this.width, 350, images[rand]));
        break;

      case 'img/ball.png':
        this.obstacles.push(new Obstacle(this.ctx, 380, 380, this.width, this.height, images[rand]));
        break;

      case 'img/bo-peep.png':
        this.obstacles.push(new Obstacle(this.ctx, 200, 200, this.width, this.height, images[rand]));
        break;

      case 'img/dog.png':
        this.obstacles.push(new Obstacle(this.ctx, 150, 200, this.width, this.height, images[rand]));
        break;

      case 'img/forky.png':
        this.obstacles.push(new Obstacle(this.ctx, 150, 200, this.width, this.height, images[rand]));
        break;

      case 'img/jessie.png':
        this.obstacles.push(new Obstacle(this.ctx, 180, 210, this.width, this.height, images[rand]));
        break;

      case 'img/pork.png':
        this.obstacles.push(new Obstacle(this.ctx, 160, 220, this.width, this.height, images[rand]));
        break;

      case 'img/potato.png':
        this.obstacles.push(new Obstacle(this.ctx, 200, 200, this.width, this.height, images[rand]));
        break;

      case 'img/rex.png':
        this.obstacles.push(new Obstacle(this.ctx, 180, 350, this.width, this.height, images[rand]));
        break;

      case 'img/woody.png':
        this.obstacles.push(new Obstacle(this.ctx, 250, 250, this.width, this.height, images[rand]));
        break;

      case 'img/soldier.png':
        this.obstacles.push(new Obstacle(this.ctx, 280, 240, this.width, 330, images[rand]));
        break;

      case 'img/soldier2.png':
        this.obstacles.push(new Obstacle(this.ctx, 100, 150, this.width, 200, images[rand]));
        break;

      case 'img/soldier3.png':
        this.obstacles.push(new Obstacle(this.ctx, 200, 180, this.width, 450, images[rand]));
        break;

      default:
        this.obstacles.push(new Obstacle(this.ctx, 100, 200, this.width, this.height, images[rand]));
    }
  },

  gameOver: function () {
    //this.gameOver.draw();
    clearInterval(this.interval)
  },

  isCollision: function () {
    // colisiones genéricas
    // (p.x + p.w > o.x && o.x + o.w > p.x && p.y + p.h > o.y && o.y + o.h > p.y )
    return this.obstacles.some(obs => (this.player.posX + this.player.width > obs.posX && obs.posX + obs.width > this.player.posX && this.player.posY + this.player.height > obs.posY && obs.posY + obs.height > this.player.posY));
  },


  isBulletCollision: function () {
    // colisiones genéricas
    // (p.x + p.w > o.x && o.x + o.w > p.x && p.y + p.h > o.y && o.y + o.h > p.y )
    for (let i = 0; i < this.player.bullets.length; i++) {

      let condition = this.obstacles.some(obs => (this.player.bullets[i].posX > obs.posX && obs.posX + obs.width > this.player.bullets[i].posX && this.player.bullets[i].posY > obs.posY && obs.posY + obs.height > this.player.bullets[i].posY));

      if (condition) {
        this.obstacles.splice(i, 1);
        this.player.bullets.splice(i, 1);
      }
      return condition;
    }
  },

  clearObstacles: function () {
    this.obstacles = this.obstacles.filter(obstacle => (obstacle.posX >= 0));
  }
}