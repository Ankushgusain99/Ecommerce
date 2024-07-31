import React, { useState } from 'react';
import api from '../../api';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post('/auth/register', { username, password });
      alert('User registered successfully');
    } catch (error) {
      console.error('Error registering user', error);
    }
  };

  return (
    <div>
      <h2 style={{marginLeft:'50px'}}>Register</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', width: '200px' }}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={{ padding: '8px', marginBottom: '10px' }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ padding: '8px', marginBottom: '10px' }}
        />
        <button type="submit" style={{padding:'8px',width:'80px',marginLeft:'50px',color:'black',backgroundColor:'aqua'}}>Register</button>
      </form>
    </div>
  );
};

export default Register;
