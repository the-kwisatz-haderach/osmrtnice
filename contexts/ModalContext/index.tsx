import { useContext } from 'react'
import { ModalContext, ModalProvider } from './ModalProvider'

export { ModalProvider }

export default function useModal() {
  return useContext(ModalContext)
}
