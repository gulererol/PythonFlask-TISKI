import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({loggedIn,userData}) => {
  return (
    <>
    <div className='center'>
      
      <h1><br/>TİSKİ Şikayet Ve Öneri Sistemine Hoş Geldiniz</h1>
      <br />
      <h3>Hoşgeldiniz {userData.username} </h3>
          { loggedIn ? (
             
           <ul>
            <li>
              <Link to="/">Ana Sayfa</Link>
            </li>
            <li>
              <Link to="/register">Kayıt Ol</Link>
            </li>
            <li>
              <Link to="/login">Giriş yap</Link>
            </li>
            <li>
              <Link to="/admin">Admin Paneli</Link>
            </li>
            <li>
              <Link to="/open-complaints">Açık Arızalar</Link>
            </li>
            <li>
              <Link to="/solved-complaints">Çözümlenmiş Arızalar</Link>
            </li>
            <li>
              <Link to="/user-complaints">Kullanıcı Arızaları</Link>
            </li>
            <li>
              <Link to="/create-complaint">Arıza Oluştur</Link>
            </li>
          
          
          </ul>

           ) : (
            <>
            <Link id='girisyap' className="girisbutonlari" to="./login">Giriş Yap</Link>
            <Link id='kayitol' className="girisbutonlari" to="./register">Kayıt Ol</Link>
           
            </>
           )}
    
      
      
      
     
    </div>
    </>
  );
};

export default Home;
