class Obstacle {
  constructor(ctx, width, height, gameWidth, gameHeight, image) {
    this.ctx = ctx;
    this.width = 170;
    this.height = 150;

    this.image = new Image();
    this.image.src = image;

    this.posX = gameWidth;
    this.posY = gameHeight * 0.98 - this.height;

    this.vx = 10;
  }

  draw() {
    
    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
    //this.ctx.drawImage(this.image, this.posX + this.width, this.posY, this.width, this.height);
  }

  move() {
    this.posX -= this.vx;
  }
}