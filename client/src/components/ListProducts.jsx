import React, { useContext, useEffect } from 'react'
import ProductsList from '../apis/ProductsList';
import { ProductsContext } from '../context/ProductsContext';

const ListProducts = (props) => {

    const {products,setProducts} = useContext(ProductsContext)

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ProductsList.get("/");
                // Filter out the extra object with key '__v'
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
                    <button className="btn btn-primary">Order</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      );
  
}

export default ListProducts