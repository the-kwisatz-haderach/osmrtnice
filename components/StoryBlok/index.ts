import { RichTextBlok } from './RichTextBlok'
import { PageHeaderBlok } from './PageHeaderBlok'
import { GridBlok } from './GridBlok'
import { GridColumn } from './GridColumn'
import { Teaser } from './Teaser'
import { FullWidthCTABlok } from './FullWidthCTABlok'
import { ServiceBlok } from './ServiceBlok'
import { ListBlok } from './ListBlok'
import { PageBlok } from './PageBlok'

export type StoryblokComponentType = keyof typeof components | string

export const components = {
  page: PageBlok,
  rich_text: RichTextBlok,
  page_header: PageHeaderBlok,
  grid: GridBlok,
  grid_column: GridColumn,
  teaser: Teaser,
  full_width_cta: FullWidthCTABlok,
  service: ServiceBlok,
  list: ListBlok,
} as const // satisfies SbReactComponentsMap
