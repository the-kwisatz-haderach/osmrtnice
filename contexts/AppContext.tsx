import { createContext, useContext } from 'react'
import { IMenuItem } from '../lib/storyblok/types'
export interface IAppContext {
  menuItems: IMenuItem[]
  logo: string
  address: string
  phone: string
  email: string
}

const defaultAppContext: IAppContext = {
  menuItems: [],
  logo: '',
  address: '',
  phone: '',
  email: '',
}

const AppContext = createContext(defaultAppContext)

export const AppProvider: React.FC<IAppContext> = ({ children, ...value }) => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default function useAppContext(): IAppContext {
  return useContext(AppContext)
}
