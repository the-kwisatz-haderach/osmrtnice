import React, { ReactElement } from 'react'
import { Button, Flex } from '@chakra-ui/react'

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
        <Flex justifyContent="space-between" width="100%">
          <Button disabled={index === 0} onClick={onPrev}>
            Previous
          </Button>
          <Button disabled={index + 1 >= totalIndices} onClick={onNext}>
            Next
          </Button>
        </Flex>
      )}
    </>
  )
}
