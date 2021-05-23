import React, { ReactElement } from 'react'
import Image from 'next/image'
import cx from 'classnames'
import { Obituary as IObituary, ObituaryType } from '../../lib/domain/types'
import { RichText } from '../RichText'
import { formatDate } from '../../utils/formatDate'
import { Link } from '../Link'
import styles from './Obituary.module.css'

export default function Obituary({
  firstname,
  middlename,
  surname,
  preamble,
  long_text,
  relative,
  date_of_birth,
  date_of_death,
  image,
  additional_information,
  slug,
  size = 'regular',
  type = ObituaryType.OBITUARY,
}: IObituary & { slug?: string }): ReactElement {
  return (
    <div
      className={cx(
        'h-full flex flex-col',
        size === 'large' ? 'sm:col-span-2' : 'col-span-1'
      )}
    >
      <div
        style={{
          height: 'fit-content',
        }}
        className="rounded-sm transition-shadow shadow-sm bg-white hover:shadow-lg p-7 border border-gray-200 space-y-4 flex flex-col items-center"
      >
        {image && <Image src={`https://${image}`} width={100} height={100} />}
        <div className="text-center space-y-3">
          {preamble && <p className="text-center text-sm italic">{preamble}</p>}
          <div className="my-2">
            <h3 className="text-md mb-2">
              {[firstname, middlename, surname].join(' ')}
            </h3>
            <div className="text-sm flex justify-center align-center space-x-2 font-bold">
              <p>{formatDate(date_of_birth)}</p>
              <p>-</p>
              <p>{formatDate(date_of_death)}</p>
            </div>
          </div>
        </div>
        {long_text && (
          <p className="text-sm text-center">
            <RichText>{long_text}</RichText>
          </p>
        )}
        {relative != null && relative.length > 0 && (
          <div className="text-xs flex flex-wrap justify-center">
            {relative.split(', ').map((relation) => (
              <div className="mr-5 mb-1" key={relation}>
                {relation}
              </div>
            ))}
          </div>
        )}
        {additional_information && (
          <p className="text-left w-full text-xs pt-4 border-dotted border-t-2">
            {additional_information}
          </p>
        )}
        {slug && <Link href={slug}>Read more</Link>}
      </div>
      {/* <div className="overflow-hidden h-full">
        <div className={cx(styles.pattern, 'h-full relative top-2')} />
      </div> */}
    </div>
  )
}
