import { createContext, useContext } from 'react'
import { MenuItem } from '../lib/types'

const menuItems = [
  {
    href: '/services',
    label: 'Services',
  },
  {
    href: '/contact',
    label: 'Contact',
  },
  {
    href: '/obituaries',
    label: 'Obituaries',
  },
]

type AppContext = {
  menuItems: MenuItem[]
}

const defaultAppContext: AppContext = {
  menuItems: [],
}

const AppContext = createContext(defaultAppContext)

export const AppProvider: React.FC = ({ children }) => {
  return (
    <AppContext.Provider
      value={{
        menuItems,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default function useAppContext() {
  return useContext(AppContext)
}
