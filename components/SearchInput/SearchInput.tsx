import React, { ReactElement } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Flex, IconButton, Input, InputProps } from '@chakra-ui/react'

interface Props extends Omit<InputProps, 'onChange' | 'value'> {
  defaultValue?: string
  onSubmit?: () => void
  onChange: (value: string) => void
  isLoading?: boolean
}

export default function SearchInput({
  defaultValue,
  onChange,
  onSubmit,
  isLoading = false,
  ...props
}: Props): ReactElement {
  return (
    <Flex
      as="form"
      width="100%"
      maxW={500}
      px={[4, 0]}
      flexDir={['column', 'row']}
      onSubmit={(e) => {
        e.preventDefault()
        if (onSubmit) {
          onSubmit()
        }
      }}
    >
      <Input
        {...props}
        flex={1}
        defaultValue={defaultValue}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        size="lg"
        variant="flushed"
        focusBorderColor="white"
        borderBottomWidth={3}
        height={16}
        backgroundColor="rgba(0,0,0,0.2)"
        fontSize={{ sm: 24 }}
        p={3}
        _focus={{
          backgroundColor: 'rgba(255,255,255,0.4)',
        }}
        _placeholder={{
          color: 'white',
        }}
      />
      <IconButton
        icon={<FontAwesomeIcon icon={faSearch} size="lg" />}
        isLoading={isLoading}
        type="submit"
        aria-label="submit"
        colorScheme="orange"
        height="100%"
        minH={[12, 16]}
        minW={16}
        size="lg"
        mt={[2, 0]}
        borderLeftRadius={{ sm: 0 }}
      />
    </Flex>
  )
}
