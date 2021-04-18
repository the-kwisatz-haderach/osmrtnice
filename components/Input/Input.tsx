import React, { ReactElement, useEffect, useRef, useState } from 'react'
import { debounce } from 'lodash'

interface Props {
  defaultValue?: string
  debounced?: boolean
  placeholder?: string
  onChange: (value: string) => void
}

export default function Input({
  defaultValue = '',
  debounced = true,
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
      className="p-1 rounded-sm"
      type="text"
      value={value}
      placeholder={placeholder}
      onChange={(e) => {
        setValue(e.target.value)
      }}
    />
  )
}
