import React, { ReactElement } from 'react'
import { Link } from '../Link'

interface InfoItem {
  content: string
  label?: string
  href?: string
}

interface Props {
  items: InfoItem[]
}

export default function InfoList({ items }: Props): ReactElement {
  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex">
          {item.label && (
            <label className="font-bold mr-2">{item.label}:</label>
          )}
          {item.href ? (
            <Link href={item.href}>{item.content}</Link>
          ) : (
            <p>{item.content}</p>
          )}
        </li>
      ))}
    </ul>
  )
}
