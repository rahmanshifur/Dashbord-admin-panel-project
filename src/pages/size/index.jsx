
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import CreateUpdate from './create-update';
import ListItems from './list-items';

function Size() {
    const [isOpen, setIsOpen] = useState(false)

    const getSize = useStoreActions(action => action.size.getSize)
    const resetEdit = useStoreActions(action => action.size.resetEdit)
    const editData = useStoreState(state => state.size.editData)

    useEffect(() => {
        getSize()
        setIsOpen(Object.keys(editData).length !== 0)
    }, [getSize, editData, setIsOpen])

    function addHandler() {
        if (Object.keys(editData).length !== 0) {
            setIsOpen(false)
            resetEdit()
        } else {
            setIsOpen(!isOpen)
        }
    }



    return (
        <div className="content">
            {isOpen &&
                <CreateUpdate
                    toggle={addHandler}
                    editData={editData}
                />}
            <ListItems
                addHandler={addHandler}
                isOpen={isOpen || Object.keys(editData).length !== 0}
            />
        </div>
    )
}

export default Size