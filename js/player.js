class Player {
  constructor(ctx, width, height, image, gameWidth, gameHeight, keys) {
    this.ctx = ctx;
    this.width = width;
    this.height = height;

    this.image = new Image();
    this.image.src = image;

    this.posX = 50;
    this.posY = 0;
    this.posY0 = 560;

    this.vy = 1;

    this.gameWidth = gameWidth;

    this.frames = 3;
    this.framesIndex = 0;

    this.keys = keys;
    this.bullets = [];
    this.setListeners();
  }

  draw(framesCounter) {
    this.ctx.drawImage(
      this.image,
      this.framesIndex * Math.floor(this.image.width / this.frames),
      0,
      Math.floor(this.image.width / this.frames),
      this.image.height,
      this.posX,
      this.posY,
      this.width,
      this.height
    )
    this.clearBullets();
    this.bullets.forEach(bullet => bullet.draw());
    this.animate(framesCounter);
  }

  move() {
    if (this.posY <= this.posY0 && this.posY >= 0) {
      this.posY += this.vy;
    } else {
      this.vy = 1;
      if (this.posY >= 300) {
        this.posY = this.posY0;
      } else {
        this.posY = 0;
      }
    }
    this.bullets.forEach(bullet => bullet.move());
  }

  animate(framesCounter) {
    if (framesCounter % 10 === 0) {
      this.framesIndex++;
      if (this.framesIndex > 2) this.framesIndex = 0;
    }
  }



  setListeners() {
    document.addEventListener('keydown', (e) => {
      switch (e.keyCode) {

        case this.keys.TOP_KEY:
          if (this.posY >= 0) {
            this.posY -= this.vy;
            this.vy -= 10;
          }
          break;

        case this.keys.BOTTOM_KEY:
          if (this.posY <= this.posY0) {
            this.posY -= this.vy;
            this.vy += 10;
          }
          break;

        case this.keys.SPACE:
          this.shoot()
      }
    })
  }

  shoot() {
    this.bullets.push(new Bullet(this.ctx, 50, 5, this.posX, this.posY, this.width, this.height, this.posY0))
  }

  clearBullets() {
    this.bullets = this.bullets.filter(bullet => bullet.posX <= this.gameWidth)
  }
}