import React, { useEffect, useRef, useState } from 'react'
import { observer } from 'mobx-react-lite'
import { useParams } from 'react-router-dom'
import { Box, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, TextField, Button } from '@mui/material'
import { getImage, postImage } from '../../apis/restApi'
import { initWebSocket } from '../../apis/wsApi'
import { CanvasState } from '../../store/canvasState'
import { ToolState } from '../../store/toolState'
import { Brush } from '../../tools'
import { styles } from './styles'

export const Canvas = observer(() => {
  const [open, setOpen] = useState(true)
  const canvasRef = useRef()
  const usernameRef = useRef()
  const { id } = useParams()

  useEffect(() => {
    CanvasState.setCanvas(canvasRef.current)
    getImage(canvasRef, id)
  }, [])

  useEffect(() => {
    if (CanvasState.username) {
      const socket = initWebSocket(canvasRef, id, CanvasState.username)
      CanvasState.setSocket(socket)
      CanvasState.setSessionId(id)
      ToolState.setTool(new Brush(canvasRef.current, socket, id))
    }
  }, [CanvasState.username])

  const mouseDownHandler = () => {
    CanvasState.pushToUndo(canvasRef.current.toDataURL())
  }

  const mouseUpHandler = async () => {
    await postImage(canvasRef, id)
  }

  const connectionHandler = () => {
    CanvasState.setUsername(usernameRef.current.value)
    setOpen(false)
  }

  return (
    <Box sx={styles.box}>
      <Dialog open={open} maxWidth={'sm'} fullWidth={true}>
        <DialogTitle>Log In</DialogTitle>
        <DialogContent>
          <DialogContentText>Please enter your username to draw</DialogContentText>
          <TextField
            autoFocus
            required
            label='username'
            type='text'
            variant='standard'
            fullWidth={true}
            inputRef={usernameRef}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => connectionHandler()} >Log In</Button>
        </DialogActions>
      </Dialog>
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        style={styles.canvas}
        onMouseUp={() => mouseUpHandler()}
        onMouseDown={() => mouseDownHandler()}
      />
    </Box>
  )
})
