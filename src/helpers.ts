import { PHANTOM_LOCAL_STORAGE } from "./constants"
import phantomsList from './phantoms.json';
import { IPhantom } from "./types";

export const getPhantomsList: () => IPhantom[] = () => phantomsList as IPhantom[];

export const getLocalPhantoms: () => { [key: IPhantom['id']]: IPhantom } = () => {
    const phantoms = window.localStorage.getItem(PHANTOM_LOCAL_STORAGE);
    return phantoms ? JSON.parse(phantoms) : {};
}

export const updateLocalPhantoms = (phantom: IPhantom) => {
    const currentPhantoms = getLocalPhantoms();
    window.localStorage.setItem(PHANTOM_LOCAL_STORAGE, JSON.stringify({
        ...currentPhantoms,
        [phantom.id]: phantom,
    }));
}

export const deleteLocalPhantom = (phantom: IPhantom) => {
    const phantoms = getLocalPhantoms();
    delete phantoms[phantom.id];
    window.localStorage.setItem(PHANTOM_LOCAL_STORAGE, JSON.stringify(phantoms));
}