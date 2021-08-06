import { HTMLAttributes } from 'react'
import { ErrorMessage } from '@hookform/error-message'
import cx from 'classnames'
import { FieldValues, FormState } from 'react-hook-form'

export const FormField: React.FC<
  {
    errors: FormState<FieldValues>['errors']
    label: string
    htmlFor: string
  } & HTMLAttributes<HTMLDivElement>
> = ({ label, htmlFor, children, className, errors, ...props }) => {
  const cn = cx('flex flex-col-reverse flex-1 r relative', className)
  return (
    <div className={cn} {...props}>
      <ErrorMessage
        errors={errors}
        name={htmlFor}
        render={({ message }) => (
          <p className="absolute -bottom-5 right-1 text-xs text-red-600 float-right">
            {message}
          </p>
        )}
      />
      {children}
      <label className="capitalize" htmlFor={htmlFor}>
        {label}
      </label>
    </div>
  )
}
