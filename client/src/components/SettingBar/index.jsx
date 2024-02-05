import React from 'react'
import { AppBar, Box, Toolbar } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ToolState } from '../../store/toolState'
import { styles } from './styles'

export const SettingBar = observer(() => (
  <Box sx={styles.box} >
    <AppBar position='static'>
      <Toolbar sx={styles.toolbar}>
        <label htmlFor='line-width' style={styles.label}>Line width</label>
        <input
          onChange={(e) => ToolState.setLineWidth(e.target.value)(e)}
          style={styles.inputLineWidth}
          id='line-width'
          type='number'
          value={ToolState.tool.lineWidth}
          min={1}
          max={50}
        />
        <label htmlFor='stroke-color' style={styles.label}>Border color</label>
        <input
          onChange={(e) => ToolState.setStrokeColor(e.target.value)}
          value={ToolState.tool.strokeColor}
          style={styles.colorPicker}
          id='stroke-color'
          type='color'
        />
      </Toolbar>
    </AppBar>
  </Box>
))
