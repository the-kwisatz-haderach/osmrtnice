import { IAppContext } from '../../contexts/AppContext'
import { StoryBlokLink } from './common/types'

type IAppLinks = Record<string, IAppContext['menuItems']>

export const makeAppLinks = (
  defaultLocale: string,
  ignorePaths: string[] = []
) => (links: StoryBlokLink[]): IAppLinks =>
  links.reduce<IAppLinks>((acc, curr) => {
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
