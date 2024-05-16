import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Products from './routes/products';
import Home from './routes/Home'
import { ProductsContextProvider } from './contextApi/ProductsContext';

const App = () => {

return(
  <ProductsContextProvider>
    <div className="container">
      
        <Router>
          <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/products" element={<Products/>}/>
          </Routes>
        </Router>

    </div>
    </ProductsContextProvider>

  )
}

export default App