import {
  Brush as BrushMUI,
  Circle as CircleMUI,
  CleaningServices,
  HorizontalRule,
  Rectangle,
  Redo,
  Undo,
  Save
} from '@mui/icons-material'
import { ToolState } from '../../store/toolState'
import { CanvasState } from '../../store/canvasState'
import { Brush, Circle, Eraser, Line, Rect } from '../../tools'

const download = () => {
  const dataUrl = CanvasState.canvas.toDataURL()
  const a = document.createElement('a')
  a.href = dataUrl
  a.download = CanvasState.sessionId + '.jpg'
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
}

export const getButtonsConfigs = () => [
  [
    {
      ariaLabel: 'brush',
      Icon: <BrushMUI />,
      onClick: () => ToolState.setTool(new Brush(CanvasState.canvas, CanvasState.socket, CanvasState.sessionId))
    },
    {
      ariaLabel: 'line',
      Icon: <HorizontalRule />,
      onClick: () => ToolState.setTool(new Line(CanvasState.canvas, CanvasState.socket, CanvasState.sessionId))
    },
    {
      ariaLabel: 'circle',
      Icon: <CircleMUI />,
      onClick: () => ToolState.setTool(new Circle(CanvasState.canvas, CanvasState.socket, CanvasState.sessionId))
    },
    {
      ariaLabel: 'rect',
      Icon: <Rectangle />,
      onClick: () => ToolState.setTool(new Rect(CanvasState.canvas, CanvasState.socket, CanvasState.sessionId))
    },
    {
      ariaLabel: 'eraser',
      Icon: <CleaningServices />,
      onClick: () => ToolState.setTool(new Eraser(CanvasState.canvas, CanvasState.socket, CanvasState.sessionId))
    },
  ],
  [
    {
      ariaLabel: 'undo',
      Icon: <Undo />,
      sx: { ml: 'auto' },
      onClick: () => CanvasState.undo(),
    },
    {
      ariaLabel: 'redo',
      Icon: <Redo />,
      onClick: () => CanvasState.redo(),
    },
    {
      ariaLabel: 'save',
      Icon: <Save />,
      onClick: () => download(),
    },
  ]
]