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
import { Controller, useForm } from 'react-hook-form'
import { FormField } from '../FormField/FormField'
import { obituaryTypes } from '../../../lib/domain'
import { useTranslation } from 'next-i18next'

interface IContactFormInput {
  firstname: string
  lastname: string
  phone: string
  mail: string
  message: string
  type: string
}

export default function ContactForm(): ReactElement {
  const { t } = useTranslation()
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<IContactFormInput>({
    defaultValues: {
      firstname: '',
      lastname: '',
      mail: '',
      message: '',
      phone: '',
      type: '',
    },
  })

  const onSubmit = handleSubmit(async (data) => {
    await axios.post('/api/obituaries/email', data)
    reset({})
  })

  return (
    <VStack
      as="form"
      spacing={3}
      onSubmit={onSubmit}
      p={[0, 6, 10]}
      boxShadow={{ sm: 'xl' }}
      width="100%"
      maxW="xl"
      borderColor="gray.100"
      borderWidth={{ sm: 2 }}
      borderStyle="solid"
    >
      <Flex flexDir={['column', 'row']} wrap="wrap" width="100%">
        <FormField
          flex={1}
          mr={[0, 2]}
          mb={[2, 0]}
          errors={errors}
          htmlFor="firstname"
          label={t('firstname')}
        >
          <Controller
            name="firstname"
            control={control}
            rules={{
              required: (t('required') as unknown) as string,
            }}
            render={({ field: { value, onChange } }) => (
              <Input
                autoFocus
                autoComplete="given-name"
                id="firstname"
                type="text"
                onChange={onChange}
                value={value}
              />
            )}
          />
        </FormField>
        <FormField
          flex={1}
          errors={errors}
          htmlFor="lastname"
          label={t('lastname')}
        >
          <Controller
            name="lastname"
            control={control}
            rules={{
              required: (t('required') as unknown) as string,
            }}
            render={({ field: { value, onChange } }) => (
              <Input
                autoComplete="family-name"
                id="lastname"
                type="text"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </FormField>
      </Flex>
      <Box width="100%">
        <FormField errors={errors} htmlFor="email" label={t('mail')}>
          <Controller
            name="mail"
            control={control}
            rules={{
              required: (t('required') as unknown) as string,
            }}
            render={({ field: { value, onChange } }) => (
              <Input
                value={value}
                onChange={onChange}
                autoComplete="email"
                id="email"
                type="email"
              />
            )}
          />
        </FormField>
        <FormField errors={errors} htmlFor="phone" label={t('phone')}>
          <Controller
            name="phone"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Input
                autoComplete="phone"
                id="phone"
                type="tel"
                value={value}
                onChange={onChange}
              />
            )}
          />
        </FormField>
      </Box>
      <Box width="100%">
        <FormField errors={errors} htmlFor="type" label={t('type')}>
          <Controller
            name="type"
            control={control}
            render={({ field: { value, onChange } }) => (
              <Select
                onChange={onChange}
                value={value}
                autoComplete="off"
                id="type"
              >
                <option value="" disabled>
                  {t('select_placeholder')}
                </option>
                {obituaryTypes.map((type) => (
                  <option key={type} value={type}>
                    {t(type)}
                  </option>
                ))}
              </Select>
            )}
          />
        </FormField>
      </Box>
      <Box width="100%">
        <FormField errors={errors} htmlFor="message" label={t('message')}>
          <Controller
            control={control}
            name="message"
            render={({ field: { onChange, value } }) => (
              <Textarea
                value={value}
                onChange={onChange}
                style={{
                  minHeight: '2.5rem',
                  maxHeight: '10rem',
                }}
                id="message"
                rows={5}
              />
            )}
          />
        </FormField>
      </Box>
      <Button
        alignSelf="flex-end"
        position="relative"
        top={3}
        disabled={!isDirty || Object.keys(errors).length !== 0}
        onClick={onSubmit}
        type="submit"
        colorScheme="orange"
      >
        {t('submit')}
      </Button>
    </VStack>
  )
}
