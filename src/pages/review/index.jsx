import { useStoreActions } from "easy-peasy"
import { useState } from "react"
import { useEffect } from "react"
import CreateUpdate from "./create-update"
import ListItems from "./list-items"


function Review(props) {

    console.log('Review', props)

    const [isOpen, setIsOpen] = useState(false)
    const [editData, setEditData] = useState({})

    const getReview = useStoreActions(action => action.review.getReview)


    useEffect(() => {
        getReview()
    }, [getReview])

    function addHandler(item = {}) {
        setIsOpen(!isOpen)
        setEditData(item)
    }

    return (
        <div className='border mt-4'>
            Review page
            {isOpen &&
                <CreateUpdate editData={editData} addHandler={addHandler} />}

            <ListItems
                addHandler={addHandler}
                isOpen={isOpen || Object.keys(editData).length !== 0}
                pdtId={props.pdtId}
            />
        </div>
    )
}

export default Review