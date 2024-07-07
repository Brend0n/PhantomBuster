import React, { FC } from 'react'
import { Phantom } from './Phantom';
import { getPhantomsList, updateLocalPhantoms } from './helpers';
import { IPhantom } from './types';
type PhantomsProps = {}

export const Phantoms: FC<PhantomsProps> = () => {
  const phantomsList = getPhantomsList();

  return (
    <div>
      <h1>Phantoms</h1>
      <ul className='grid gap-3 p-5 phantomList'>
        {phantomsList.map((phantom) =>
          <Phantom
            key={phantom.id}
            {...phantom}
            onSelect={(phantomSelected: IPhantom) => updateLocalPhantoms(phantomSelected)}
          />)}
      </ul>
    </div>
  )
}
