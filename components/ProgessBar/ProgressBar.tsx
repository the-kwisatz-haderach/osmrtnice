import { Box, Progress } from '@chakra-ui/react'
import { memo } from 'react'

interface Props {
  show: boolean
}

const ProgressBar: React.FC<Props> = ({ show }) => (
  <Box position="relative" height="8px">
    {show && (
      <Progress
        position="absolute"
        inset={0}
        size="sm"
        colorScheme="gray"
        isIndeterminate
      />
    )}
  </Box>
)

export default memo(ProgressBar)
