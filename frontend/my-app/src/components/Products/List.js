// src/components/Products/ProductList.js
import React, { useState, useEffect } from 'react';
import api from '../../api';

const List = ({ token }) => {
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null); // State to track the product being edited
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetchProducts();
  }, [token]);

  const fetchProducts = async () => {
    try {
      const response = await api.get('/products', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setProducts(response.data);
    } catch (error) {
      console.error('Error fetching products', error);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await api.delete(`/products/${productId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchProducts(); // Refresh the product list after deletion
    } catch (error) {
      console.error('Error deleting product', error);
    }
  };

  const handleEdit = (product) => {
    setEditProduct(product);
    setName(product.name);
    setPrice(product.price);
    setDescription(product.description);
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(
        `/products/${editProduct._id}`,
        { name, price, description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      fetchProducts(); // Refresh the product list after update
      setEditProduct(null); // Clear the edit form
    } catch (error) {
      console.error('Error updating product', error);
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      <ul>
        {products.length > 0 ? (
          products.map((product) => (
            <li key={product._id}>
              <h3>{product.name}</h3>
              <p>Price: ${product.price}</p>
              <p>{product.description}</p>
              <button onClick={() => handleEdit(product)}>Edit</button>
              <button onClick={() => handleDelete(product._id)}>Delete</button>
            </li>
          ))
        ) : (
          <p>No products available.</p>
        )}
      </ul>
      {editProduct && (
        <div>
          <h2>Edit Product</h2>
          <form onSubmit={handleUpdate}>
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <input
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
            <input
              type="text"
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            <button type="submit">Update</button>
            <button onClick={() => setEditProduct(null)}>Cancel</button>
          </form>
        </div>
      )}
    </div>
  );
};

export default List;
