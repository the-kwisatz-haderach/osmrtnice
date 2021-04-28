import React, { ReactElement, useState } from 'react'
import dynamic from 'next/dynamic'
import { Input } from '../../components/Input'
import { SelectComponentsProps } from 'react-select/src/Select'

const Select = dynamic<SelectComponentsProps>(() => import('react-select'), {
  ssr: false,
})

interface Props {}

const cities = [
  {
    value: 'stockholm',
    label: 'Stockholm',
  },
  { value: 'split', label: 'Split' },
  { value: 'gothenburg', label: 'Gothenburg' },
]

export default function ObituaryFilter({}: Props): ReactElement {
  const [selectedCities, setSelectedCities] = useState<
    { value: string; label: string }[]
  >([])
  return (
    <div className="p-5 flex justify-center items-center bg-primary-200 space-x-5">
      <div className="w-1/4">
        <label className="flex flex-col">
          Name
          <Input onChange={console.log} />
        </label>
      </div>
      <div className="w-1/4">
        <label>
          City
          <Select
            isMulti
            options={cities}
            value={selectedCities}
            onChange={setSelectedCities}
          />
        </label>
      </div>
    </div>
  )
}
