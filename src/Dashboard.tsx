import { FC, useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import uuid from 'react-uuid';

import { Phantom } from './Phantom';
import { deleteLocalPhantom, getLocalPhantoms, updateLocalPhantoms, } from './helpers';
import { IPhantom, PhantomAction } from './types';
import { DeleteModal, RenameModal } from './Modals';


export const Dashboard: FC<{}> = () => {
    const [modal, setModal] = useState<{ [key in PhantomAction]?: IPhantom }>({});
    const [selection, setSelection] = useState<{ [key: IPhantom['id']]: IPhantom }>({});

    useEffect(() => {
        const storage = getLocalPhantoms();
        setSelection(storage)
    }, []);

    const handleEdit = (action: PhantomAction, phantom: IPhantom) => {
        if (action === PhantomAction.DUPLICATE) { handleDuplicate(phantom) }
        else { setModal({ [action]: phantom }) }
    }

    const handleDeletePhantom = (phantom?: IPhantom) => {
        if (!phantom) return
        setSelection(curr => {
            const newSelection = curr;
            delete newSelection[phantom.id];
            return newSelection;
        })
        deleteLocalPhantom(phantom);
        setModal({});
    }

    const handleRenamePhantom = (newName: string, phantom?: IPhantom) => {
        if (!phantom || !newName) return;
        setSelection(curr => ({
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
        setSelection(curr => ({ ...curr, newPhantom }));
        updateLocalPhantoms(newPhantom);
    }

    useEffect(() => {
        console.log('modal', modal);
    }, [modal]);

    useEffect(() => {
        console.log('selection', selection);
    }, [selection]);


    return (
        <>
            <div className='p-10'>
                <h1>Dashboard</h1>
                <div>
                    {Object.values(selection).map((phantom) =>
                        <Phantom
                            key={phantom.id}
                            onEdit={handleEdit}
                            {...phantom}
                        />)}
                </div>
                <Link to={'/phantombuster'}>Browse Phantoms</Link>
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
            </div>
        </>);
}
