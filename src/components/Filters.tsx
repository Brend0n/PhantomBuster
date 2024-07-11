import { FC } from 'react'
import { Tag } from './Tag';

type FiltersProps = {
    filterChoices: string[],
    onFilterSelection: (filter: string) => void;
    filterSelected: string;
}

export const Filters: FC<FiltersProps> = ({ filterChoices, onFilterSelection, filterSelected }) => {
    return (<>
        {filterChoices.length && <div>
            <label className='mr-3'>Filter:</label>
            {filterChoices.map(
                cat =>
                    <button
                        key={cat}
                        onClick={() => onFilterSelection(cat === filterSelected ? '' : cat)}
                        className='hover:bg-blue-600 rounded-3xl pr-2'
                    >
                        <Tag isSelected={cat === filterSelected}>{cat}</Tag>
                    </button>
            )}
        </div> || null}
    </>
    )
}

