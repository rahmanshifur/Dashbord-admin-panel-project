import { useStoreActions, useStoreState } from "easy-peasy"
import { useState, useEffect } from "react"
import CreateUpdate from "./create-update"
import ListItems from "./list-items"

function Subcategory() {

    const [isOpen, setIsOpen] = useState(false)
    const [editData, setEditData] = useState({})

    const getSubcategory = useStoreActions(action => action.subcategory.getSubcategory)
    const subcategoryData = useStoreState(state => state.subcategory.data)

    useEffect(() => {
        if (subcategoryData.length === 0) {
            getSubcategory()
        }
    }, [getSubcategory])

    function addHandler(item = {}) {
        setEditData(item)
        setIsOpen(!isOpen)
    }

    return (
        <div>
            {isOpen &&
                <CreateUpdate
                    toggle={addHandler}
                    editData={editData}
                />}
            <ListItems
                addHandler={addHandler}
                isOpen={isOpen}
            />
        </div>
    )
}
export default Subcategory