import { useRouter } from 'next/router'
import Link, { LinkProps } from 'next/link'
import { pathTranslations } from '../../pathTranslations'

export const TranslatedLink: React.FC<LinkProps> = ({
  href,
  children,
  ...linkProps
}) => {
  const { locale, defaultLocale } = useRouter()
  const localePath: string =
    locale === defaultLocale || !locale ? '' : `/${locale}`
  // Get translated route for non-default locales
  const translatedPath: string = pathTranslations[locale]?.[href as string]
  // Set `as` prop to change displayed URL in browser
  const as = translatedPath ? `${localePath}${translatedPath}` : undefined
  return (
    <Link {...linkProps} href={href} as={as} passHref>
      {children}
    </Link>
  )
}
