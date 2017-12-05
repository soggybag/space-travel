import React, { Component } from 'react'

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

class SpaceView extends Component {
  constructor(props) {
    super(props)

    this.state = { acceleration: 0 }

    this.canvas = null
    this.ctx = null
    this.start = null
    this.pixels = []

    for (let i = 0; i < 100; i++) {
      const pixel = new Pixel()
      pixel.reset()
      this.pixels.push(pixel)
    }
    this.step.bind(this)
  }

  componentDidMount() {
    this.canvas = this.refs.canvas
    this.ctx = this.canvas.getContext('2d')
    this.ctx.fillStyle = 'rgba(0, 0, 0, 1)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    window.requestAnimationFrame(this.step.bind(this));
  }

  step(timestamp) {
    if (!this.start) this.start = timestamp;

    var progress = timestamp - this.start;
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    const speed = this.state.acceleration / 1000

    for (var i in this.pixels) {
      const pixel = this.pixels[i]
      pixel.move(speed)
      // console.log(pixel.alpha);
      this.ctx.fillStyle = `rgba(255, 255, 255, ${pixel.alpha})`
      this.ctx.fillRect(pixel.x, pixel.y, 2, 2)
    }
    this.setState({ acceleration: this.state.acceleration + 1 })
    window.requestAnimationFrame(this.step.bind(this));
  }

  render() {
    return (
      <div>
        <canvas
          style={{width: '320px', margin: 'auto', display: 'block'}}
          ref="canvas"
          width="320"
          height="320"></canvas>
        <p style={{textAlign: 'center'}}>{this.state.acceleration}</p>
      </div>
    )
  }
}

export default SpaceView
