import React, { useContext, useEffect } from 'react'
import OrdersAdminList from '../apis/OrdersAdminList';
import { OrdersAdminContext } from '../context/OrdersAdminContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ListOrdersAdmin = () => {

    
    const {orders,setOrders} = useContext(OrdersAdminContext)
    const navigate = useNavigate(); // useNavigate inside the component

    useEffect(() => {
        const fetchData = async () => {
          try {
            const response = await OrdersAdminList.get("/");
            const filteredProducts = response.data.map(product => {
                const { __v, ...rest } = product; 
                return rest;
            });
            setOrders(filteredProducts);
          } catch (error) {
            console.log(error);
          }
        };
        fetchData();
      }, []);

      
    const handleUpdate = (orderId) => {
      try {
          const encodedProductId = encodeURIComponent(orderId);
          const url = `http://localhost:5000/update-order.html?orderId=${encodedProductId}`;
          window.location.href = url;
      } catch (error) {
          console.error('Error navigating to update page:', error);
      }
  };

  const handleDelete = (orderId) => {
      try {
          const encodedProductId = encodeURIComponent(orderId);
          const url = `http://localhost:5000/delete-order.html?orderId=${encodedProductId}`;
          window.location.href = url;
      } catch (error) {
          console.error('Error navigating to delete page:', error);
      }
  };


    
return(

<div classname="list-group">
    <table Class="table table-striped table-hover">
        <thead class="thead-dark">
            <tr class="table-dark">
                <th scope="col">#</th>
                <th scope="col">Price</th>
                <th scope="col">Date</th>
                <th scope="col">Status</th>
                <th scope="col">Address</th>
                <th scope="col">Color</th>
                <th scope="col">Product</th>
                <th scope="col">Customer</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
            </tr>
        </thead>
        <tbody>
           {orders.map((order)=>(
            <tr key={order._id}>
                <th scope="row">{order._id}</th>
                <td>{order.price}</td>
                <td>{order.orderDate}</td>
                <td>{order.orderStatus}</td>
                <td>{order.Address}</td>
                <td>{order.Color}</td>
                <td>{order.product}</td>
                <td>{order.customer}</td>
                <td>
                                <button className="btn btn-warning" onClick={() => handleUpdate(order._id)}>Update</button>
                            </td>
                            <td>
                                <button className="btn btn-danger" onClick={() => handleDelete(order._id)}>Delete</button>
                            </td>
            </tr>
           ))}
        </tbody>
    </table>
</div>


);



}

export default ListOrdersAdmin