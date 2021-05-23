import React, {
  DetailedHTMLProps,
  ReactElement,
  useEffect,
  useRef,
  useState,
} from 'react'
import { debounce } from 'lodash'
import cn from 'classnames'

interface Props
  extends Omit<
    DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'onChange'
  > {
  defaultValue?: string
  debounced?: boolean
  placeholder?: string
  onChange: (value: string) => void
}

export default function Input({
  defaultValue = '',
  debounced = true,
  autoFocus = true,
  onChange,
  placeholder,
  className,
  type = 'text',
  ...props
}: Props): ReactElement {
  const [value, setValue] = useState(defaultValue)
  const activeOnChange = useRef(debounced ? debounce(onChange, 500) : onChange)

  useEffect(() => {
    activeOnChange.current(value)
  }, [value])

  return (
    <input
      {...props}
      autoFocus={autoFocus}
      className={cn(className, 'p-2 rounded-sm md:w-5/12 text-2xl')}
      type={type}
      value={value}
      placeholder={placeholder}
      onChange={(e) => {
        setValue(e.target.value)
      }}
    />
  )
}
