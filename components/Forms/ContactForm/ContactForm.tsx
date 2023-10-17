import React, { ReactElement } from 'react'
import {
  Button,
  Flex,
  FormLabel,
  HStack,
  Input,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Select,
  Tag,
  TagLabel,
  Text,
  Textarea,
  useToast,
  VStack,
} from '@chakra-ui/react'
import axios from 'axios'
import { Controller, useForm } from 'react-hook-form'
import { FormField } from '../FormField/FormField'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronDown as menuIcon } from '@fortawesome/free-solid-svg-icons'
import { obituarySymbols, obituaryTypes } from '../../../lib/domain'
import { useTranslation } from 'next-i18next'
import { useMutation } from '@tanstack/react-query'
import Image from 'next/image'
import useAppContext from 'contexts/AppContext'

export interface IContactFormInput {
  firstname: string
  lastname: string
  phone: string
  mail: string
  message: string
  type: string
  symbol: string
  photo: FileList
}

export default function ContactForm(): ReactElement {
  const { imageUploadText } = useAppContext()
  const { t } = useTranslation()
  const toast = useToast({ isClosable: true, position: 'top' })
  const {
    control,
    getValues,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<IContactFormInput>({
    shouldFocusError: true,
    defaultValues: {
      firstname: '',
      lastname: '',
      mail: '',
      message: '',
      phone: '',
      type: '',
      symbol: 'without_symbol',
      photo: [],
    },
  })
  const { mutate, isLoading } = useMutation(
    async ({ photo, ...input }: IContactFormInput) => {
      const honey = document.getElementById('name') as HTMLInputElement
      if (honey.value !== '') {
        return
      }
      const formData = new FormData()
      Array.from(photo).forEach((file) => {
        formData.append('files', file)
      })
      formData.set('input', JSON.stringify(input))
      return await axios.post('/api/obituaries/email', formData)
    },
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
          symbol: 'without_symbol',
          photo: [],
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
      action="/api/obituaries/email"
      method="post"
      encType="multipart/form-data"
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
      <FormField width="100%" errors={errors} htmlFor="mail" label={t('mail')}>
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
              id="mail"
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
          rules={{
            required: (t('required') as unknown) as string,
          }}
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
      <Flex flexDir={['column', 'row']} wrap="wrap" width="100%" gap={4}>
        <FormField flex={1} errors={errors} htmlFor="type" label={t('type')}>
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
        <Flex flexDir="column" flex={1}>
          <FormLabel fontWeight="bold" htmlFor="symbol">
            {t('symbol')}
          </FormLabel>
          <Controller
            name="symbol"
            control={control}
            render={({ field: { value, onChange } }) => {
              const selectedImage = obituarySymbols.find(
                (s) => s.type === value
              )?.imgSrc
              return (
                <Menu>
                  <MenuButton
                    variant="outline"
                    as={Button}
                    rightIcon={<FontAwesomeIcon icon={menuIcon} />}
                  >
                    <Flex
                      alignItems="center"
                      gap={2}
                      width="100%"
                      justifyContent="center"
                    >
                      {selectedImage && (
                        <Image src={selectedImage} width={20} height={20} />
                      )}
                      <Text
                        fontWeight="normal"
                        mt={1}
                        sx={{
                          '&:first-letter': {
                            textTransform: 'capitalize',
                          },
                        }}
                      >
                        {t(value)}
                      </Text>
                    </Flex>
                  </MenuButton>
                  <MenuList>
                    <MenuItem
                      onClick={() => onChange('without_symbol')}
                      sx={{
                        '& > span:first-letter': {
                          textTransform: 'capitalize',
                        },
                      }}
                    >
                      <span>{t('without_symbol')}</span>
                    </MenuItem>
                    {obituarySymbols.map(({ type, imgSrc }) => {
                      const label = t(type)
                      return (
                        <MenuItem
                          key={type}
                          onClick={() => onChange(type)}
                          sx={{
                            '& > span:first-letter': {
                              textTransform: 'capitalize',
                            },
                          }}
                          display="flex"
                          alignItems="center"
                          gap={4}
                        >
                          <Image src={imgSrc} width={30} height={30} />
                          <span>{label}</span>
                        </MenuItem>
                      )
                    })}
                  </MenuList>
                </Menu>
              )
            }}
          />
        </Flex>
      </Flex>
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
      <Flex
        justifyContent="space-between"
        width="100%"
        flexDir={['column', 'row']}
        gap={4}
      >
        <Controller
          name="photo"
          control={control}
          render={({ field: { onChange } }) => {
            return (
              <Button as="label" cursor="pointer" colorScheme="gray">
                {t('photo')}
                <input
                  type="file"
                  style={{
                    display: 'none',
                  }}
                  id="photo"
                  multiple
                  onChange={(event) => {
                    onChange(event.target.files)
                  }}
                />
              </Button>
            )
          }}
        />
        <Button
          isLoading={isLoading}
          disabled={!isDirty || Object.keys(errors).length !== 0}
          onClick={onSubmit}
          type="submit"
          colorScheme="orange"
        >
          {t('submit')}
        </Button>
      </Flex>
      <Text w="100%" fontSize="xs">
        {imageUploadText}
      </Text>
      <HStack width="100%" wrap="wrap" gap={2} spacing={0}>
        {Array.from(getValues('photo')).map((file) => (
          <Tag size="sm" key={file.name} borderRadius="full" variant="subtle">
            <TagLabel>{file.name}</TagLabel>
          </Tag>
        ))}
      </HStack>
    </VStack>
  )
}
