import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash'

interface Props {
  defaultValue?: string
  debounced?: boolean
  placeholder?: string
  autoFocus?: boolean
  onChange: (value: string) => void
}

export default function Input({
  defaultValue = '',
  debounced = true,
  autoFocus = true,
  onChange,
  placeholder,
}: Props): ReactElement {
  const [value, setValue] = useState(defaultValue)
  const activeOnChange = useRef(debounced ? debounce(onChange, 500) : onChange)

  useEffect(() => {
    activeOnChange.current(value)
  }, [value])

  return (
    <input
      autoFocus={autoFocus}
      className="px-5 py-3 rounded-sm md:w-5/12 text-2xl"
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => {
        setValue(e.target.value)
      }}
    />
  )
}
