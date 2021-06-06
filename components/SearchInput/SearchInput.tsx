import React, { ReactElement } from 'react'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'onChange' | 'value'
  > {
  value: string
  onSubmit: () => void
  onChange: (value: string) => void
}

export default function SearchInput({
  value = '',
  onChange,
  onSubmit,
  ...props
}: Props): ReactElement {
  return (
    <form
      className="flex"
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
    >
      <input
        {...props}
        value={value}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        className="h-14 w-96 text-xl"
      />
      <button type="submit" className="bg-primary-500 border-none h-14 w-16">
        <FontAwesomeIcon icon={faSearch} size="lg" />
      </button>
    </form>
  )
}
