import { Tool } from './Tool'

export class Brush extends Tool {
  constructor(canvas, socket, id) {
    super(canvas, socket, id, 'brush')
    this.listen()
  }

  listen() {
    this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
    this.canvas.onmousedown = this.mouseDownHandler.bind(this)
    this.canvas.onmouseup = this.mouseUpHandler.bind(this)
  }

  mouseUpHandler(e) {
    this.mouseDown = false
    this.socket.send(JSON.stringify({
      method: 'draw',
      id: this.id,
      figure: {
        type: 'finish',
      }
    }))
  }

  mouseDownHandler(e) {
    this.mouseDown = true
    this.ctx.beginPath()
    this.ctx.moveTo(e.pageX - e.target.offsetLeft, e.pageY - e.target.offsetTop)
  }

  mouseMoveHandler(e) {
    if (this.mouseDown) {
      this.socket.send(JSON.stringify({
        method: 'draw',
        id: this.id,
        figure: {
          type: 'brush',
          x: e.pageX - e.target.offsetLeft,
          y: e.pageY - e.target.offsetTop,
          color: this.ctx.fillStyle,
        }
      }))
    }
  }

  static draw(ctx, x, y, color) {
    const prevStrokeStyle = ctx.strokeStyle
    const prevFillStyle = ctx.fillStyle
    ctx.strokeStyle = color
    ctx.fillStyle = color
    ctx.lineTo(x, y)
    ctx.stroke()
    ctx.strokeStyle = prevStrokeStyle
    ctx.fillStyle = prevFillStyle
  }
}