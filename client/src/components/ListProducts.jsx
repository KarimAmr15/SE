import React, { useContext, useEffect } from 'react'
import ProductsList from '../apis/ProductsList';
import { ProductsContext } from '../context/ProductsContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const handleOrder = async (productName, productPrice) => {
  try {
 
    const encodedProductName = encodeURIComponent(productName);
    const encodedProductPrice = encodeURIComponent(productPrice);


    const url = `http://localhost:5000/views/order-form.html?productName=${encodedProductName}&productPrice=${encodedProductPrice}`;

  
    window.location.href = url;
  } catch (error) {
    console.error('Error placing order:', error);
  }
};









const ListProducts = (props) => {

    const {products,setProducts} = useContext(ProductsContext)
    const navigate = useNavigate(); 

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ProductsList.get("/");
                const filteredProducts = response.data.filter(item => item.__v === undefined);
                setProducts(filteredProducts);
            } catch (error) {
                console.log(error);
            }
        }
        fetchData();
    }, []);
    


    return (
        <div>
          <div className="row">
            {products.map((product, index) => (
              <div key={index} className="col-md-4 mb-4">
                <div className="card">
                  <img src={product.img} className="card-img-top" alt={product.modelName} />
                  <div className="card-body">
                    <h5 className="card-title">{product.modelName}</h5>
                    <p className="card-text">Price: {product.price}</p>
                    <p className="card-text">Seats: {product.seats}</p>
                    <p className="card-text">Tank: {product.tank}</p>
                    <p className="card-text">Acceleration: {product.acceleration}</p>
                    <p className="card-text">Cylinders: {product.cylinders}</p>
                    <p className="card-text">HorsePower: {product.horsePower}</p>
                    <p className="card-text">TopSpeed: {product.topSpeed}</p>
                    <button className="btn btn-primary"  onClick={() => handleOrder(product.modelName, product.price)
}>Order</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
  
}

export default ListProducts