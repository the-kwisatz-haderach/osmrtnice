import axios from 'axios'
import React, { ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../../Button'
import { FormField } from '../FormField/FormField'

export default function ContactForm(): ReactElement {
  const { register, handleSubmit } = useForm()

  const onSubmit = () => {
    return axios.post('/api/obituaries', { test: 'hello ' }).then(console.log)
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col w-full max-w-2xl shadow-xl space-y-4 bg-primary-100 px-5 md:px-10 py-8 md:py-16 border border-primary-200"
    >
      <div className="flex justify-between sm:space-x-4 flex-wrap space-y-4">
        <FormField htmlFor="firstname" label="Firstname">
          <input
            autoComplete="given-name"
            id="firstname"
            type="text"
            {...register('firstname', {
              required: true,
            })}
          />
        </FormField>
        <FormField htmlFor="lastname" label="Lastname">
          <input
            autoComplete="family-name"
            id="lastname"
            type="text"
            {...register('lastname', {
              required: true,
            })}
          />
        </FormField>
      </div>
      <FormField htmlFor="email" label="Email">
        <input
          autoComplete="email"
          id="email"
          type="email"
          {...register('email', {
            required: true,
          })}
        />
      </FormField>
      <FormField htmlFor="message" label="Message">
        <textarea
          style={{
            minHeight: '2.5rem',
            maxHeight: '10rem',
          }}
          id="message"
          rows={5}
          {...register('message', {
            required: true,
          })}
        />
      </FormField>
      <Button
        style={{
          alignSelf: 'flex-end',
        }}
      >
        Submit
      </Button>
    </form>
  )
}
