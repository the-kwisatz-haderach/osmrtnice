import { createContext, useContext } from 'react'
import { MenuItem } from '../lib/types'
export interface IAppContext {
  menuItems: MenuItem[]
  logoUrl: string
}

const defaultAppContext: IAppContext = {
  menuItems: [],
  logoUrl: '',
}

const AppContext = createContext(defaultAppContext)

export const AppProvider: React.FC<IAppContext> = ({
  children,
  menuItems,
  logoUrl,
}) => {
  return (
    <AppContext.Provider
      value={{
        menuItems,
        logoUrl,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export default function useAppContext(): IAppContext {
  return useContext(AppContext)
}
