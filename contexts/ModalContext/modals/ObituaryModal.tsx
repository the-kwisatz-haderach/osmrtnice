import { ObituaryLarge } from '../../../components/Obituary/ObituaryLarge'
import { IObituary } from '../../../lib/domain/types'
import { ModalTemplate } from './ModalTemplate'

export const ObituaryModal: React.FC<IObituary & { appreciations: number }> = (
  props
) => {
  return (
    <ModalTemplate title={props.firstname}>
      <ObituaryLarge {...props} />
    </ModalTemplate>
  )
}
