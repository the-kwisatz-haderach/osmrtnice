import { createContext, useContext } from 'react'
import { MenuItem } from '../lib/domain/types'

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

interface IAppContext {
  menuItems: MenuItem[]
}

const defaultAppContext: IAppContext = {
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

export default function useAppContext(): IAppContext {
  return useContext(AppContext)
}
