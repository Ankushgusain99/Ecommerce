import React, { useState } from 'react';
import api from '../../api';

const Form = ({ token, fetchProducts }) => {
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
        console.log("token",token)
       await api.post(
        '/products/create',
        { name, price, description },
        
      );
      fetchProducts(); // Refresh the product list
      setName('');
      setPrice('');
      setDescription('');
    } catch (error) {
      console.error('Error creating product', error);
    }
  };

  return (
    <div style={{marginLeft:'300px'}}>
      <h2>Create Product</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '200px' }}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          style={{ padding: '8px', marginBottom: '10px' }}
        />
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
          style={{ padding: '8px', marginBottom: '10px' }}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ padding: '8px', marginBottom: '10px' }}
        />
        <button type="submit" style={{padding:'8px',width:'80px',marginLeft:'50px',color:'black',backgroundColor:'aqua'}}>Create</button>
      </form>
    </div>
  );
};

export default Form;
