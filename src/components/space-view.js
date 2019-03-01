import React, { Component } from 'react'
import Pixel from './Pixel'

// =====================================================
// This project uses canvas inside a React component. 
// 
// In order to use canvas we need to make sure that 
// React's virtual DOM doesn't replace the canvas 
// element defined in this component. To do this 
// we can use ref. A ref is a reference to a DOM 
// node. 

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
    // get a ref to the canvas
    this.canvas = this.refs.canvas
    this.ctx = this.canvas.getContext('2d')
    this.ctx.fillStyle = 'rgba(0, 0, 0, 1)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    window.requestAnimationFrame(this.step.bind(this));
  }

  step(timestamp) {
    if (!this.start) this.start = timestamp;

    var progress = timestamp - this.start;
    this.ctx.fillStyle = 'rgba(0, 0, 0, 0.05)'
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    const speed = this.state.acceleration / 1000

    for (var i in this.pixels) {
      const pixel = this.pixels[i]
      pixel.move(speed)
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
          style={{ width: '320px', margin: 'auto', display: 'block' }}
          // Set a ref for this element
          ref="canvas"
          width="320"
          height="320"></canvas>
        <p style={{ textAlign: 'center' }}>{ this.state.acceleration }</p>
      </div>
    )
  }
}

export default SpaceView
