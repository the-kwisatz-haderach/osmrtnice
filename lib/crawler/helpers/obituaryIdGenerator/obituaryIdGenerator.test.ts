import { IObituary } from '../../../domain/types'
import obituaryIdGenerator from './obituaryIdGenerator'

const obituary: IObituary = {
  firstname: 'Nazlija',
  surname: 'Ramusović',
  date_of_birth: null,
  date_of_death: null,
  image:
    'https://cdn.oslobodjenje.ba/images/slike/2021/03/08/ob_media_79832-160.jpg',
  type: 'OBITUARY',
  long_text: 'preselila na ahiret u petak, 5. marta 2021, u 88. godini..',
  middlename: 'Lika',
  relative: 'Ožalošćeni: kćerka Memnuna, sestra Nusreta, brat Basrija.',
}

describe('obituaryIdGenerator', () => {
  it('generates an id from an obituary', () => {
    expect(obituaryIdGenerator(obituary)).toEqual('78971221081051069776')
  })
})
