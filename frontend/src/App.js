import React, { useState,useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import LoginPage from './components/LoginPage';
import RegisterPage from './components/RegisterPage';
import AdminPanel from './components/AdminPanel';
import OpenComplaints from './components/OpenComplaints';
import SolvedComplaints from './components/SolvedComplaints';
import UserComplaints from './components/UserComplaints';
import CreateComplaint from './components/CreateComplaint';
import ComplaintDetail from './components/ComplaintDetail';
import Navbar from './components/Navbar';
import Iletisim from './components/Iletisim';
import AdminSurveys from './components/AdminSurveys';
import './styles.css';
import "bootstrap/dist/css/bootstrap.min.css"
const App = () => {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({
    username: '',
    user_id: '',
    is_admin: '',
    is_yetkili: ''
  });

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setLoggedIn(true);
      setUserData(JSON.parse(storedUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setLoggedIn(true);
    setUserData(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  };

  const handleLogout = () => {
    setLoggedIn(false);
    setUserData({
      username: '',
      user_id: '',
      is_admin: '',
      is_yetkili: ''
    });
    localStorage.removeItem('user');
  };
  
  
  
  return (
    <Router>
       <Navbar loggedIn={loggedIn} handleLogout={handleLogout} />
     
     
        
        <div className='arkaplan'></div>

        <Routes>
  <Route path="/" element={<Home loggedIn={loggedIn} userData={userData} />} />
  <Route path="/register" element={<RegisterPage />} />
  <Route path="/login" element={<LoginPage handleLogin={handleLogin} />} />
  <Route path="/admin" element={<AdminPanel userData={userData} />} />
  <Route path="/open-complaints" element={<OpenComplaints userData={userData} />} />
  <Route path="/solved-complaints" element={<SolvedComplaints userData={userData} />} />
  <Route path="/user-complaints" element={<UserComplaints userData={userData} />} />
  <Route path="/create-complaint" element={<CreateComplaint loggedIn={loggedIn} userData={userData} />} />
  <Route path="/complaint/:complaint_id" element={<ComplaintDetail userData={userData} />} />
  <Route path="/Iletisim" element={<Iletisim />} />
  <Route path="/AdminSurveys" element={<AdminSurveys />} />

</Routes>
      
    </Router>
  );
};

export default App;
/*<nav>
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
        </nav>*/