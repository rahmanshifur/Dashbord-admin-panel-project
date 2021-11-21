import { useStoreActions, useStoreState } from "easy-peasy"
import { useEffect } from "react"


function UserDetails(props) {

    const getDetails = useStoreActions(action => action.user.getDetails)
    const details = useStoreState(state => state.user.details)

    useEffect(() => {
        getDetails(props.id)
    }, [props, getDetails])

    return (
        <div>
            <div className=''>
                {Object.keys(details).length !== 0 &&
                    <div>
                        <h3>Personal Information</h3>
                        <hr />
                        <h5><b>Name:</b> {details.firstName} {details.lastName}</h5>
                        <p><b>Email:</b> {details.email}</p>
                        <p><b>Address:</b> {details.address}</p>
                        <p><b>Contact No:</b> {details.contact}</p>
                        <p><b>Status:</b> {details.status !== 0 ? 'Active' : 'Inactive'}</p>
                    </div>}
            </div>
        </div>
    )
}
export default UserDetails