import React, { useState } from 'react';
import axios from 'axios';
import foto from '../assets/1200px-Picture_icon_BLACK.svg.png';
import { useNavigate } from 'react-router-dom';


const CreateComplaint = ({ loggedIn, userData}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!loggedIn) {
      setMessage('Giriş yapmadan arıza kaydı oluşturamazsınız.');
      return;
    }

    try {
      const formData = new FormData();
      formData.append('user_id', userData.user_id);
      formData.append('title', title);
      formData.append('description', description);
      formData.append('address', address);
      if (image) {
        formData.append('image', image); // Resmi FormData'ya ekle
      }

      const response = await axios.post('http://localhost:5000/complaint', formData);

      setMessage(response.data.message);
      navigate('/user-complaints');
      alert("Arıza Kaydınız Başarıyla Oluşturuldu.Arızalarım Sayfasına Yönlendiriliyorsunuz...");
    } catch (error) {
      console.error(error);
      setMessage('Arıza kaydı oluşturulamadı.');
    }
  };
  if(!userData.is_yetkili&&!userData.is_admin)
  return (
    <div className='centerdiv'>
      <h1>Arıza Oluştur</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label className='altbaslik'>Başlık:</label><br/>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div>
          <label className='altbaslik'>Açıklama:</label><br/>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label className='altbaslik'>Açık Adres:</label><br/>
          <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} />
        </div>
        <div>
          <label className='altbaslik'>Resim Yükle:</label><br/>
          <img className='kucukikon' src={foto} alt='' /> <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
        </div>
        <button className='button buton' type="submit">Kayıt Oluştur</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
};

export default CreateComplaint;
