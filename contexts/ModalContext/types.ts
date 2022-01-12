import { ModalProps } from '@chakra-ui/react'
import { ComponentProps } from 'react'
import { IModals } from './modals'

export interface IModalComponentProps {
  close: () => void
}

export interface IModalContext {
  open: <U extends keyof IModals>(
    name: U,
    options: {
      props?: ComponentProps<IModals[U]>
      rootModalProps?: Partial<ModalProps>
    }
  ) => void
  close: () => void
}
