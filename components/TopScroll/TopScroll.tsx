import React, { ReactElement } from 'react'
import { Box, BoxProps, IconButton, Fade } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp as scrollTopIcon } from '@fortawesome/free-solid-svg-icons'

interface Props extends BoxProps {
  onClick: () => void
  show: boolean
}

export default function TopScroll({
  onClick,
  show,
  ...boxProps
}: Props): ReactElement {
  return (
    <Box
      {...boxProps}
      textAlign="right"
      position="sticky"
      bottom={0}
      pointerEvents="none"
    >
      <Fade
        in={show}
        transition={{
          enter: {
            delay: 1,
            duration: 1,
          },
          exit: {
            delay: 1,
            duration: 1,
          },
        }}
      >
        <IconButton
          pointerEvents="all"
          colorScheme="orange"
          onClick={onClick}
          aria-label="Scroll to top"
          isRound
          icon={<FontAwesomeIcon icon={scrollTopIcon} />}
        />
      </Fade>
    </Box>
  )
}
