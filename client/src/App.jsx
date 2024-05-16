import React from 'react';
import {BrowserRouter as Router , Route, Routes} from 'react-router-dom';
import Home from './routes/Home';
import ProductDetails from './routes/ProductDetails';
import { ProductsContextProvider } from './context/ProductsContext';


const App = () => {

    return(

        <ProductsContextProvider>

        <div>
           <Router>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/ProductDetails/:id" element={<ProductDetails />} />
                </Routes>
           </Router>
        </div>

        </ProductsContextProvider>
    )
}

export default App