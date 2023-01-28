import HomeComponent from './app/components/home/home.componet'
import { DIContext, getDependencies } from './app/helpers'
import { Provider } from 'react-redux'

import React from 'react'
import { store } from './app/store'

function App (): JSX.Element {
  return (
    <Provider store={store}>
      <DIContext.Provider value={getDependencies()}>
        <HomeComponent />
      </DIContext.Provider>
    </Provider>
  )
}

export default App
