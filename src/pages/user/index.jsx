import { useStoreActions, useStoreState } from "easy-peasy"
import { useEffect } from "react"
import ListItems from './list-items';
import CreateUpdate from './create-update';
import { useState } from "react";

function User() {

    const [isOpen, setIsOpen] = useState(false)

    const getUser = useStoreActions(action => action.user.getUser)
    const userData = useStoreState(state => state.user.data)
    const editData = useStoreState(state => state.user.editData)
    const resetEdit = useStoreActions(action => action.user.resetEdit)

    useEffect(() => {
        if (userData.length === 0) {
            getUser()
        }
        setIsOpen(Object.keys(editData).length !== 0)
    }, [getUser, editData, setIsOpen])


    const addHandler = () => {
        if (Object.keys(editData).length !== 0) {
            setIsOpen(false)
            resetEdit()
            return;
        }
        setIsOpen(!isOpen)
    }

    return (
        <div className="content">
            {isOpen && <CreateUpdate
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


export default User