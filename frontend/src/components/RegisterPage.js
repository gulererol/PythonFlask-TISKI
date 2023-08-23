import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const navigate = useNavigate();

  const handleRegisterSubmit = () => {
    axios
      .post('http://localhost:5000/register', { username, password })
      .then((response) => {
        
        setError('Kayıt başarılı');
        navigate('/login'); // Giriş sayfasına yönlendir
      })
      .catch((error) => {
        setError('Kayıt başarısız');
      });
  };

  return (
    <div className='centerdiv'>
      <input
        type="text"
        placeholder="Kullanıcı Adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <br />
      <br />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <br />
      <button className='buton button' onClick={handleRegisterSubmit}>Kayıt Ol</button>
      {error && <div>{error}</div>}
    </div>
  );
};

export default RegisterPage;
