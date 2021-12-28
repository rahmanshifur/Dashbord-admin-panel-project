
import { useStoreActions } from 'easy-peasy';
import { useEffect } from 'react';
import ListItems from './list-items';

function AdminOrder() {

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

export default AdminOrder