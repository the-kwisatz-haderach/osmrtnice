import React, { createContext, useCallback, useRef, useState } from 'react'
import { RootModal } from './RootModal'
import { IModalContext } from './types'

export const ModalContext = createContext<IModalContext>({
  open: () => {},
  close: () => {},
})

export const ModalProvider: React.FC = ({ children }) => {
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
      <RootModal {...modal} close={close} />
    </ModalContext.Provider>
  )
}
