// src/App.js
import React, { useState, useEffect } from 'react';
import Login from './components/Auth/login';
import Register from './components/Auth/register';
import List from './components/Products/List';
import Form from './components/Products/Form';
import api from './api';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [products, setProducts] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(!!token);

  useEffect(() => {
    if (token) {
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
      fetchProducts();
    }
  }, [token]);

  const handleLogout = () => {
    setToken(null);
    localStorage.removeItem('token');
    setIsAuthenticated(false);
    setProducts([]);
  };

  return (
    <div>
      {!isAuthenticated ? (
        <div>
          <Register />
          <Login setToken={(token) => {
            setToken(token);
            localStorage.setItem('token', token);
            setIsAuthenticated(true);
          }} />
        </div>
      ) : (
        <div>
          <button onClick={handleLogout}>Logout</button>
          <List token={token} />
          <Form token={token} fetchProducts={() => {
            // Function to re-fetch products after creating a new product
            api.get('/products', {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products', error));
          }} />
        </div>
      )}
    </div>
  );
};

export default App;
