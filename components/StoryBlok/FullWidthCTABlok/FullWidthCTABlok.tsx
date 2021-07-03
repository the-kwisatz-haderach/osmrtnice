import React, { ReactElement } from 'react'
import { Richtext } from 'storyblok-js-client'
import { useRouter } from 'next/router'
import { RichText } from '../../RichText'
import { Button } from '../../Button'
import { LinkField } from '../../../lib/storyblok/common/types'

interface Props {
  title: string
  body: Richtext
  ctaLabel: string
  ctaHref: LinkField
}

export default function FullWidthCTABlok({
  title,
  body,
  ctaLabel,
  ctaHref,
}: Props): ReactElement {
  const router = useRouter()

  const onClickCTA = async (): Promise<void> => {
    await router.push(ctaHref.cached_url)
  }

  return (
    <div className="bg-primary-600">
      <div className="contained text-white flex flex-col md:flex-row md:items-center px-10 py-14 space-y-10 md:space-y-0 m-auto lg:w-3/4">
        <div className="md:mr-20">
          <p className="text-2xl md:text-4xl font-bold mb-4">{title}</p>
          <RichText>{body}</RichText>
        </div>
        <Button color="white" onClick={onClickCTA}>
          {ctaLabel}
        </Button>
      </div>
    </div>
  )
}
