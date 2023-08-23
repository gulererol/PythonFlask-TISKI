import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pen from "../assets/pen.png"
import trash from "../assets/trash can.png"
import { Link } from 'react-router-dom';


const AdminPanel = ({userData}) => {
  const [users, setUsers] = useState([]);
  const [newUsername, setNewUsername] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newIsAdmin, setNewIsAdmin] = useState(false);
  const [newIsYetkili, setNewIsYetkili] = useState(false);
  const [anket, setanket] = useState([]);
  useEffect(() => {
    // Kullanıcıları yükleme işlemi
    loadUsers();
    loadanket();
  
  
  }, []);

  const loadUsers = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/users');
      setUsers(response.data.users);
    } catch (error) {
      console.error('Kullanıcılar yüklenirken bir hata oluştu:', error);
    }
  };

  
  const loadanket = async () => {
    try {
      const response = await axios.get('http://localhost:5000/anketget');
      setanket(response.data.anket);
    } catch (error) {
      console.error('anket yüklenirken bir hata oluştu:', error);
    }
  };

  
  
  
  const deleteUser = async (userId) => {
    try {
      console.log(userId);
      await axios.delete(`http://localhost:5000/api/users/${userId}`);
      // Kullanıcıları güncelleme
      loadUsers();
    } catch (error) {
      console.error('Kullanıcı silinirken bir hata oluştu:', error);
    }
  };

  const handleUserAdd = async () => {
    try {
      const response = await axios.post('http://localhost:5000/api/users', {
        username: newUsername,
        password: newPassword,
        is_admin: newIsAdmin,
        is_yetkili: newIsYetkili,
        
      
      
      }
      
      );
      setUsers([...users, response.data]);
      setNewUsername('');
      setNewPassword('');
      setNewIsAdmin(false);
      setNewIsYetkili(false);
    } catch (error) {
      console.error('Kullanıcı eklenirken bir hata oluştu:', error);
    }
    console.log(newIsYetkili);
  
  };

  const handleUserUpdate = async (userId, isAdmin, isYetkili) => {
    try {
      await axios.put(`http://localhost:5000/api/users/${userId}`, {
        is_admin: isAdmin,
        is_yetkili: isYetkili,
      });
      // Kullanıcıları güncelleme
      loadUsers();
    } catch (error) {
      console.error('Kullanıcı güncellenirken bir hata oluştu:', error);
    }
  };
 if(userData.is_admin)
  return (
  <>
    <div className='center'>
      <h1 className='center'>Admin Paneli</h1>
     
      <div><br />
        <h3>Kullanıcı Ekle</h3>
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
          <br />
          <label className='altbaslik'>
            Admin Yetkisi:
            <input
              type="checkbox"
              checked={newIsAdmin}
              onChange={(e) => setNewIsAdmin(e.target.checked)}
            />
          </label><br />
          <label className='altbaslik'>
            Yetkili Yetkisi:
            <input
              type="checkbox"
              checked={newIsYetkili}
              onChange={(e) => setNewIsYetkili(e.target.checked)}
            />
          </label><br />
          <button className='btn btn-success' onClick={handleUserAdd}>Yeni Kullanıcı Ekle</button>
        <br />
        
        </div>
        <br /><br />
        <p className='baslik center'>Mevcut Yetkililer</p>
        <div className='leftmargin'>
        <table className='minibaslik center'>
  <thead>
    <tr>
      <th className='tabloBasligi'>Kullanıcı</th>
      <th className='tabloBasligi'>Admin Yetkisi</th>
      <th className='tabloBasligi'>Yetkili Yetkisi</th>
      <th className='tabloBasligi icerik'>İşlemler</th>
    </tr>
  </thead>
  <tbody>
    {users.map((user) => (
      <tr key={user.id}>
        <td className='tabloİcerik'>{user.username}</td>
        <td className='tabloİcerik'>{user.is_admin ? 'Evet' : 'Hayır'}</td>
        <td className='tabloİcerik'>{user.is_yetkili ? 'Evet' : 'Hayır'}</td>
        <td className='tabloİcerik'>
         <Link onClick={() => handleUserUpdate(user.id, !user.is_admin, !user.is_yetkili)}> 
           <img className='kucukikon' src={pen} alt="" />
          </Link>
          <Link  onClick={() => deleteUser(user.id)}>
          <img className='kucukikon' src={trash} alt='' />
          </Link>
        </td>
      </tr>
    ))}
  </tbody>
</table>
</div>

      </div>
      <br />
      <br />
      <Link className='buton' to="../AdminSurveys">Anketler Sayfasına Git</Link>
      <br /><br /><br />
      
    </div>
    </>
  );
};

export default AdminPanel;