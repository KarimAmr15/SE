import React, { useState, useEffect, useContext } from 'react';
import ProductsList from '../API/ProductsList';
import { ProductsContext } from '../contextApi/ProductsContext';


const ListProducts = (props) => {
    const [products, setProducts] = useContext(ProductsContext);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await ProductsList.get("/");
                setProducts(response.data.data.products);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    return (
        <div className="list-group">
            {products.map((product) => (
                <div key={product.id} className="card">
                    <img src={product.img} className="card-img-top" alt={product.modelname} />
                    <div className="card-body">
                        <h5 className="card-title">{product.modelName}</h5>
                        <p className="card-text">Price: {product.price}</p>
                        <p className="card-text">seats: {product.seats}</p>
                        <p className="card-text">tank: {product.tank}</p>
                        <p className="card-text">acceleration: {product.acceleration}</p>
                        <p className="card-text">cylinders: {product.cylinders}</p>
                        <p className="card-text">horsePower: {product.horsePower}</p>
                        <p className="card-text">topSpeed: {product.topSpeed}</p>
                        <p className="card-text">stock: {product.stock}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ListProducts;
