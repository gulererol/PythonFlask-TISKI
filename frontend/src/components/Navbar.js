import React from 'react';
import Logo from "../assets/logo2.png";
import { Link, useNavigate } from "react-router-dom";

function Navbar({ loggedIn, handleLogout }) {
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    localStorage.removeItem('user');
    handleLogout(); // This calls the parent's handleLogout function
    navigate('/');
  };

  return (
    <div className='navbar'> 
      <img src={Logo} alt='' className='tiskilogo' />
      <Link to="/" className='buton'>Ana Sayfa</Link>
      <Link to="/Iletisim" className='buton'>İletişim</Link>
      {loggedIn && <button className='buton' onClick={handleLogoutClick}>Çıkış Yap</button>}
    </div>
  );
}

export default Navbar;
