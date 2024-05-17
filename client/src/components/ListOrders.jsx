import React, { useContext, useEffect } from 'react'
import OrdersList from '../apis/OrdersList';
import { OrdersContext } from '../context/OrdersContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';




const ListOrders = () => {
  const { orders, setOrders } = useContext(OrdersContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await OrdersList.get("/");
        setOrders(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <div className="row">
        {orders.map((order) => (
          <div key={order._id} className="col-md-4 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Order ID: {order._id}</h5>
                <p className="card-text">Price: {order.price}</p>
                <p className="card-text">Date: {order.orderDate}</p>
                <p className="card-text">Status: {order.orderStatus}</p>
                <p className="card-text">Address: {order.Address}</p>
                <p className="card-text">Color: {order.Color}</p>
                <p className="card-text">Product: {order.product}</p>
                <p className="card-text">Customer: {order.customer}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};



export default ListOrders