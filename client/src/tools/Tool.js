import { ToolState } from '../store/toolState'

export class Tool {
  constructor(canvas, socket, id, name = '') {
    this.canvas = canvas
    this.socket = socket
    this.id = id
    this.name = name
    this.ctx = canvas.getContext('2d')
    this.destroyEvents()
    this.ctx.fillStyle = ToolState.tool.fillColor
    this.ctx.strokeStyle = ToolState.tool.fillColor
  }

  set fillColor(color) {
    this.ctx.fillStyle = color
    this.ctx.strokeStyle = color
  }

  destroyEvents() {
    this.canvas.onmousemove = null
    this.canvas.onmousedown = null
    this.canvas.onmouseup = null
  }
}