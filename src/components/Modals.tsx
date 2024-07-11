import { FC, useEffect, useState } from 'react'
import { Popup } from 'reactjs-popup';
import { IPhantom } from '../types';

type RenameModalProps = {
    open: boolean
    phantom?: IPhantom;
    onUpdateName: (newName: string, phantom?: IPhantom) => void;
    onClose: () => void;
}

export const RenameModal: FC<RenameModalProps> = ({
    open,
    phantom,
    onClose,
    onUpdateName,
}) => {
    const [name, setName] = useState<string>(phantom?.name || '');

    useEffect(() => {
        setName(phantom?.name || '');
    }, [phantom])

    return (
        <Popup
            className={'border-solid border-2 blue p-3 m-8'}
            open={open}
            closeOnDocumentClick
            onClose={onClose}
            contentStyle={{
                backgroundColor: 'Window',
                padding: '30px',
                border: '1px gray solid',
                borderRadius: '10px',
            }}
        >
            <input value={name} type={'text'} onChange={e => setName(e.target.value)} />
            <div>
                <button className={'border-solid border-2 blue p-3 m-8 rounded-xl bg-blue-400 hover:bg-blue-600'} onClick={() => onUpdateName(name, phantom)}>Rename</button>
                <button className={'border-solid border-2 blue p-3 m-8 rounded-xl bg-blue-400 hover:bg-blue-600'} onClick={onClose}>Cancel</button>
            </div>
        </Popup>
    );
}

type DeleteModalProps = {
    open: boolean
    phantom?: IPhantom;
    onDeletePhantom: (phantom?: IPhantom) => void;
    onClose: () => void;
}

export const DeleteModal: FC<DeleteModalProps> = ({
    open,
    phantom,
    onClose,
    onDeletePhantom,
}) => {
    return (
        <Popup
            className={'border-solid border-2 blue p-3 m-8 modal'}
            open={open}
            closeOnDocumentClick
            onClose={onClose}
            contentStyle={{
                backgroundColor: 'Window',
                padding: '30px',
                border: '1px gray solid',
                borderRadius: '10px',
            }}
        >
            <p>{`Do you want to delete: ${phantom?.name}`}</p>
            <div>
                <button className={'border-solid border-2 rounded-xl bg-blue-400 hover:bg-blue-600 p-3 m-8'} onClick={() => onDeletePhantom(phantom)}>Delete</button>
                <button className={'border-solid border-2 rounded-xl bg-blue-400 hover:bg-blue-600 p-3 m-8'} onClick={onClose}>Cancel</button>
            </div>
        </Popup>)
}
