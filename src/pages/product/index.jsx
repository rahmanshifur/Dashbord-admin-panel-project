import { useStoreActions, useStoreState } from "easy-peasy"
import { useEffect, useState } from "react"
import CreateUpdate from "./create-update"
import ListItems from "./list-items"


function Product() {

    const [isOpen, setIsOpen] = useState(false)
    const [editData, setEditData] = useState({})

    const getProduct = useStoreActions(action => action.product.getProduct)
    const getColor = useStoreActions(action => action.color.getColor)
    const colorData = useStoreState(state => state.color.data)
    const getSize = useStoreActions(action => action.size.getSize)
    const sizeData = useStoreState(state => state.size.data)

    useEffect(() => {
        if (colorData.length === 0) {
            getColor()
        }
        if (sizeData.length === 0) {
            getSize()
        }
        getProduct()
    }, [getProduct, getColor, getSize])


    function addHandler(item = {}) {
        setIsOpen(!isOpen)
        setEditData(item)
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

export default Product