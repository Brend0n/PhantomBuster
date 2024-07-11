import { useEffect, useState } from "react"
import { IPhantom } from "./types";

export const usePhantomList = (selectedPhantomListMap: { [key: string]: IPhantom }) => {
    const [displayList, setDisplayList] = useState<IPhantom[]>([]);
    const [filterChoices, setFilterChoices] = useState(['']);
    const [filterSelection, setFilterSelection] = useState('');

    useEffect(() => {
        let phantomToDisplay = Object.values(selectedPhantomListMap);
        let filters = phantomToDisplay.reduce((acc, { manifest: { tags: { categories } } }) => {
            const result = acc;
            categories.forEach(cat => {
                if (!acc[cat]) {
                    result[cat] = true;
                }
            })
            return result;
        }, {} as { [key: string]: Boolean });
        setDisplayList(phantomToDisplay);
        setFilterChoices(Object.keys(filters));

    }, [selectedPhantomListMap]);

    useEffect(() => {
        const selectedPhantomListArray = Object.values(selectedPhantomListMap);
        setDisplayList(
            filterSelection ?
                selectedPhantomListArray.filter(phantom => phantom.manifest.tags.categories.includes(filterSelection))
                :
                selectedPhantomListArray
        )

    }, [filterSelection]);


    return ({
        list: Object.values(displayList),
        filterChoices,
        setFilterSelection,
        filterSelection,
    });
}
