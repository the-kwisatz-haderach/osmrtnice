import dynamic from 'next/dynamic'
import React, {
  createContext,
  ReactNode,
  useCallback,
  useRef,
  useState,
} from 'react'
import { IModalContext } from './types'

export const ModalContext = createContext<IModalContext>({
  open: () => {},
  close: () => {},
})

const DynamicModal = dynamic(() =>
  import('./RootModal').then((mod) => mod.RootModal)
)

export const ModalProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [modal, setModal] = useState<{
    name?: Parameters<IModalContext['open']>[0]
    props?: Parameters<IModalContext['open']>[1]['props']
    rootModalProps?: Parameters<IModalContext['open']>[1]['rootModalProps']
  }>({
    name: null,
    props: null,
    rootModalProps: {},
  })

  const open = useCallback<IModalContext['open']>(
    (name, { props, rootModalProps }) => {
      setModal({ name, props, rootModalProps })
    },
    []
  )

  const close = useCallback(
    () =>
      setModal({
        name: null,
        props: null,
        rootModalProps: {},
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
      <DynamicModal {...modal} close={close} />
    </ModalContext.Provider>
  )
}
