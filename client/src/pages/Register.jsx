import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/register', { username, email, password });
      localStorage.setItem('token', res.data.token);
      navigate('/');
    } catch (err) {
      alert('Register failed: ' + err.response?.data?.msg);
    }
  };

  return (
    <form onSubmit={handleRegister}>
      <h2>Register</h2>
      <input type='text' placeholder='Username' onChange={(e) => setUsername(e.target.value)} required />
      <input type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} required />
      <input type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} required />
      <button type='submit'>Register</button>
    </form>
  );
}

export default Register;
