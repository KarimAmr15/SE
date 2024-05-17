import react, {useState,createContext} from 'react';

export const OrdersContext = createContext();

export const OrdersContextProvider = props => {


    const [orders,setOrders] = useState([]);



    return(

        <OrdersContext.Provider value={{orders,setOrders}}>
            {props.children}
        </OrdersContext.Provider>
    )
}
