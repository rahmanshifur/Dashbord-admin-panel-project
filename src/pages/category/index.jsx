import { useStoreActions } from "easy-peasy"
import { useState } from "react"
import { useEffect } from "react"
import CreateUpdate from "./create-update"
import ListItems from "./list-items"

function Category() {
    const [isOpen, setIsOpen] = useState(false)
    const [editData, setEditData] = useState({})

    const getCategory = useStoreActions(action => action.category.getCategory)

    useEffect(() => {
        getCategory()
    }, [getCategory])


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