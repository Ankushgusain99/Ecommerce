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
        <div style={{display:'flex',marginLeft:'150px',marginTop:'100px'}}>
          <Register />
          <div style={{marginLeft:'200px'}}></div>
          <Login setToken={(token) => {
            setToken(token);
            localStorage.setItem('token', token);
            setIsAuthenticated(true);
          }}/>
        </div>
      ) : (
        <div>
          <button style={{padding:'8px',width:'80px',marginLeft:'550px',color:'black',backgroundColor:'aqua'}} onClick={handleLogout}>Logout</button>
          <div style={{display:'flex'}}>
          <Form token={token} fetchProducts={() => {
            // Function to re-fetch products after creating a new product
            api.get('/products', {
              headers: { Authorization: `Bearer ${token}` },
            })
            .then(response => setProducts(response.data))
            .catch(error => console.error('Error fetching products', error));
          }} />
          <List token={token} />
          
          </div>
          
        </div>
      )}
    </div>
  );
};

export default App;
