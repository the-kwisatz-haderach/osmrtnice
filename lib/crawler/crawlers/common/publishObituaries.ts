import { identity } from 'lodash'
import Storyblok from 'storyblok-js-client'
import { ObituaryOutputHandler } from '../../types'

const storyBlok = new Storyblok({ accessToken: process.env.STORYBLOK_TOKEN })

export const publishObituaries: ObituaryOutputHandler = async ([
  firstObituary,
]) => {
  const conjoinedName = [
    firstObituary.firstname,
    firstObituary.middlename,
    firstObituary.surname,
  ].filter(identity)

  try {
    const res = await storyBlok.post('/spaces/108099/stories/', {
      story: {
        is_folder: false,
        is_startpage: false,
        publish: true,
        parent_id: '50396248',
        name: 'story',
        // name: conjoinedName.join(' '),
        slug: 'story',
        // slug: conjoinedName.map((name) => name.toLowerCase()).join('-'),
        // type: firstObituary.type,
        // firstname: firstObituary.firstname,
        // middlename: firstObituary.middlename,
        // surname: firstObituary.surname,
        // date_of_death: firstObituary.date_of_death,
        // date_of_birth: firstObituary.date_of_birth,
        // image: firstObituary.image,
      },
    })
    console.log(res)
  } catch (err) {
    console.error(err)
  }
}
