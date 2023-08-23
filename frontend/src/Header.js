import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">Ana Sayfa</Link>
          </li>
          <li>
            <Link to="/register">Kayıt Ol</Link>
          </li>
          <li>
            <Link to="/admin">Admin Paneli</Link>
          </li>
          <li>
            <Link to="/complaints/open">Açık Arızalar</Link>
          </li>
          <li>
            <Link to="/complaints/solved">Çözümlenmiş Arızalar</Link>
          </li>
          <li>
            <Link to="/user/complaints">Kullanıcı Arızaları</Link>
          </li>
          <li>
            <Link to="/complaint/create">Arıza Oluştur</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
