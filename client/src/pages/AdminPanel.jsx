import { useEffect, useState } from 'react';
import API from '../api/axios';

function AdminPanel() {
  const [users, setUsers] = useState([]);
  const user = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    async function fetchUsers() {
      const res = await API.get('/admin/users');
      setUsers(res.data);
    }
    if (user?.role === 'admin') fetchUsers();
  }, [user]);

  const banUser = async (id) => {
    await API.put(`/admin/ban/${id}`);
    alert('User banned!');
    setUsers(users.map(u => u._id === id ? { ...u, isBanned: true } : u));
  };

  if (!user || user.role !== 'admin') return <p>Access Denied</p>;

  return (
    <div>
      <h2>Admin Panel - Users</h2>
      <ul>
        {users.map(u => (
          <li key={u._id}>
            {u.username} - {u.email} - {u.isBanned ? 'Banned' : 'Active'}
            {!u.isBanned && <button onClick={() => banUser(u._id)}>Ban</button>}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminPanel;
