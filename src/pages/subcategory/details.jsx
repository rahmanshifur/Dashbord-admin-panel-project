
import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";



function SubcategoryDetails(props) {

    const getDetails = useStoreActions(action => action.subcategory.getDetails)
    const details = useStoreState(state => state.subcategory.details)
    console.log(details)

    useEffect(() => {
        getDetails(props.id)
    }, [props, getDetails])


    return (
        <div>
            {Object.keys(details).length !== 0 &&
                <div>
                    <div>
                        <h4>Category Details</h4>
                        <hr />
                        <h5><b>Name:</b> {details.category.name}</h5>
                        <p><b>CreateAt:</b> {details.category.createdAt}</p>
                        <p><b>UpdateAt:</b> {details.category.updatedAt}</p>
                        <div className='p-4 '>
                            <h5>Subcategory Details</h5>
                            <hr />
                            <h6><b>Name:</b> {details.name}</h6>
                            <p><b>CreateAt:</b> {details.createdAt}</p>
                            <p><b>UpdateAt:</b> {details.updatedAt}</p>
                        </div>
                    </div>
                </div>}
        </div>
    )
}

export default SubcategoryDetails