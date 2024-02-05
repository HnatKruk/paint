import { Tool } from './Tool'

export class Line extends Tool {
	constructor(canvas, socket, id) {
		super(canvas, socket, id, 'line')
		this.listen()
	}

	listen() {
		this.canvas.onmousedown = this.mouseDownHandler.bind(this)
		this.canvas.onmouseup = this.mouseUpHandler.bind(this)
		this.canvas.onmousemove = this.mouseMoveHandler.bind(this)
	}

	mouseDownHandler(e) {
		this.mouseDown = true
		this.startX = e.pageX-e.target.offsetLeft
		this.startY = e.pageY-e.target.offsetTop
		this.ctx.beginPath()
		this.ctx.moveTo(this.startX, this.startY)
		this.saved = this.canvas.toDataURL()
	}

	mouseUpHandler(e) {
		this.mouseDown = false
		this.socket.send(JSON.stringify({
      method: 'draw',
      id: this.id,
      figure: {
        type: 'line',
        startX: this.startX,
        startY: this.startY,
        currentX: this.currentX,
        currentY: this.currentY,
				color: this.ctx.fillStyle,
      }
    }))
    this.socket.send(JSON.stringify({
      method: 'draw',
      id: this.id,
      figure: {
        type: 'finish',
      }
    }))
	}

	mouseMoveHandler(e) {
		if (this.mouseDown) {
			this.currentX = e.pageX-e.target.offsetLeft
			this.currentY = e.pageY-e.target.offsetTop
			this.draw(this.startX, this.startY, this.currentX, this.currentY)
		}
	}

	draw(startX, startY, currentX, currentY) {
		const img = new Image()
		img.src = this.saved
		img.onload = () => {
			this.ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
			this.ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
			this.ctx.beginPath()
			this.ctx.moveTo(startX, startY)
			this.ctx.lineTo(currentX, currentY)
			this.ctx.stroke()
		}
	}

	static staticDraw(ctx, startX, startY, currentX, currentY, color) {
		const prevStrokeStyle = ctx.strokeStyle
    const prevFillStyle = ctx.fillStyle
		ctx.strokeStyle = color
    ctx.fillStyle = color
		ctx.beginPath()
		ctx.moveTo(startX, startY)
		ctx.lineTo(currentX, currentY)
    ctx.stroke()
		ctx.strokeStyle = prevStrokeStyle
    ctx.fillStyle = prevFillStyle
  }
}