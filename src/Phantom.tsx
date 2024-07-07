import { FC } from 'react';
import { Popup } from 'reactjs-popup';
import { IPhantom, PhantomAction } from './types';
import MenuIcon from './menu.svg';

type PhantomProps = IPhantom & {
    onSelect?: (phantomId: IPhantom) => void;
    onEdit?: (action: PhantomAction, phantom: IPhantom) => void;
}

export const Phantom: FC<PhantomProps> = (props) => {
    const { onSelect, onEdit, ...phantom } = props;
    const { name, script, manifest: { tags: { categories } } } = phantom;

    return (
        <div className="grid border-1 shadow-md p-3 max-w-80 card">
            <div className='grid grid-cols-[auto_40px]'>
                <h3 className="font-bold text-center h-12 w-full flex align-middle justify-center overflow-hidden text-ellipsis">{name}</h3>
                <Popup
                    trigger={<img className={'w-5 h-5 hover:bg-gray-200 rounded-xl p-1'} src={MenuIcon} alt='menu' />}
                    position="right top"
                    on="hover"
                    closeOnDocumentClick
                    mouseLeaveDelay={300}
                    mouseEnterDelay={0}
                    contentStyle={{ padding: '0px', border: 'none' }}
                    arrow={false}
                >
                    {onEdit && <div className="menu">
                        <button onClick={() => onEdit(PhantomAction.RENAME, phantom)} className="menu-item">Rename</button>
                        <button onClick={() => onEdit(PhantomAction.DUPLICATE, phantom)} className="menu-item">Duplicate</button>
                        <button onClick={() => onEdit(PhantomAction.DELETE, phantom)} className="menu-item">Delete</button>
                    </div>}
                </Popup>
            </div>
            <div className="flex items-center gap-1 m-1">
                {categories.map(category =>
                    <span key={category} className='py-1 px-3 rounded-xl bg-cyan-400 h-5 text-xs max-w-28  overflow-hidden text-ellipsis align-bottom tag'>
                        {category}
                    </span>
                )}
            </div>
            <div className='mt-3'>{script}</div>
            {onSelect && <button className='rounded-md bg-blue-700 text-white' onClick={() => onSelect && onSelect(phantom)}>Use Flow</button>}
        </div>
    )
}