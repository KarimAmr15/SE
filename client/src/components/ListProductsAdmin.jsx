import React, { useContext, useEffect } from 'react'
import ProductsAdminList from '../apis/ProductsAdminList';
import { ProductsAdminContext } from '../context/ProductsAdminContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListProductsAdmin = () => {

    
    const {products,setProducts} = useContext(ProductsAdminContext)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await ProductsAdminList.get("/");
                    const filteredProducts = response.data.map(product => {
                        const { __v, ...rest } = product; 
                        return rest;
                    });
                setProducts(filteredProducts);
            } catch (error) {
                console.log(error);
            }
        };

        fetchData();
    }, []);





    const handleUpdate = (productId) => {
        try {
            const encodedProductId = encodeURIComponent(productId);
            const url = `http://localhost:5000/update-product.html?productId=${encodedProductId}`;
            window.location.href = url;
        } catch (error) {
            console.error('Error navigating to update page:', error);
        }
    };

    const handleDelete = (productId) => {
        try {
            const encodedProductId = encodeURIComponent(productId);
            const url = `http://localhost:5000/delete-product.html?productId=${encodedProductId}`;
            window.location.href = url;
        } catch (error) {
            console.error('Error navigating to delete page:', error);
        }
    };
    const handleAddNewProduct = () => {
        window.location.href = 'http://localhost:5000/addnewproduct.html';
        
    };
    
return(

<div classname="list-group">
    <table Class="table table-striped table-hover">
        <thead class="thead-dark">
            <tr class="table-dark">
                <th scope="col">#</th>
                <th scope="col">modelName</th>
                <th scope="col">Price</th>
                <th scope="col">Seats</th>
                <th scope="col">Tank</th>
                <th scope="col">Acceleration</th>
                <th scope="col">Cylinders</th>
                <th scope="col">Horsepower</th>
                <th scope="col">Topspeed</th>
                <th scope="col">Stock</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
            </tr>
        </thead>
        <tbody>
           {products.map((product)=>(
            <tr key={product._id}>
                <th scope="row">{product._id}</th>
                <td>{product.modelName}</td>
                <td>{product.price}</td>
                <td>{product.seats}</td>
                <td>{product.tank}</td>
                <td>{product.acceleration}</td>
                <td>{product.cylinders}</td>
                <td>{product.horsePower}</td>
                <td>{product.topSpeed}</td>
                <td>{product.stock}</td>
                <td>
                                <button className="btn btn-warning" onClick={() => handleUpdate(product._id)}>Update</button>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(product._id)}>Delete</button>
                            </td>
            </tr>
           ))}
        </tbody>
    </table>
    <div className="text-center">
                <button className="btn btn-primary" onClick={handleAddNewProduct}>Add New Product</button>
                </div>
</div>


)



}

export default ListProductsAdmin