/*
  Global state wrapper. Use for global data needed across the site, or where you don't want to waterfall down the data from parent to children
  – Set globals in layout.js
  – Retrieve globals anywhere throughout the project by calling useGlobalContent():
    const todoData = useGlobalContent().todoData
*/

import { createContext, useContext } from 'react'
import PropTypes from 'prop-types'

const GlobalContext = createContext()

export function GlobalWrapper({ todoData, children }) {
  const sharedState = { todoData }

  return (
    <GlobalContext.Provider value={sharedState}>
      {children}
    </GlobalContext.Provider>
  )
}

export function useGlobalContext() {
  return useContext(GlobalContext)
}

GlobalWrapper.propTypes = {
  todoData: PropTypes.any,
  children: PropTypes.node,
}
