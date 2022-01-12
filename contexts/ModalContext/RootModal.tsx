import { ComponentProps } from 'react'
import {
  Modal,
  ModalOverlay,
  ModalProps as ChakraModalProps,
} from '@chakra-ui/react'
import { IModals, modals } from './modals'
import { IModalComponentProps } from './types'

interface RootModalProps<T extends keyof IModals> extends IModalComponentProps {
  name?: T
  props?: ComponentProps<IModals[T]>
  rootModalProps?: Partial<ChakraModalProps>
}

export function RootModal<T extends keyof IModals>({
  close,
  name,
  props,
  rootModalProps,
}: RootModalProps<T>) {
  const CurrentModal = name in modals ? modals[name] : () => <></>
  return (
    <Modal onClose={close} isOpen={name !== null} {...rootModalProps}>
      <ModalOverlay />
      <CurrentModal {...(props as any)} />
    </Modal>
  )
}
