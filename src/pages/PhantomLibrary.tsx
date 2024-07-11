import { FC, useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

import { Phantom } from '../components/Phantom';
import { getLocalPhantoms, getPhantomsList, updateLocalPhantoms } from '../helpers';
import { IPhantom } from '../types';
import BackIcon from '../assets/back-arrow.svg';
import { usePhantomList } from '../hooks';
import { Filters } from 'components/Filters';

export const PhantomLibrary: FC = () => {
  const [phantomsListState, setPhantomListState] = useState<{ [key: IPhantom['id']]: IPhantom }>({});
  const [currentSelection, setCurrentSelection] = useState<{ [key: IPhantom['id']]: IPhantom }>({});
  const { list, setFilterSelection, filterSelection, filterChoices, } = usePhantomList(phantomsListState);

  const getPhantomsListCallback = useCallback(() => {
    const library = getPhantomsList();
    return library.reduce((acc, curr) => ({ ...acc, [curr.id]: curr }), {});
  }, [getPhantomsList]);

  const getSelectedPhantomsCallback = useCallback(() => {
    const test = getLocalPhantoms();
    return test;
  }, [getLocalPhantoms]);


  const handleSelection = (selection: IPhantom) => {
    updateLocalPhantoms(selection)
    setCurrentSelection(curr => ({
      ...curr,
      [selection.id]: selection
    }))
  }

  useEffect(() => {
    const storage = getSelectedPhantomsCallback();
    setCurrentSelection(storage)
    const phantomsList = getPhantomsListCallback();
    setPhantomListState(phantomsList);
  }, []);



  return (
    <div className='grid p-10 w-auto'>
      <h1 className='text-center text-2xl py-2 px-3'>Phantoms</h1>
      <Filters filterChoices={filterChoices} onFilterSelection={setFilterSelection} filterSelected={filterSelection} />
      <ul className='grid gap-2 p-5 phantomList'>
        {list.filter(phantom => !currentSelection[phantom.id]).map((phantom) =>
          <Phantom
            key={phantom.id}
            {...phantom}
            onSelect={handleSelection}
          />)}
      </ul>
      <Link to={'/'} className='absolute bottom-2 left-2 size-7 hover:bg-blue-200 rounded-3xl p-1'>
        <img className='p-1' src={BackIcon} alt={'back'} />
      </Link>
    </div>
  );
}
