import { useCallback, useMemo } from 'react'
import throttle from 'lodash.throttle'
import { IObituary } from '../../lib/domain/types'
import { useIncrementAppreciation } from '../../hooks/reactQuery/mutations'

interface RendererProps extends IObituary {
  onShowAppreciation: () => void
}

export type ObituaryRenderer = React.FC<RendererProps>

interface Props extends IObituary {
  Renderer: ObituaryRenderer
}

export const ObituaryContainer = ({ Renderer, ...props }: Props) => {
  const { mutate } = useIncrementAppreciation()
  const throttledMutate = useMemo(() => throttle(mutate, 2000), [mutate])
  const onShowAppreciation = useCallback(() => {
    const isClicked = Boolean(
      typeof window !== 'undefined' && window.localStorage.getItem(props._id)
    )
    throttledMutate({
      id: props._id,
      increment: isClicked ? -1 : 1,
    })
  }, [throttledMutate, props._id])

  return <Renderer {...props} onShowAppreciation={onShowAppreciation} />
}
