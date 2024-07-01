import react, {useState,createContext} from 'react';

export const OrdersAdminContext = createContext();

export const OrdersAdminContextProvider = props => {


    const [orders,setOrders] = useState([]);



    return(

        <OrdersAdminContext.Provider value={{orders,setOrders}}>
            {props.children}
        </OrdersAdminContext.Provider>
    )
}
