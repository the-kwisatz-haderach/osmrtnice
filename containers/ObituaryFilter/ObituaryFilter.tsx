import { ReactElement, useState } from 'react'
import dynamic from 'next/dynamic'
import { Input } from '../../components/Input'

const Select = dynamic(async () => await import('react-select'), {
  ssr: false,
})

const cities = [
  {
    value: 'stockholm',
    label: 'Stockholm',
  },
  { value: 'split', label: 'Split' },
  { value: 'gothenburg', label: 'Gothenburg' },
]

export default function ObituaryFilter(): ReactElement {
  const [selectedCities, setSelectedCities] = useState<
    Array<{ value: string; label: string }>
  >([])
  return (
    <div className="p-5 flex justify-center items-center bg-primary-200 space-x-5">
      <div className="w-1/4">
        <label className="flex flex-col">
          Name
          <Input onChange={(value) => console.log(value)} />
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
