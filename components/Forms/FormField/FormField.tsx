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
    <Flex
      sx={{
        '& > :nth-of-type(1):hover + *': {
          color: 'brand.300',
        },
        '& > :nth-of-type(1):focus + *': {
          color: 'brand.400',
        },
      }}
      flexDir="column-reverse"
      position="relative"
      {...props}
    >
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
      <FormLabel fontWeight="bold" className="capitalize" htmlFor={htmlFor}>
        {label}
      </FormLabel>
    </Flex>
  )
}
