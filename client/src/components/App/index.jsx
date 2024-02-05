import React, { Fragment } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { ToolBar, SettingBar, Canvas  } from '..'
import styles from './styles.scss'

export const App = () => {
  return (
    <BrowserRouter>
      <div className={styles.app}>
        <Routes>
          <Route
            path='/:id'
            element={
              <Fragment>
                <ToolBar />
                {/* <SettingBar /> */}
                <Canvas />
              </Fragment>
            }
          />
          <Route path='*' element={<Navigate to={`f${(+new Date()).toString(16)}`} />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}
