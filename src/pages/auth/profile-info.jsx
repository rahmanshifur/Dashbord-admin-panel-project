import { useStoreActions, useStoreState } from "easy-peasy"
import { useEffect, useState } from "react"
import { Button, Col, Row } from "reactstrap"
import ImgNotFound from "../../assets/img/no-img.png"
import ProfileUpdate from "./profile-update"

function Profile() {
    const [isOpen, setIsOpen] = useState(false)

    const getProfileInformation = useStoreActions(action => action.auth.getProfileInformation)
    const profileInformation = useStoreState(state => state.auth.profileInformation)
    const profile = profileInformation

    useEffect(() => {
        getProfileInformation()
    }, [getProfileInformation])

    function addHandler() {
        setIsOpen(!isOpen)
    }

    return (
        <div className='profile'>
            {isOpen && <ProfileUpdate toggle={addHandler} />}
            <Row>
                <Col sm={4}>
                    <img src={ImgNotFound} alt="" className="w-100" />
                </Col>
                <Col sm={8}>
                    <h4>Profile</h4>
                    <hr />
                    <h5><b>Name:</b> {profile.firstName} {profile.lastName}</h5>
                    <p><b>Email:</b> {profile.email}</p>
                    {profile.address !== null && <p><b>Address:</b> {profile.address}</p>}
                    <p><b>Mobile No:</b> {profile.contact}</p>
                    <p><b>Status:</b> {profile.status !== 1 ? 'Inactive' : 'Active'}</p>
                    <Button className="btn-success w-25 mt-4" onClick={() => addHandler()}>Edit</Button>
                </Col>
            </Row>
        </div >
    )
}

export default Profile