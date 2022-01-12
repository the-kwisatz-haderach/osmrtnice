import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import React, {
  ComponentProps,
  createContext,
  useCallback,
  useContext,
  useRef,
  useState,
} from 'react'

interface IModalComponentProps {
  close: () => void
}

const SomeModal: React.FC = ({ children }) => {
  return <>{children}</>
}

const AnotherModal: React.FC<{ lol: string }> = ({ children }) => {
  return <>{children}</>
}

const modals = {
  SomeModal,
  AnotherModal,
} as const

interface RootModalProps<T extends keyof typeof modals>
  extends IModalComponentProps {
  name?: T
  props?: ComponentProps<typeof modals[T]>
}

function RootModal<T extends keyof typeof modals>({
  close,
  name,
  props,
}: RootModalProps<T>) {
  const CurrentModal = name in modals ? modals[name] : () => <></>
  return (
    <Modal onClose={close} isOpen={name !== null} isCentered>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Modal Title</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CurrentModal {...(props as any)} />
        </ModalBody>
        <ModalFooter>Footer</ModalFooter>
      </ModalContent>
    </Modal>
  )
}

interface IModalContext {
  open: <U extends keyof typeof modals>(
    name: U,
    props?: ComponentProps<typeof modals[U]>
  ) => void
  close: () => void
}

const ModalContext = createContext<IModalContext>({
  open: () => {},
  close: () => {},
})

export const ModalProvider: React.FC = ({ children }) => {
  const [modal, setModal] = useState<{
    name?: Parameters<IModalContext['open']>[0]
    props?: Parameters<IModalContext['open']>[1]
  }>({
    name: null,
    props: null,
  })

  const open = useCallback<IModalContext['open']>((name, props?) => {
    setModal({ name, props })
  }, [])

  const close = useCallback(
    () =>
      setModal({
        name: null,
        props: null,
      }),
    []
  )

  const value = useRef<IModalContext>({
    open,
    close,
  })

  return (
    <ModalContext.Provider value={value.current}>
      {children}
      <RootModal {...modal} close={close} />
    </ModalContext.Provider>
  )
}

export default function useModal() {
  return useContext(ModalContext)
}
