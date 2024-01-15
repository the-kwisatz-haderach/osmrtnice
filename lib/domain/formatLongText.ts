import { IObituary } from './types'
import ReactDOMServer from 'react-dom/server'

import { render } from 'storyblok-rich-text-react-renderer'

const htmlTagsRegexp = /<(?:"[^"]*"['"]*|'[^']*'['"]*|[^'">])+>/g

export const stringifyLongText = (text: IObituary['long_text']): string =>
  typeof text === 'string'
    ? text.replace(htmlTagsRegexp, '')
    : ReactDOMServer.renderToString(render(text)).replace(htmlTagsRegexp, '')
