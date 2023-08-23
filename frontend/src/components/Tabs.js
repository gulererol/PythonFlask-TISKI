// Tabs.js
import React from 'react';
import { Link } from 'react-router-dom';

const Tabs = () => {
  return (
    <div>
      <Link to="/">Ana Sayfa</Link>
      <Link to="/register">Kayıt Ol</Link>
      <Link to="/adminPanel">Admin Paneli</Link>
      <Link to="/openComplaints">Açık Arızalar</Link>
      <Link to="/solvedComplaints">Çözümlenmiş Arızalar</Link>
      <Link to="/userComplaints">Kullanıcı Arızaları</Link>
      <Link to="/createComplaint">Arıza Oluştur</Link>
    </div>
  );
};

export default Tabs;
