import React, {
  ChangeEventHandler,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState,
} from 'react'
import { debounce } from 'lodash'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Flex, IconButton, Input } from '@chakra-ui/react'

interface Props {
  value?: string
  onChange: (value: string) => void
  title?: string
  placeholder?: string
  isLoading?: boolean
  debounceDelay?: number
}

export default function SearchInput({
  value,
  onChange,
  title,
  placeholder = '',
  isLoading = false,
  debounceDelay = 2000,
}: Props): ReactElement {
  const [isTyping, setIsTyping] = useState(false)
  const debouncedSetQuery = useRef(debounce(onChange, debounceDelay)).current

  const onType: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setIsTyping(true)
      debouncedSetQuery(e.target.value)
    },
    [debouncedSetQuery]
  )

  useEffect(() => {
    onChange(value)
    setIsTyping(false)
    return () => {
      debouncedSetQuery.cancel()
    }
  }, [value, debouncedSetQuery, onChange])

  return (
    <Flex
      as="form"
      width="100%"
      maxW={500}
      px={[4, 0]}
      flexDir={['column', 'row']}
    >
      <Input
        placeholder={placeholder}
        flex={1}
        defaultValue={value}
        onChange={onType}
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
        isLoading={isTyping || isLoading}
        type="submit"
        aria-label="submit"
        colorScheme="orange"
        onClick={() => {}}
        height="100%"
        minH={[12, 16]}
        minW={16}
        size="lg"
        mt={[2, 0]}
        title={title}
        borderLeftRadius={{ sm: 0 }}
      />
    </Flex>
  )
}
