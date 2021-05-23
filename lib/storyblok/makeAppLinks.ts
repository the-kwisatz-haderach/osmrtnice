import { IAppContext } from '../../contexts/AppContext'
import { StoryBlokLink } from './common/types'

export const makeAppLinks = (defaultLocale: string) => (
  links: StoryBlokLink[]
): { [key: string]: IAppContext['menuItems'] } => {
  return links.reduce((acc, curr) => {
    if (curr.alternates) {
      curr.alternates.forEach((alternate) => {
        if (!acc[alternate.lang]) {
          acc[alternate.lang] = []
        }
        acc[alternate.lang].push({
          label: alternate.name ?? curr.name,
          href: curr.real_path,
        })
      })
    }
    return {
      [defaultLocale]: [
        ...(acc[defaultLocale] ?? []),
        {
          label: curr.name,
          href: curr.real_path,
        },
      ],
    }
  }, {})
}
