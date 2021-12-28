
import { useStoreActions, useStoreState } from 'easy-peasy';
import { useEffect, useState } from 'react';
import { Button, Table } from 'reactstrap';
import OrderItems from './order-items';

function ListItems() {

    const [isOpen, setIsOpen] = useState(false)

    const getMyOrder = useStoreActions(action => action.order.myOrder)
    const getDetails = useStoreActions(action => action.order.getDetails)
    const orderHandler = useStoreActions(action => action.order.orderHandler)
    const orderData = useStoreState(state => state.order.data)

    console.log('o', orderData)

    useEffect(() => {
        getMyOrder()
    }, [getMyOrder])


    function getStatus(status) {
        if (status === 1) {
            return 'PENDING';
        } else if (status === 2) {
            return 'APPROVED';
        } else if (status === 3) {
            return 'CANCELED';
        } else if (status === 4) {
            return 'ON-DELIVERY';
        } else if (status === 5) {
            return 'COMPLETED';
        } else if (status === 6) {
            return 'FAILED';
        }
        return '';
    }

    function modalHandler(orderId) {
        setIsOpen(true)
        getDetails(orderId)
    }

    return (
        <div>
            <Table>
                <thead>
                    <tr>
                        <th>S No</th>
                        <th>ID</th>
                        <th>User Name</th>
                        <th>Total Qnt</th>
                        <th>Total Price</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {orderData && orderData.length !== 0 && orderData.map((item, i) =>
                        <tr key={item._id}>
                            <td>{++i}</td>
                            <td>{item._id}</td>
                            <td>{item.user?.firstName}{item.user?.lastName}</td>
                            <td>{item.totalQuantity}</td>
                            <td>{item.totalPrice}</td>
                            <td>{getStatus(item.status)}</td>
                            {/* 1=PENDING, 2=APPROVED, 3=CANCELED, 4=ON-DELIVERY, 5=COMPLETED, 6=FAILED */}
                            <td>
                                {item.status === 1 && <>
                                    <Button onClick={() => orderHandler({ id: item._id, status: 3 })}>Cancel</Button>
                                </>}
                                <Button onClick={() => modalHandler(item._id)}>view</Button>
                            </td>
                        </tr>)}
                </tbody>
            </Table>
            {isOpen && <OrderItems toggle={() => setIsOpen(false)} />}
        </div >
    )
}

export default ListItems