import { HTMLAttributes } from 'react'
import cx from 'classnames'

export const FormField: React.FC<
  { label: string; htmlFor: string } & HTMLAttributes<HTMLDivElement>
> = ({ label, htmlFor, children, className, ...props }) => {
  const cn = cx('flex flex-col-reverse flex-1 r', className)
  return (
    <div className={cn} {...props}>
      {children}
      <label htmlFor={htmlFor}>{label}</label>
    </div>
  )
}
