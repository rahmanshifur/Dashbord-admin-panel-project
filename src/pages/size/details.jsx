import { useStoreActions, useStoreState } from "easy-peasy";
import { useEffect } from "react";



function SizeDetails(props) {

    const getDetails = useStoreActions(action => action.size.getDetails)
    const details = useStoreState(state => state.size.details)
    console.log(details)

    useEffect(() => {
        getDetails(props.id)
    }, [props, getDetails])


    return (
        <div>
            {Object.keys(details).length !== 0 &&
                <div>
                    <h4>Size Details</h4>
                    <hr />
                    <h5><b>Name:</b> {details.name}</h5>
                    <p><b>CreateAt:</b> {details.createdAt}</p>
                    <p><b>UpdateAt:</b> {details.updatedAt}</p>
                </div>}
        </div>
    )
}

export default SizeDetails