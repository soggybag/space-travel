
// ! Use function for class
class Pixel {
  constructor() {
    this.x = 160
    this.y = 160
    this.dx = (Math.random() * 2) - 1
    this.dy = (Math.random() * 2) - 1
    this.alpha = 0
  }

  reset() {
    this.dx = (Math.random() * 2) - 1
    this.dy = (Math.random() * 2) - 1
    this.x = 160
    this.y = 160
    this.alpha = 0
  }

  move(speed) {
    this.x += this.dx * speed
    this.y += this.dy * speed
    this.alpha += (Math.abs(this.dx) + Math.abs(this.dy)) / 100
    if (this.x > 320 || this.x < 0 || this.y > 320 || this.y < 0) {
      this.reset()
    }
  }
}

export default Pixel