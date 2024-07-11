import { FC } from 'react';
import { Popup } from 'reactjs-popup';
import { IPhantom } from '../types';
import { PhantomAction } from '../constants'
import { Tag } from './Tag';
import MenuIcon from '../assets/menu.svg';

type PhantomProps = IPhantom & {
    onSelect?: (phantomId: IPhantom) => void;
    onEdit?: (action: PhantomAction, phantom: IPhantom) => void;
}

export const Phantom: FC<PhantomProps> = (props) => {
    const { onSelect, onEdit, ...phantom } = props;
    const { name, script, manifest: { tags: { categories } } } = phantom;

    return (
        <div className="relative grid border-1 shadow-md p-3 w-80 h-52 card">
            <>
                <h3 className="font-bold text-center h-12 w-a m-4 flex align-middle justify-center overflow-hidden text-ellipsis">{name}</h3>
                {!onSelect && <Popup
                    trigger={<img className={'absolute right-2 top-2 w-5 h-5  hover:bg-gray-200 rounded-xl p-1'} src={MenuIcon} alt='menu' />}
                    position="right top"
                    on="hover"
                    closeOnDocumentClick
                    mouseLeaveDelay={300}
                    mouseEnterDelay={0}
                    contentStyle={{ padding: '10px', border: 'gray', color: 'black' }}
                    arrow={false}
                >
                    {onEdit && <div className="menu">
                        <button onClick={() => onEdit(PhantomAction.RENAME, phantom)} className="menu-item">Rename</button>
                        <button onClick={() => onEdit(PhantomAction.DUPLICATE, phantom)} className="menu-item">Duplicate</button>
                        <button onClick={() => onEdit(PhantomAction.DELETE, phantom)} className="menu-item">Delete</button>
                    </div>}
                </Popup>}
            </>
            <div className="flex items-center gap-1 m-1">
                {categories.map(category =>
                    <Tag key={category} >
                        {category}
                    </Tag>
                )}
            </div>
            <div className='mt-3'>{script}</div>
            {onSelect && <button className='rounded-md bg-blue-700 text-white' onClick={() => onSelect && onSelect(phantom)}>Use Flow</button>}
        </div>
    )
}