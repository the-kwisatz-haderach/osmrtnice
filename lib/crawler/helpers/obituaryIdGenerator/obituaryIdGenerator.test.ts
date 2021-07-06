import { Obituary, ObituaryType } from '../../../domain/obituary/types'
import obituaryIdGenerator from './obituaryIdGenerator'

const obituary: Obituary = {
  firstname: 'Nazlija',
  surname: 'Ramusović',
  dateOfBirth: null,
  dateOfDeath: null,
  imgUrl:
    'https://cdn.oslobodjenje.ba/images/slike/2021/03/08/ob_media_79832-160.jpg',
  type: ObituaryType.OBITUARY,
  description: 'preselila na ahiret u petak, 5. marta 2021, u 88. godini..',
  middlename: 'Lika',
  relative: 'Ožalošćeni: kćerka Memnuna, sestra Nusreta, brat Basrija.',
}

describe('obituaryIdGenerator', () => {
  it('generates an id from an obituary', () => {
    expect(obituaryIdGenerator(obituary)).toEqual('78971221081051069776')
  })
})
