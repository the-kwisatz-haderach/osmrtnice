import { ReactNode, createContext, useContext } from 'react'

const AdminContext = createContext(false)

export const AdminProvider = ({
  children,
  isAdmin,
}: {
  children: ReactNode
  isAdmin: boolean
}) => <AdminContext.Provider value={isAdmin}>{children}</AdminContext.Provider>

export const useAdminContext = () => useContext(AdminContext)
