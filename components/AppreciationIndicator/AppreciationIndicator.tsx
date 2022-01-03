import React, { memo, ReactElement } from 'react'
import { Box, Fade, Flex, IconButton, Text } from '@chakra-ui/react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons'
import { FaithType } from '../../lib/domain/types'

interface Props {
  faithType?: FaithType
  appreciations: number
  isClicked: boolean
  onClick: () => void
}

const icons: Record<FaithType, { base: ReactElement; active: ReactElement }> = {
  christian: {
    base: <FontAwesomeIcon icon={faExclamationTriangle} />,
    active: <FontAwesomeIcon color="red" icon={faExclamationTriangle} />,
  },
  muslim: {
    base: <FontAwesomeIcon icon={faExclamationTriangle} />,
    active: <FontAwesomeIcon color="red" icon={faExclamationTriangle} />,
  },
}

function AppreciationIndicator({
  faithType,
  isClicked,
  appreciations,
  onClick,
}: Props): ReactElement {
  const iconType = icons[faithType]
  return (
    <Box display="inline-flex" alignItems="flex-end">
      <Box position="relative">
        <Fade
          in={isClicked}
          style={{
            position: 'absolute',
            inset: 0,
          }}
        >
          <IconButton
            onClick={onClick}
            variant="unstyled"
            aria-label="appreciation-indicator"
            icon={
              iconType?.active ?? (
                <FontAwesomeIcon color="red" icon={faExclamationTriangle} />
              )
            }
            size="xs"
            fontSize={['xs', 'md', 'xl']}
          />
        </Fade>
        <Fade in={!isClicked}>
          <IconButton
            onClick={onClick}
            variant="unstyled"
            aria-label="appreciation-indicator"
            icon={
              iconType?.base ?? <FontAwesomeIcon icon={faExclamationTriangle} />
            }
            size="xs"
            fontSize={['xs', 'md', 'xl']}
          />
        </Fade>
      </Box>
      <Text
        hidden={appreciations < 1}
        fontSize={['xs', 'md', 'xl']}
        lineHeight={1}
        mr={1}
      >
        {appreciations}
      </Text>
    </Box>
  )
}

export default memo(AppreciationIndicator)
