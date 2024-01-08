import React, { ReactElement } from 'react'
import { Box, BoxProps, IconButton } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowUp as scrollTopIcon } from '@fortawesome/free-solid-svg-icons'
import styles from './TopScroll.module.css'

interface Props extends BoxProps {
  onClick: () => void
  show: boolean
}

export default function TopScroll({
  onClick,
  show,
  ...boxProps
}: Props): ReactElement {
  return show ? (
    <Box
      {...boxProps}
      textAlign="right"
      position="sticky"
      bottom={0}
      pointerEvents="none"
      className={styles.wrapper}
      px={3}
      py={[3, 3, 5]}
    >
      <IconButton
        pointerEvents="all"
        colorScheme="brand"
        onClick={onClick}
        aria-label="Scroll to top"
        isRound
        icon={<FontAwesomeIcon icon={scrollTopIcon} />}
      />
    </Box>
  ) : null
}
