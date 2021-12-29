import React, { ReactElement } from 'react'
import {
  Box,
  Button,
  Flex,
  Input,
  Select,
  Textarea,
  VStack,
} from '@chakra-ui/react'
import axios from 'axios'
import { useForm } from 'react-hook-form'
import { FormField } from '../FormField/FormField'

export default function ContactForm(): ReactElement {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = handleSubmit((data) =>
    axios.post('/api/obituaries', data).then(reset)
  )

  return (
    <VStack
      as="form"
      spacing={2}
      onSubmit={onSubmit}
      p={[4, 10]}
      boxShadow="xl"
      width="100%"
      maxW="xl"
      borderColor="gray.100"
      borderWidth={2}
      borderStyle="solid"
    >
      <Flex flexDir={['column', 'row']} wrap="wrap" width="100%">
        <FormField
          flex={1}
          mr={[0, 2]}
          mb={[2, 0]}
          errors={errors}
          htmlFor="firstname"
          label="firstname*"
        >
          <Input
            autoFocus
            autoComplete="given-name"
            id="firstname"
            type="text"
            {...register('firstname', {
              required: 'Required',
            })}
          />
        </FormField>
        <FormField
          flex={1}
          errors={errors}
          htmlFor="lastname"
          label="lastname*"
        >
          <Input
            autoComplete="family-name"
            id="lastname"
            type="text"
            {...register('lastname', {
              required: 'Required',
            })}
          />
        </FormField>
      </Flex>
      <Box width="100%">
        <FormField errors={errors} htmlFor="email" label="email*">
          <Input
            autoComplete="email"
            id="email"
            type="email"
            {...register('email', {
              required: 'Required',
            })}
          />
        </FormField>
        <FormField errors={errors} htmlFor="phone" label="phone">
          <Input
            autoComplete="phone"
            id="phone"
            type="tel"
            {...register('phone')}
          />
        </FormField>
      </Box>
      <Box width="100%">
        <FormField errors={errors} htmlFor="type" label="type">
          <Select autoComplete="off" id="type" {...register('type')}>
            <option>Obituary</option>
            <option>In memoriam</option>
            <option>Gratitude display</option>
            <option>Last greetings</option>
          </Select>
        </FormField>
      </Box>
      <Box width="100%">
        <FormField errors={errors} htmlFor="message" label="message*">
          <Textarea
            style={{
              minHeight: '2.5rem',
              maxHeight: '10rem',
            }}
            id="message"
            rows={5}
            {...register('message')}
          />
        </FormField>
      </Box>
      <Button
        alignSelf="flex-end"
        position="relative"
        top={3}
        onClick={onSubmit}
        type="submit"
        colorScheme="orange"
      >
        Submit
      </Button>
    </VStack>
  )
}
