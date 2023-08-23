import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/admin/users').then((response) => {
      setUsers(response.data);
    });
  }, []);

  const handleUserAdd = () => {
    axios
      .post('http://localhost:5000/admin/users', { username: newUsername, password: newPassword })
      .then((response) => {
        setUsers([...users, response.data]);
        setNewUsername('');
        setNewPassword('');
      });
  };

  const handleUserDelete = (userId) => {
    axios.delete(`http://localhost:5000/admin/users/${userId}`).then(() => {
      setUsers(users.filter((user) => user.id !== userId));
    });
  };

  return (
    <div>
      <h2>TİSKİ Yetkililerini Yönet</h2>
      <div>
        <input
          type="text"
          placeholder="Kullanıcı Adı"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Şifre"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button onClick={handleUserAdd}>Kullanıcı Ekle</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Kullanıcı Adı</th>
            <th>İşlemler</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.username}</td>
              <td>
                <button onClick={() => handleUserDelete(user.id)}>Sil</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AdminUsers;
