import React, { useState } from 'react';
import api from '../../api';

const Login = ({ setToken }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/auth/login', { username, password });
      setToken(response.data.token);
      localStorage.setItem('token', response.data.token);
    } catch (error) {
      console.error('Error logging in', error);
    }
  };

  return (
    <div>
      <h2 style={{marginLeft:'50px'}}>Login</h2>
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
        <button type="submit" style={{padding:'8px',width:'80px',marginLeft:'50px',color:'black',backgroundColor:'aqua'}}>Login</button>
      </form>
    </div>
  );
};

export default Login;
