import { useRouter } from 'next/router'
import Link, { LinkProps } from 'next/link'
import { pathTranslations } from '../../pathTranslations'

interface Props extends LinkProps {
  href: string
}

export const TranslatedLink: React.FC<Props> = ({
  href,
  children,
  ...linkProps
}) => {
  const { locale, defaultLocale } = useRouter()
  const localePath: string =
    locale === defaultLocale || !locale ? '' : `/${locale as string}`
  // Get translated route for non-default locales
  const translatedPath: string = pathTranslations[locale]?.[href]
  // Set `as` prop to change displayed URL in browser
  const as = translatedPath ? `${localePath}${translatedPath}` : undefined
  return (
    <Link {...linkProps} href={href} as={as} passHref>
      {children}
    </Link>
  )
}
