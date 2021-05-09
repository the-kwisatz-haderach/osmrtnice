import React, { ReactElement } from 'react'
import Image from 'next/image'

export interface Props {
  name: string
  dateOfBirth: string
  dateOfDeath: string
  imgSrc: string
  personalMessage?: string
  preamble?: string
  relations?: string[]
  additionalInformation?: string
  size: 'regular' | 'large'
}

export default function Obituary({
  name,
  preamble,
  personalMessage,
  relations,
  dateOfBirth,
  dateOfDeath,
  imgSrc,
  additionalInformation,
}: Props): ReactElement {
  return (
    <div className="h-full rounded-sm transition-shadow shadow-sm hover:shadow-lg p-7 border border-gray-200 space-y-4 flex flex-col items-center">
      <Image src={imgSrc} width={100} height={100} />
      <div className="text-center space-y-3">
        {preamble && <p className="text-center text-sm italic">{preamble}</p>}
        <div className="my-2">
          <h2 className="text-md mb-2">{name}</h2>
          <div className="text-sm flex justify-center align-center space-x-2 font-bold">
            <p>{dateOfBirth}</p>
            <p>-</p>
            <p>{dateOfDeath}</p>
          </div>
        </div>
      </div>
      {personalMessage && (
        <p className="text-sm text-center">{personalMessage}</p>
      )}
      {relations != null && relations.length > 0 && (
        <div className="text-xs flex flex-wrap justify-center">
          {relations.map((relation) => (
            <div className="mr-5 mb-1" key={relation}>
              {relation}
            </div>
          ))}
        </div>
      )}
      {additionalInformation && (
        <p className="text-left w-full text-xs pt-4 border-dotted border-t-2">
          {additionalInformation}
        </p>
      )}
    </div>
  )
}
