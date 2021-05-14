import React, {
  ButtonHTMLAttributes,
  PropsWithChildren,
  ReactElement,
} from 'react'
import cx from 'classnames'
import style from './Button.module.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary'
  fluid?: boolean
}

export default function Button({
  children,
  className,
  color = 'primary',
  fluid = false,
  ...props
}: PropsWithChildren<Props>): ReactElement {
  const cn = `bg-${color}-800 w-${fluid ? 'full' : 'max'}`
  return (
    <button {...props} className={cx(cn, className, style.button)}>
      {children}
    </button>
  )
}
