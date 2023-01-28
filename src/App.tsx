import HomeComponent from './app/components/home/home.componet'
import { DIContext, getDependencies } from './app/helpers'
import React from 'react'

function App (): JSX.Element {
  return (
    <DIContext.Provider value={getDependencies()}>
      <HomeComponent />
    </DIContext.Provider>
  )
}

export default App
