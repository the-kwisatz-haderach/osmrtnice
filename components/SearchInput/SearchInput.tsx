import React, { ReactElement } from 'react'
import { faSearch, faSpinner } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

interface Props
  extends Omit<
    React.DetailedHTMLProps<
      React.InputHTMLAttributes<HTMLInputElement>,
      HTMLInputElement
    >,
    'onChange' | 'value'
  > {
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
    <form
      className="flex"
      onSubmit={(e) => {
        e.preventDefault()
        if (onSubmit) {
          onSubmit()
        }
      }}
    >
      <input
        {...props}
        defaultValue={defaultValue}
        onChange={(e) => {
          onChange(e.target.value)
        }}
        className="h-14 sm:w-96 text-xl"
      />
      <button
        type="submit"
        className="bg-primary-500 hover:bg-primary-600 transition-colors text-white border-none h-14 w-16"
      >
        {isLoading ? (
          <FontAwesomeIcon
            className="animate-spin"
            icon={faSpinner}
            size="lg"
          />
        ) : (
          <FontAwesomeIcon icon={faSearch} size="lg" />
        )}
      </button>
    </form>
  )
}
