import React from 'react'
import { AppBar, Box, Toolbar, Button } from '@mui/material'
import { observer } from 'mobx-react-lite'
import { ToolState } from '../../store/toolState'
import { getButtonsConfigs } from './getButtonsConfigs'
import { styles } from './styles'

const renderToolBarButtons = (buttonsConfig, activeButton = '') => {
  return buttonsConfig.map(({ ariaLabel, Icon, sx, ...props }, index) => (
    <Button
      aria-label={ariaLabel}
      variant='outlined'
      key={index}
      sx={{ ...styles.button, ...sx }}
      style={{...(activeButton === ariaLabel && styles.active)}}
      {...props}
    >
      {Icon}
    </Button>
  ))
}

export const ToolBar = observer(() => {
  const [leftSideButtons, rightSideButtons] = getButtonsConfigs()

  const handleColorChange = (e) => {
    ToolState.setFillColor(e.target.value)
  }

  return (
    <Box sx={styles.box} >
      <AppBar position='static'>
        <Toolbar sx={styles.toolbar}>
          {renderToolBarButtons(leftSideButtons, ToolState.tool.name)}
          <input
            style={styles.colorPicker}
            type='color'
            value={ToolState.tool.fillColor}
            onChange={(e) => handleColorChange(e)}
          />
          {renderToolBarButtons(rightSideButtons)}
        </Toolbar>
      </AppBar>
    </Box>
  )
})
