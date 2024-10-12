import Layout from "@/components/Layout";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";

export default function OrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [editingOrder, setEditingOrder] = useState(null); 

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get('/api/orders');
        setOrders(response.data);
      } catch (err) {
        setError('Error fetching orders');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const deleteOrder = async (id) => {
    if (confirm('Are you sure you want to delete this order?')) {
      try {
        await fetch('/api/orders', {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ id }),
        });
        setOrders(orders.filter((order) => order._id !== id)); 
      } catch (err) {
        setError('Error deleting order');
      }
    }
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
  };

  const handleUpdate = async (event) => {
    event.preventDefault();
    const updatedOrder = {
      name: event.target.name.value,
      email: event.target.email.value,
      city: event.target.city.value,
      postalCode: event.target.postalCode.value,
      streetAddress: event.target.streetAddress.value,
      country: event.target.country.value,
    };

    try {
      await fetch(`/api/orders/${editingOrder._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedOrder),
      });
      setOrders(orders.map(order => (order._id === editingOrder._id ? { ...order, ...updatedOrder } : order)));
      setEditingOrder(null); 
    } catch (err) {
      setError('Error updating order');
    }
  };

  return (
    <Layout>
      <h1>Orders</h1>
      {error && <div className="error">{error}</div>}
      {editingOrder ? (
        <form onSubmit={handleUpdate}>
          <h2>Edit Order</h2>
          <input type="text" name="name" defaultValue={editingOrder.name} required />
          <input type="email" name="email" defaultValue={editingOrder.email} required />
          <input type="text" name="city" defaultValue={editingOrder.city} required />
          <input type="text" name="postalCode" defaultValue={editingOrder.postalCode} required />
          <input type="text" name="streetAddress" defaultValue={editingOrder.streetAddress} required />
          <input type="text" name="country" defaultValue={editingOrder.country} required />

          <h3>Ordered Products</h3>
          <ul>
            {editingOrder.line_items.map(item => (
              <li key={item.id}>
                {item.price_data.product_data.name} x {item.quantity}
              </li>
            ))}
          </ul>

          <button type="submit" className="btn-default">Update Order</button>
          <button type="button" className="btn-default" onClick={() => setEditingOrder(null)}>Cancel</button>
        </form>
      ) : (
        <table className="basic">
          <thead>
            <tr>
              <th>Date</th>
              <th>Paid</th>
              <th>Recipient</th>
              <th>Products</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td colSpan={5}>
                  <div className="py-4">
                    <Spinner fullWidth={true} />
                  </div>
                </td>
              </tr>
            )}
            {orders.length > 0 ? (
              orders.map(order => (
                <tr key={order._id}>
                  <td>{(new Date(order.createdAt)).toLocaleString()}</td>
                  <td className={order.paid ? 'text-green-600' : 'text-red-600'}>
                    {order.paid ? 'YES' : 'NO'}
                  </td>
                  <td>
                    {order.name} {order.email}<br />
                    {order.city} {order.postalCode} {order.country}<br />
                    {order.streetAddress}
                  </td>
                  <td>
                    {order.line_items.map((l, index) => (
                      <div key={index}>
                        {l.price_data.product_data.name} x {l.quantity}<br />
                      </div>
                    ))}
                  </td>
                  <td>
                    <button onClick={() => handleEdit(order)} className="btn-default">Edit</button>
                    <button onClick={() => deleteOrder(order._id)} className="btn-red">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5}>No orders found</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </Layout>
  );
}
