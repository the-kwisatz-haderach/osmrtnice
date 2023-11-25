import { createContext, PropsWithChildren, useContext } from 'react'
import { ImageField } from '../lib/storyblok/common/types'
import { IMenuItem } from '../lib/storyblok/types'
export interface IAppContext {
  menuItems: IMenuItem[]
  logo?: ImageField
  ingress: string
  phone: string
  email: string
  showInfoBlock: boolean
  infoBlockText: string
  imageUploadText: string
}

const defaultAppContext: IAppContext = {
  menuItems: [],
  ingress: '',
  phone: '',
  email: '',
  showInfoBlock: false,
  infoBlockText: '',
  imageUploadText: '',
}

const AppContext = createContext(defaultAppContext)

export const AppProvider: React.FC<PropsWithChildren<IAppContext>> = ({
  children,
  ...value
}) => {
  return <AppContext.Provider value={value}>{children}</AppContext.Provider>
}

export default function useAppContext(): IAppContext {
  return useContext(AppContext)
}
