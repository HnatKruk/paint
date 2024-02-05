import { makeAutoObservable } from 'mobx'

class toolState {
  tool = {
    fillColor: '#e66465',
    strokeStyle: '#e66465',
  }

  constructor() {
    makeAutoObservable(this)
  }

  setTool(tool) {
    this.tool = tool
  }

  setFillColor(color) {
    this.tool.fillColor = color
    this.tool.strokeStyle = color

  }
}

export const ToolState = new toolState()
