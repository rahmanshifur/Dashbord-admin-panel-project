import { useStoreActions, useStoreState } from "easy-peasy"
import { useState } from "react"
import { useEffect } from "react"
import CreateUpdate from "./create-update"
import ListItems from "./list-items"


function Review(props) {

    console.log('22', props)

    const [isOpen, setIsOpen] = useState(false)
    const [editData, setEditData] = useState({})

    const authUser = useStoreState(state => state.auth.user)

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
            {isOpen &&
                <CreateUpdate
                    editData={editData}
                    addHandler={addHandler}
                    userId={authUser._id}
                    pdtId={'22', props.pdtId}

                />}

            <ListItems
                addHandler={addHandler}
                isOpen={isOpen || Object.keys(editData).length !== 0}
                pdtId={props.pdtId}
                editData={editData}
            />
        </div>
    )
}

export default Review

// 61b1a40660676c20c046b100