import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';



const ComplaintDetail = ({ userData }) => {
  const [complaints, setComplaint] = useState(null);
  const [status, setStatus] = useState('');
  const [note, setNote] = useState('');
  const [message, setMessage] = useState('');
  const [aciklama, setAciklama] = useState('');
  const [memnuniyet, setMemnuniyet] = useState('');
  const { complaint_id } = useParams();

  useEffect(() => {
    const getComplaintDetail = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/complaint/${complaint_id}`);
        setComplaint(response.data.complaint);
      } catch (error) {
        console.error(error);
      }
    };
    getComplaintDetail();
  }, [complaint_id]);

  const handleStatusChange = async () => {
    try {
      await axios.post(`http://localhost:5000/complaint/${complaint_id}/status`, {
        status,
        note,
      });
      setMessage('Statü güncellendi.');
      location.reload();
    } catch (error) {
      console.error(error);
      setMessage('Statü güncellenemedi.');
    }
  };

  const handleStatusChange2 = async () => {
    try {
      await axios.post(`http://localhost:5000/complaint/${complaint_id}/den`, {
        memnuniyet,
        aciklama,
      });
      setMessage('Anket gönderildi.');
    } catch (error) {
      console.error(error);
      setMessage('Anket gönderilmedi.');
    }
  };
    
  if (!complaints) {
    return <p className="loading-message">Veriler yükleniyor...</p>;
  }

  return (
    <div>
      <h1 className='baslik'>{complaints.title} Şikayeti Detayları</h1>
      <p id='complainttitle' className='altbaslik'>Açıklama: <p className='sikayetaciklama'>{complaints.description}</p></p>
      <p id='complainttitle' className='altbaslik'>Açık Adres: <p className='sikayetaciklama'>{complaints.address}</p></p>
      <p id='complainttitle' className='altbaslik'>Statü: <p className='sikayetaciklama'>{complaints.status}</p></p>
      <p id='complainttitle'> {complaints.note}</p>
      
      {complaints.image_path && (
  <div>
    <h2>Şikayet Fotoğraf(ları) : </h2>
    <a href={`http://localhost:5000/uploads/${complaints.image_path}`} target="_blank" >
    <img height={200}  width={300} src={`http://localhost:5000/uploads/${complaints.image_path}`} alt="Şikayet Resmi" />
    </a>
  </div>
)}
      {complaints.anket && complaints.status === 'Cozumlendi' ? (
        <div>
          <h2 id='complainttitle'>Kullanıcı Memnuniyet Anketi</h2>
          <p id='complainttitle'>Memnuniyet: {complaints.memnuniyet}</p>
          <p id='complainttitle'>Açıklama: {complaints.aciklama}</p>
        </div>
      ) : null}
      
      {message && <p>{message}</p>}
      
      {!complaints.anket && !userData.is_yetkili && complaints.status === 'Cozumlendi' ? (
        <>
          <h2 className='center'>Anket Doldur</h2>
          <div className='center'>
            <label className='altbaslik'>Memnuniyet:</label>
            <select value={memnuniyet} onChange={(e) => setMemnuniyet(e.target.value)}>
              <option value="Memnun kaldım">Seçiniz...</option>
              <option value="Memnun Kaldım">Memnun Kaldım</option>
              <option value="Memnun Kalmadım">Memnun Kalmadım</option>
            </select>
            <div>
              <div>
                <br />
               <p className='altbaslik'>Notunuz : </p>
                <textarea value={aciklama} onChange={(e) => setAciklama(e.target.value)} />
              </div>
              <button className='buton' onClick={handleStatusChange2}>Anketi gönder</button>
            </div>
          </div>
          <p></p>
        </>
      ) : null}
      
      {userData.is_yetkili && complaints.status === 'Acik' ? (
        <>
          <div className='centerdiv'>
            <h2 className='centerdiv'>Statü Güncelle</h2>
            <div>
              <label className='altbaslik'>Yeni Statü:</label>
              <select value={status} onChange={(e) => setStatus(e.target.value)}>
                <option value="Acik">Çözülmedi</option>
                <option value="Cozumlendi">Çözümlendi</option>
              </select>
              <div>
                <div>
                  <textarea value={note} onChange={(e) => setNote(e.target.value)} />
                </div>
                <button className='buton button' onClick={handleStatusChange}>Güncelle</button>
              </div>
            </div>
          </div>
        </>
      ) : null}
    </div>
  );
};

export default ComplaintDetail;
