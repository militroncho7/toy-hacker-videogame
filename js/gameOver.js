class GameOver {
  constructor(ctx, width, height) {
    this.ctx = ctx;
    this.width = 500;
    this.height = 450;

    this.image = new Image();
    this.image.src = 'img/gameOver.png';

    this.posX = 0;
    this.posY = 0;
  }

  draw() {
    this.ctx.drawImage(this.image, this.posX, this.posY, this.width, this.height);
  }

}