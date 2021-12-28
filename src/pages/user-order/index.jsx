import { useStoreActions } from 'easy-peasy';
import { useEffect } from 'react';
import ListItems from './list-items';

function UserOrder() {

    const getOder = useStoreActions(action => action.order.getOrder)

    useEffect(() => {
        getOder()
    }, [getOder])

    return (
        <div>
            <ListItems />
        </div>
    )
}

export default UserOrder