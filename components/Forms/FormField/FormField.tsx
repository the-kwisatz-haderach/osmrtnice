import { ErrorMessage } from '@hookform/error-message'
import { FieldValues, FormState } from 'react-hook-form'
import { Flex, FlexProps, FormLabel, Text } from '@chakra-ui/react'

export const FormField: React.FC<
  {
    errors: FormState<FieldValues>['errors']
    label: string
    htmlFor: string
  } & FlexProps
> = ({ label, htmlFor, children, className, errors, ...props }) => {
  return (
    <Flex flexDir="column-reverse" position="relative" {...props}>
      <ErrorMessage
        errors={errors}
        name={htmlFor}
        render={({ message }) => (
          <Text
            fontSize="xs"
            float="right"
            position="absolute"
            bottom={-5}
            right={1}
            color="red"
          >
            {message}
          </Text>
        )}
      />
      {children}
      <FormLabel textTransform="capitalize" htmlFor={htmlFor}>
        {label}
      </FormLabel>
    </Flex>
  )
}
