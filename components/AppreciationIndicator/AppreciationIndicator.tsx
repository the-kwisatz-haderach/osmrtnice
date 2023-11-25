import React, { memo, ReactElement } from 'react'
import Image, { StaticImageData } from 'next/image'
import { Box, Button, Text } from '@chakra-ui/react'
import { FaithType } from '../../lib/domain/types'
import christian from './images/candle.png'
import muslim from './images/koran.png'

interface Props {
  faithType?: FaithType
  appreciations: number
  isClicked: boolean
  onClick: () => void
  size?: 'regular' | 'large'
}

const icons: Record<FaithType | 'default', StaticImageData> = {
  christian,
  muslim,
  default: christian,
}

function AppreciationIndicator({
  faithType,
  isClicked,
  appreciations,
  onClick,
  size = 'regular',
}: Props): ReactElement {
  const src = icons[faithType] ?? icons.default
  return (
    <Box display="inline-flex" alignItems="center">
      <Button
        aria-label="Show appreciation"
        variant="unstyled"
        onClick={onClick}
        position="relative"
        maxHeight={size === 'large' ? 50 : 25}
        sx={{
          '& img': {
            filter: `saturate(${isClicked ? 1 : 0})`,
          },
          '&:hover img': {
            filter: 'saturate(1)',
          },
        }}
      >
        <Image alt="" src={src} fill sizes="100vw" />
      </Button>
      <Text
        hidden={appreciations < 1}
        fontSize={size === 'large' ? 'xl' : 'md'}
        lineHeight={1}
        ml={size === 'large' ? 4 : 2}
      >
        {appreciations}
      </Text>
    </Box>
  )
}

export default memo(AppreciationIndicator)
