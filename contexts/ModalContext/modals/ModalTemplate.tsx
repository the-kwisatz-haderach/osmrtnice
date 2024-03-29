import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  title?: string
  footer?: string
  children: ReactNode
}

export const ModalTemplate: React.FC<Props> = ({ title, footer, children }) => (
  <ModalContent maxW="1000px">
    <ModalHeader hidden={!title}>{title}</ModalHeader>
    <ModalCloseButton />
    <ModalBody p={0}>{children}</ModalBody>
    <ModalFooter hidden={!footer}>{footer}</ModalFooter>
  </ModalContent>
)
