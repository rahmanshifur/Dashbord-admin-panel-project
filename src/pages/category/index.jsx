import { useStoreActions, useStoreState } from "easy-peasy"
import { useState } from "react"
import { useEffect } from "react"
import CreateUpdate from "./create-update"
import ListItems from "./list-items"

function Category() {
    const [isOpen, setIsOpen] = useState(false)
    const [editData, setEditData] = useState({})

    const getCategory = useStoreActions(action => action.category.getCategory)
    const categoryData = useStoreState(state => state.category.data)

    useEffect(() => {
        if (categoryData.length === 0) {
            getCategory()
        }
    }, [])


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

export default Category