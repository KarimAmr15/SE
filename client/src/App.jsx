import React from 'react';
import {BrowserRouter as Router , Route, Routes} from 'react-router-dom';
import Home2 from './routes/Home2';
import Home from './routes/Home';
import ProductDetails from './routes/ProductDetails';
import Orders from './routes/Orders';
import { ProductsContextProvider } from './context/ProductsContext';
import {OrdersContextProvider } from './context/OrdersContext';
import {ProductsAdminContextProvider } from './context/ProductsAdminContext';
import {OrdersAdminContextProvider } from './context/OrdersAdminContext';




const App = () => {

    return(

        <ProductsContextProvider>
             <OrdersContextProvider>
                <ProductsAdminContextProvider>
                <OrdersAdminContextProvider>
             

        <div>
           <Router>
                <Routes>
                    <Route path="/" element={<Home2 />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/myOrders" element={<ProductDetails />} />
                    <Route path="/adminOrders" element={<Home />} />
                  

                </Routes>
           </Router>
        </div>
        </OrdersAdminContextProvider>
        </ProductsAdminContextProvider>
    
        </OrdersContextProvider>

        </ProductsContextProvider>
    )
}

export default App
