import { FC, ReactNode } from 'react'

type TagProps = {
    isSelected?: boolean;
    children: ReactNode;
}

export const Tag: FC<TagProps> = ({ children, isSelected }) => {
    return (
        <li className={`flex py-1 px-3  mr-2 text-sm rounded-3xl ${isSelected ? 'bg-blue-700 text-white' : 'bg-blue-400'}`}>
            {children}
        </li >
    )
}


