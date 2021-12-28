import { Col, Modal, ModalBody, ModalHeader, Row, Table } from "reactstrap"
import { useStoreState } from 'easy-peasy';


function OrderItems({ toggle }) {

    const orderDetails = useStoreState(state => state.order.details)
    console.log('orderDetails', orderDetails)

    return (
        <div>
            <Modal isOpen={true} toggle={toggle} size='lg' >
                <ModalHeader toggle={toggle} className='border-bottom-0'></ModalHeader>
                <ModalBody className='px-5 border-top-none'>
                    {Object.keys(orderDetails).length !== 0 &&
                        <div>
                            <div>
                                <Row>
                                    <Col sm={6}>
                                        <h3>Order Information</h3>
                                        <hr />
                                        <p><b>OrderId:</b> {orderDetails.order._id}</p>
                                        <p><b>Date&Time:</b> {orderDetails.order.createdAt}</p>
                                    </Col>
                                    <Col sm={6}>
                                        <h3>User Information</h3>
                                        <hr />
                                        <p><b>UserName:</b> {orderDetails.order.user.firstName} {orderDetails.order.user.lastName}</p>
                                        <p><b>Email:</b> {orderDetails.order.user.email}</p>
                                        <p><b>Address:</b> {orderDetails.order.user.address}</p>
                                        <p><b>Contact No:</b> {orderDetails.order.user.contact}</p>
                                    </Col>
                                </Row>
                            </div>
                            <div className='pt-4'>
                                <h3><b>Order Items</b></h3>
                                <hr />
                                <Table>
                                    <thead>
                                        <tr>
                                            <th>S No</th>
                                            <th>ID</th>
                                            <th>Title</th>
                                            <th>Qnty</th>
                                            <th>Price</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {orderDetails.orderItem.map((item, i) =>
                                            <tr key={item._id}>
                                                <td>{++i}</td>
                                                <td>{item.product?._id}</td>
                                                <td>{item.product?.title}</td>
                                                <td>{item.quantity}</td>
                                                <td>${item.product?.price}</td>
                                            </tr>)}
                                    </tbody>
                                </Table>
                            </div>
                        </div>}
                </ModalBody>
            </Modal>
        </div >
    )
}
export default OrderItems