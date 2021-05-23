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
  const cn = cx(
    className,
    style.button,
    { [style.primary]: color === 'primary' },
    { [style.secondary]: color === 'secondary' },
    { [style.fluid]: fluid }
  )
  return (
    <button {...props} className={cn}>
      {children}
    </button>
  )
}
