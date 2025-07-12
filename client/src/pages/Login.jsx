import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', { email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert('Login failed: ' + err.response?.data?.msg);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <h2>Login</h2>
      <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />
      <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
      <button type='submit'>Login</button>
    </form>
  );
}

export default Login;
