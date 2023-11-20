import { HStack, Tag, TagLabel } from '@chakra-ui/react'
import { ContactFormInput } from 'lib/domain/types'
import { Control, useWatch } from 'react-hook-form'

export const FilesList = ({
  control,
}: {
  control: Control<ContactFormInput>
}) => {
  const photos = useWatch({ control, name: 'photo' })
  return (
    <HStack width="100%" wrap="wrap" gap={2} spacing={0}>
      {Array.from(photos).map((file) => (
        <Tag size="sm" key={file.name} borderRadius="full" variant="subtle">
          <TagLabel>{file.name}</TagLabel>
        </Tag>
      ))}
    </HStack>
  )
}
