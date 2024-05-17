import React from 'react';
import {BrowserRouter as Router , Route, Routes} from 'react-router-dom';
import Home from './routes/Home';
import ProductDetails from './routes/ProductDetails';
import { ProductsContextProvider } from './context/ProductsContext';
import {OrdersContextProvider } from './context/OrdersContext';
import { UserProvider } from './context/UserContext';


const App = () => {

    return(

        <ProductsContextProvider>
             <OrdersContextProvider>
             <UserProvider>

        <div>
           <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/myOrders" element={<ProductDetails />} />
                </Routes>
           </Router>
        </div>
        </UserProvider>
        </OrdersContextProvider>

        </ProductsContextProvider>
    )
}

export default App