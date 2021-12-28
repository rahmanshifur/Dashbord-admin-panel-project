
import { useStoreActions, useStoreState } from 'easy-peasy';
import { Table, Button, Col, Row } from 'reactstrap';

function Checkout() {

    const submitOrder = useStoreActions(action => action.cart.submitOrder)
    const cartData = useStoreState(state => state.cart.data)


    function totalCal() {
        let total = 0
        if (cartData && cartData.length !== 0) {
            cartData.forEach(item => {
                total += item.quantity * item.price
            })
        }
        return total
    }


    return (
        <div>
            <Row>
                <Col sm={2}></Col>
                <Col sm={8}>
                    {cartData.length !== 0 &&
                        <Table className='p-3 bg-light'>
                            <thead>
                                <tr>
                                    <th>#</th>
                                    <th>ID</th>
                                    <th>Title</th>
                                    <th>Price</th>
                                    <th>Vat</th>
                                    <th>Discount</th>
                                    <th>Total-Price</th>
                                    <th>Quantity</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cartData.length !== 0 && cartData.map((item, i) =>
                                    <tr key={item._id}>
                                        {console.log('cartData', item)}
                                        <td>{++i}</td>
                                        <td>{item._id}</td>
                                        <td>{item.title}</td>
                                        <td>BDT{item.price}</td>
                                        <td>{item.vat}%</td>
                                        <td>{item.discount}%</td>
                                        <td>BDT{item.quantity * item.price}</td>
                                        <td>{item.quantity}</td>
                                    </tr>)}
                                {cartData && cartData.length && <tr>
                                    <td colspan='7'><b>GROUND-TOTAL :</b></td>
                                    <td>BDT{totalCal()}</td>
                                </tr>}
                            </tbody>
                        </Table>
                    }
                    {cartData.length !== 0 &&
                        <div className="mt-4">
                            <Button className='btn-warning float-end' onClick={() => submitOrder()}>Submit Order</Button>
                        </div>
                    }
                </Col>
                <Col sm={2}></Col>
            </Row>
        </div >
    )
}

export default Checkout