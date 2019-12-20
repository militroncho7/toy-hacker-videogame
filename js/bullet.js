class Bullet {
  constructor(ctx, width, height, playerX, playerY, playerWidth, playerHeight, floor) {
    this.ctx = ctx;
    this.height = height;
    this.width = width;

    this.posX = playerX + playerWidth;
    this.posY = playerY + playerHeight / 2;
    this.playerHeight = playerHeight;
    this.floor = floor;

    this.vx = 13;
    this.vy = 0;
    this.gravity = 0;
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.fillStyle = 'red';
    this.ctx.fillRect(this.posX, this.posY, this.width, this.height);
    this.ctx.fill();
    this.ctx.closePath();
  }

  move() {
    this.posX += this.vx;
    this.posY += this.vy;
    this.vy += this.gravity;

    //Accelerate > 1 &&  Decelerate < 1
    if (this.posY >= this.floor + this.playerHeight) this.vy *= -1;
  }

}