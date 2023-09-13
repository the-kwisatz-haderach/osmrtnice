import React, { ReactElement } from 'react'
import {
  Button,
  Flex,
  Input,
  Select,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
import { FormField } from '../FormField/FormField'
import { obituaryTypes } from '../../../lib/domain'
import { useTranslation } from 'next-i18next'
import { useMutation } from '@tanstack/react-query'

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
  const toast = useToast({ isClosable: true, position: 'top' })
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
  const { mutate, isLoading } = useMutation(
    async (input: IContactFormInput) =>
      await axios.post('/api/obituaries/email', input),
    {
      onSuccess: () => {
        toast({
          title: t('toast-contact-form-success-title'),
          description: t('toast-contact-form-success-description'),
          status: 'success',
        })
        reset({
          firstname: '',
          lastname: '',
          mail: '',
          message: '',
          phone: '',
          type: '',
        })
      },
      onError: (err) => {
        let description = ''
        if (err instanceof Error) {
          description = err.message
        }
        toast({
          title: t('toast-contact-form-error-title'),
          description,
          position: 'top',
          status: 'error',
        })
      },
    }
  )

  const onSubmit = handleSubmit((data) => {
    if (!isLoading) {
      mutate(data)
    }
  })

  return (
    <VStack
      as="form"
      spacing={3}
      onSubmit={onSubmit}
      p={[0, 6, 10]}
      boxShadow={{ sm: 'xl' }}
      width="100%"
      maxW={['unset', 'unset', 'xl']}
      borderColor="gray.100"
      borderWidth={{ sm: 2 }}
      borderStyle="solid"
    >
      <label className="honey" htmlFor="name"></label>
      <input
        className="honey"
        autoComplete="off"
        type="text"
        id="name"
        name="name"
        placeholder="Your name here"
      />
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
      <FormField width="100%" errors={errors} htmlFor="email" label={t('mail')}>
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
      <FormField
        width="100%"
        errors={errors}
        htmlFor="phone"
        label={t('phone')}
      >
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
      <FormField width="100%" errors={errors} htmlFor="type" label={t('type')}>
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
              {obituaryTypes.map((type) => {
                const label = t(type)
                return (
                  <option key={type} value={type}>
                    {label[0].toLocaleUpperCase() + label.slice(1)}
                  </option>
                )
              })}
            </Select>
          )}
        />
      </FormField>
      <FormField
        width="100%"
        errors={errors}
        htmlFor="message"
        label={t('message')}
      >
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
      <Button
        isLoading={isLoading}
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
