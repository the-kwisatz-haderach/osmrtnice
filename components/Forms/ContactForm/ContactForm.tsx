import axios from 'axios'
import React, { ReactElement } from 'react'
import { useForm } from 'react-hook-form'
import { Button } from '../../Button'
import { FormField } from '../FormField/FormField'

export default function ContactForm(): ReactElement {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const onSubmit = handleSubmit((data) => {
    return axios.post('/api/obituaries', data).then(reset)
  })

  return (
    <form
      onSubmit={onSubmit}
      className="flex flex-col w-full max-w-2xl shadow-xl space-y-4 bg-primary-100 px-5 md:px-10 py-8 md:py-16 border border-primary-200"
    >
      <div className="flex justify-between sm:space-x-4 flex-wrap space-y-4">
        <FormField errors={errors} htmlFor="firstname" label="firstname*">
          <input
            autoFocus
            autoComplete="given-name"
            id="firstname"
            type="text"
            {...register('firstname', {
              required: 'Required',
            })}
          />
        </FormField>
        <FormField errors={errors} htmlFor="lastname" label="lastname*">
          <input
            autoComplete="family-name"
            id="lastname"
            type="text"
            {...register('lastname', {
              required: 'Required',
            })}
          />
        </FormField>
      </div>
      <div className="flex justify-between sm:space-x-4 flex-wrap space-y-4">
        <FormField errors={errors} htmlFor="email" label="email*">
          <input
            autoComplete="email"
            id="email"
            type="email"
            {...register('email', {
              required: 'Required',
            })}
          />
        </FormField>
        <FormField errors={errors} htmlFor="phone" label="phone">
          <input
            autoComplete="phone"
            id="phone"
            type="tel"
            {...register('phone')}
          />
        </FormField>
      </div>
      <div className="flex justify-between sm:space-x-4 flex-wrap space-y-4">
        <FormField errors={errors} htmlFor="type" label="type">
          <select autoComplete="off" id="type" {...register('type')}>
            <option>Obituary</option>
            <option>In memoriam</option>
          </select>
        </FormField>
      </div>
      <div className="flex justify-between sm:space-x-4 flex-wrap space-y-4">
        <FormField errors={errors} htmlFor="message" label="message*">
          <textarea
            style={{
              minHeight: '2.5rem',
              maxHeight: '10rem',
            }}
            id="message"
            rows={5}
            {...register('message', {
              required: 'Required',
            })}
          />
        </FormField>
      </div>
      <Button
        style={{
          position: 'relative',
          top: 10,
          alignSelf: 'flex-end',
        }}
      >
        Submit
      </Button>
    </form>
  )
}
