import React, { ReactElement } from 'react'
import { Box, BoxProps, IconButton } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp as scrollTopIcon } from '@fortawesome/free-solid-svg-icons'

interface Props extends BoxProps {
  onClick: () => void
}

export default function TopScroll({
  onClick,
  ...boxProps
}: Props): ReactElement {
  return (
    <Box {...boxProps} textAlign="right" position="sticky" bottom={0}>
      <IconButton
        colorScheme="orange"
        onClick={onClick}
        aria-label="Scroll to top"
        isRound
        icon={<FontAwesomeIcon icon={scrollTopIcon} />}
      />
    </Box>
  )
}
