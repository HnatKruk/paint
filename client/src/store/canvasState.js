import { makeAutoObservable } from 'mobx'

class canvasState {
  canvas = null
  socket = null
  sessionId = null
  undoList = []
  redoList = []
  username = ''

  constructor() {
    makeAutoObservable(this)
  }

  setSocket(socket) {
    this.socket = socket
  }

  setSessionId(sessionId) {
    this.sessionId = sessionId
  }

  setUsername(username) {
    this.username = username
  }

  setCanvas(canvas) {
    this.canvas = canvas
  }

  pushToUndo(data) {
    this.undoList.push(data)
  }

  pushToRedo(data) {
    this.redoList.push(data)
  }

  undo() {
    let ctx = this.canvas.getContext('2d')
    if (this.undoList.length > 0) {
      let dataUrl = this.undoList.pop()
      this.redoList.push(this.canvas.toDataURL())
      let img = new Image()
      img.src = dataUrl
      img.onload =  () => {
        ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      }
      this.sendAction('undo', dataUrl)
    }
  }

  redo() {
    let ctx = this.canvas.getContext('2d')
    if (this.redoList.length > 0) {
      let dataUrl = this.redoList.pop()
      this.undoList.push(this.canvas.toDataURL())
      let img = new Image()
      img.src = dataUrl
      img.onload =  () => {
        ctx.clearRect(0,0, this.canvas.width, this.canvas.height)
        ctx.drawImage(img, 0, 0, this.canvas.width, this.canvas.height)
      }
      this.sendAction('redo', dataUrl)
    }
  }

  redraw(ctx, dataUrl, canvasRef) {
    let img = new Image()
    img.src = dataUrl
    img.onload =  () => {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)
      ctx.drawImage(img, 0, 0, canvasRef.current.width, canvasRef.current.height)
    }
  }

  sendAction(figureType, dataUrl) {
    this.socket.send(JSON.stringify({
      method: 'draw',
      id: this.sessionId,
      figure: {
        type: figureType,
        dataUrl,
      }
    }))
  }
  
}

export const CanvasState = new canvasState()