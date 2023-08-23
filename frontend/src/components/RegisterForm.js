import React, { useState } from 'react';
import axios from 'axios';

const RegisterForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegisterSubmit = () => {
    axios
      .post('http://localhost:5000/register', { username, password })
      .then((response) => {
        // Kayıt başarılı mesajı göster
        setError('Kayıt başarılı');
      })
      .catch((error) => {
        setError('Kayıt başarısız');
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Kullanıcı Adı"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Şifre"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleRegisterSubmit}>Kayıt Ol</button>
      {error && <div>{error}</div>}
    </div>
  );
};

export default RegisterForm;
