import { IAppContext } from '../../contexts/AppContext'
import { StoryBlokLink } from './common/types'

export const makeAppLinks = (
  defaultLocale: string,
  ignorePaths: string[] = []
) => (links: StoryBlokLink[]): { [key: string]: IAppContext['menuItems'] } => {
  return links.reduce((acc, curr) => {
    if (ignorePaths.includes(curr.slug)) {
      return acc
    }
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
