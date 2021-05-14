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

export default function ObituarySearch(): ReactElement {
  const [selectedCities, setSelectedCities] = useState<
    Array<{ value: string; label: string }>
  >([])
  return (
    <div className="p-5 flex justify-center items-center space-x-5 w-full">
      <Input
        placeholder="Type something..."
        onChange={(value) => console.log(value)}
      />
      {/* <div className="w-1/4">
        <label>
          City
          <Select
            isMulti
            options={cities}
            value={selectedCities}
            onChange={setSelectedCities}
          />
        </label>
      </div> */}
    </div>
  )
}
