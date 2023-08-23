import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ handleLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const { user_id, is_admin, is_yetkili } = JSON.parse(storedUser);
      handleLogin({ user_id, is_admin, is_yetkili });
      if (is_yetkili) {
        navigate('/open-complaints');
      } else if (is_admin) {
        navigate('/admin');
      } else {
        navigate('/user-complaints');
      }
    }
  }, [handleLogin, navigate]);

  const handleLoginSubmit = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password
      });

      const { user_id, is_admin, is_yetkili, message } = response.data;
      if (message === 'Giriş başarılı') {
        setError('');
        handleLogin({ user_id, is_admin, is_yetkili ,username});
        const user = { user_id, is_admin, is_yetkili ,username};
        localStorage.setItem('user', JSON.stringify(user));

        if (is_yetkili) {
          navigate('/open-complaints');
        } else if (is_admin) {
          navigate('/admin');
        } else {
          navigate('/user-complaints');
        }
      } else {
        setError('Kullanıcı adı veya şifre hatalı');
      }
    } catch (error) {
      console.log(error);
      setError('Bir hata oluştu, lütfen tekrar deneyin.');
    }
  };

  return (
    <div className='centerdiv'>
      <input
        type="text"
        placeholder='Kullanıcı Adı'
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <br />
      <br />
      <input
        type='password'
        placeholder='Şifre'
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <br />
      <button className='buton button' onClick={handleLoginSubmit}>
        Giriş Yap
      </button>
      {error && <div>{error}</div>}
    </div>
  );
};

export default LoginPage;
