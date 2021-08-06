import React, {
  ButtonHTMLAttributes,
  PropsWithChildren,
  ReactElement,
} from 'react'
import cx from 'classnames'
import style from './Button.module.css'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  color?: 'primary' | 'secondary' | 'white'
  fluid?: boolean
  size?: 'sm' | 'md'
}

export default function Button({
  children,
  className,
  color = 'primary',
  fluid = false,
  size = 'md',
  ...props
}: PropsWithChildren<Props>): ReactElement {
  const cn = cx(
    className,
    style.button,
    { [style.primary]: color === 'primary' },
    { [style.secondary]: color === 'secondary' },
    { [style.white]: color === 'white' },
    { [style.fluid]: fluid },
    { [style.small]: size === 'sm' }
  )
  return (
    <button {...props} className={cn}>
      {children}
    </button>
  )
}
