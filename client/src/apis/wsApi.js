import { CanvasState } from '../store/canvasState'
import { Rect, Brush, Circle, Line, Eraser } from '../tools'

const drawHandler = (msg, canvasRef) => {
  const { figure } = msg
  const ctx = canvasRef.current.getContext('2d')
  switch (figure.type) {
    case 'brush':
      Brush.draw(ctx, figure.x, figure.y, figure.color)
      break
    case 'rect':
      Rect.staticDraw(ctx, figure.x, figure.y, figure.width, figure.height, figure.color)
      break
    case 'circle':
      Circle.staticDraw(ctx, figure.x, figure.y, figure.radius, figure.color)
      break
    case 'line':
      Line.staticDraw(ctx, figure.startX, figure.startY, figure.currentX, figure.currentY, figure.color)
      break
    case 'eraser':
      Eraser.draw(ctx, figure.x, figure.y, figure.color)
      break
    case 'undo':
      CanvasState.redraw(ctx, figure.dataUrl, canvasRef)
      break
    case 'redo':
      CanvasState.redraw(ctx, figure.dataUrl, canvasRef)
      break
    case 'finish':
      ctx.beginPath()
      break
    default:
      ctx.beginPath()
      break
  }
}

export const initWebSocket = (canvasRef, id, username) => {
  const socket = new WebSocket(`ws${process.env.REACT_APP_SERVER_URL}`)

  socket.onopen = () => {
    console.log('Connection')

    socket.send(JSON.stringify({
      id,
      username,
      method: 'connection'
    }))
  }

  socket.onmessage = (event) => {
    let msg = JSON.parse(event.data)
    switch (msg.method) {
      case 'connection':
        console.log(`User: ${msg.username} is connected`)
        break
      case 'draw':
        drawHandler(msg, canvasRef)
        break
      default:
        break
    }
  }

  return socket
}
