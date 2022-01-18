import {
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from '@chakra-ui/react'

interface Props {
  title?: string
  footer?: string
}

export const ModalTemplate: React.FC<Props> = ({ title, footer, children }) => (
  <ModalContent maxW="1000px">
    <ModalHeader>{title}</ModalHeader>
    <ModalCloseButton />
    <ModalBody>{children}</ModalBody>
    <ModalFooter>{footer}</ModalFooter>
  </ModalContent>
)
