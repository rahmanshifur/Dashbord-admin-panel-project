import { useStoreActions, useStoreState } from "easy-peasy"
import { useEffect, useState } from "react"
import CreateUpdate from "./create-update"
import ListItems from './list-items';


function Color() {
    const [isOpen, setIsOpen] = useState(false)
    const [editData, setEditData] = useState({})

    const getColor = useStoreActions(action => action.color.getColor)
    const colorData = useStoreState(state => state.color.data)

    useEffect(() => {
        if (colorData.length === 0) {
            getColor()
        }
    }, [getColor])


    const addHandler = (edit = {}) => {
        setEditData(edit)
        setIsOpen(!isOpen)
    }

    return (
        <div className="content">
            {isOpen && <CreateUpdate
                addHandler={addHandler}
                editData={editData}
            />}

            <ListItems
                addHandler={addHandler}
                isOpen={isOpen}
            />
        </div>
    )
}
export default Color