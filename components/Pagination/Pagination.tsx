import React, { ReactElement } from 'react'
import { Button } from '../Button'

interface Props {
  index: number
  totalIndices: number
  onNext: () => void
  onPrev: () => void
}

export default function Pagination({
  index,
  totalIndices,
  onNext,
  onPrev,
}: Props): ReactElement {
  return (
    <>
      {totalIndices > 1 && (
        <div className="flex justify-between w-full space-x-5">
          <Button disabled={index === 0} onClick={onPrev}>
            Previous
          </Button>
          <Button disabled={index + 1 >= totalIndices} onClick={onNext}>
            Next
          </Button>
        </div>
      )}
    </>
  )
}
