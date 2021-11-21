
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";



function CategoryDetails(props) {

    const getDetails = useStoreActions(action => action.category.getDetails)
    const details = useStoreState(state => state.category.details)
    console.log(details)

    useEffect(() => {
        getDetails(props.id)
    }, [props, getDetails])


    return (
        <div>
            {Object.keys(details).length !== 0 &&
                <div>
                    <h4>Category Details</h4>
                    <hr />
                    <h5><b>Name:</b> {details.name}</h5>
                    <p><b>CreateAt:</b> {details.createdAt}</p>
                    <p><b>UpdateAt:</b> {details.updatedAt}</p>
                </div>}
        </div>
    )
}

export default CategoryDetails