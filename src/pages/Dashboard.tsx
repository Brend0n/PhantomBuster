import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';
import ResetIcon from '../assets/reset.svg'

import { Phantom } from '../components/Phantom';
import { deleteLocalPhantom, getLocalPhantoms, updateLocalPhantoms, clearLocalStorage } from '../helpers';
import { IPhantom } from '../types';
import { PhantomAction } from '../constants'
import { DeleteModal, RenameModal } from '../components/Modals';
import { usePhantomList } from '../hooks';
import { Filters } from 'components/Filters';


export const Dashboard: FC<{}> = () => {
    const [modal, setModal] = useState<{ [key in PhantomAction]?: IPhantom }>({});
    const [phantomFromStorage, setPhantomFromStorage] = useState<{ [key: IPhantom['id']]: IPhantom }>({});
    const { list, setFilterSelection, filterSelection, filterChoices, } = usePhantomList(phantomFromStorage);

    useEffect(() => {
        const storage = getLocalPhantoms();
        setPhantomFromStorage(storage)
    }, []);

    const handleEdit = (action: PhantomAction, phantom: IPhantom) => {
        if (action === PhantomAction.DUPLICATE) { handleDuplicate(phantom) }
        else { setModal({ [action]: phantom }) }
    }

    const handleDeletePhantom = (phantom?: IPhantom) => {
        if (!phantom) return
        setPhantomFromStorage(curr => {
            const newSelection = { ...curr };
            delete newSelection[phantom.id];
            return newSelection;
        })
        deleteLocalPhantom(phantom);
        setModal({});
    }

    const handleRenamePhantom = (newName: string, phantom?: IPhantom) => {
        if (!phantom || !newName) return;
        setPhantomFromStorage(curr => ({
            ...curr,
            [phantom.id]: { ...phantom, name: newName }
        }))
        updateLocalPhantoms({ ...phantom, name: newName })
        setModal({});
    }

    const handleDuplicate = (phantom: IPhantom) => {
        const newPhantom = {
            ...phantom,
            id: uuid(),
            name: `${phantom.name} - copy`
        };
        setPhantomFromStorage(curr => ({ ...curr, newPhantom }));
        updateLocalPhantoms(newPhantom);
    }

    return (
        <>
            <div className='grid p-10 w-auto'>
                <h1 className='text-center text-2xl py-2 px-3'>Dashboard</h1>
                <Filters filterChoices={filterChoices} onFilterSelection={setFilterSelection} filterSelected={filterSelection} />
                <div className='grid grid-cols-3'>
                    {
                        list.length ?
                            list.map((phantom) =>
                                <Phantom
                                    key={phantom.id}
                                    onEdit={handleEdit}
                                    {...phantom}
                                />)
                            :
                            <div className='text-sm m-10'>No phantom selected.</div>
                    }
                </div>
                <Link className={'w-1/2 py-2 px-10 bg-blue-400 rounded-3xl text-center justify-self-center mt-7'} to={'/phantombuster'}>Browse Phantoms</Link>

                <button className='absolute bottom-2 left-2 size-7 hover:bg-blue-200 p-1 rounded-3xl'>
                    <img
                        src={ResetIcon}
                        className='p-1'
                        alt='reset'
                        onClick={() => {
                            clearLocalStorage();
                            setFilterSelection('');
                            setPhantomFromStorage({})
                        }}
                    />
                </button>
                <DeleteModal
                    open={Boolean(modal[PhantomAction.DELETE])}
                    phantom={modal[PhantomAction.DELETE]}
                    onClose={() => setModal({})}
                    onDeletePhantom={handleDeletePhantom}
                />
                <RenameModal
                    open={Boolean(modal[PhantomAction.RENAME])}
                    phantom={modal[PhantomAction.RENAME]}
                    onClose={() => setModal({})}
                    onUpdateName={handleRenamePhantom}
                />
            </div >
        </>);
}
