import React, { useState } from 'react';
import axios from 'axios';

const ComplaintForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [address, setAddress] = useState('');
  const [images, setImages] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImages(files);
  };

  const handleComplaintSubmit = () => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('description', description);
    formData.append('address', address);
    images.forEach((image, index) => {
      formData.append(`image-${index}`, image);
    });

    axios
      .post('http://localhost:5000/create_complaint', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      .then((response) => {
        setSuccess('Arıza kaydı oluşturuldu');
        setError('');
        setTitle('');
        setDescription('');
        setAddress('');
        setImages([]);
      })
      .catch((error) => {
        setError('Arıza kaydı oluşturulamadı');
        setSuccess('');
      });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Başlık"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Açıklama"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="Açık Adres"
        value={address}
        onChange={(e) => setAddress(e.target.value)}
      />
      <input type="file" multiple onChange={handleFileChange} />
      <button onClick={handleComplaintSubmit}>Arıza Kaydı Oluştur</button>
      {error && <div>{error}</div>}
      {success && <div>{success}</div>}
    </div>
  );
};

export default ComplaintForm;
