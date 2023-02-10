import { ObituaryContainer } from '../../../components/Obituary'
import { ObituaryLarge } from '../../../components/Obituary/components/ObituaryLarge'
import { IObituary } from '../../../lib/domain/types'
import { ModalTemplate } from './ModalTemplate'

export const ObituaryModal: React.FC<IObituary & { appreciations: number }> = (
  props
) => {
  return (
    <ModalTemplate>
      <ObituaryContainer {...props} Renderer={ObituaryLarge} />
    </ModalTemplate>
  )
}
