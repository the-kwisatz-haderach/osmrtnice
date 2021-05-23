import { GetStaticPaths, GetStaticProps } from 'next'
import React, { ReactElement } from 'react'
import { PageHeaderBlok } from '../../components/StoryBlok/PageHeaderBlok'
import { RichTextBlok } from '../../components/StoryBlok/RichTextBlok'
import { IObituary } from '../../lib/domain/types'
import Storyblok from '../../lib/storyblok/client'
import { Story } from '../../lib/storyblok/types'
import { formatDate } from '../../utils/formatDate'

export default function Obituary({
  firstname,
  middlename,
  surname,
  date_of_birth,
  date_of_death,
  image,
  preamble,
  long_text,
}: IObituary): ReactElement {
  return (
    <div>
      <PageHeaderBlok
        title={[firstname, middlename, surname].join(' ')}
        subtitle={`${formatDate(date_of_birth)} - ${formatDate(date_of_death)}`}
      />
      <div className="contained p-10">
        <p className="font-serif text-3xl"></p>
      </div>
      <RichTextBlok text={long_text} />
    </div>
  )
}

export const getStaticProps: GetStaticProps<
  IObituary,
  { slug: string }
> = async ({ params }) => {
  const response = await Storyblok.getStory(`obituaries/${params?.slug}`, {
    version: 'draft',
  })

  return {
    props: (response.data.story as Story<IObituary>).content,
  }
}

export const getStaticPaths: GetStaticPaths = async () => {
  const response = await Storyblok.getStories({
    starts_with: 'obituaries',
    version: 'draft',
    is_startpage: 0,
  })

  return {
    paths: response.data.stories.map((story) => ({
      params: { slug: story.slug },
      locale: 'en',
    })),
    fallback: false,
  }
}
