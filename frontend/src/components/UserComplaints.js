import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import eye from '../assets/eye.png';

const UserComplaints = ({ userData }) => {
  const [complaints, setComplaints] = useState([]);
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    getUserComplaints();
  }, [userData.user_id]);

  useEffect(() => {
    // Arama terimi boş ise tüm şikayetleri göster
    if (!searchTerm) {
      setFilteredComplaints(complaints);
    } else {
      // Arama terimine göre şikayetleri filtrele
      const filtered = complaints.filter((complaint) =>
        complaint.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredComplaints(filtered);
    }
  }, [searchTerm, complaints]);

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleComplaints = filteredComplaints.slice(startIndex, endIndex);

  const getUserComplaints = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${userData.user_id}/complaints`);
      setComplaints(response.data.complaints);
      setFilteredComplaints(response.data.complaints);
    } catch (error) {
      console.error(error);
    }
  };
if(!userData.is_yetkili&&!userData.is_admin)
  return (
    <div>
      <h1 className='center'>Kullanıcı Arızaları</h1>
      <div className='aramakutusu rightdiv'>
      <input className='aramakutusu'
        type='text'
        placeholder='Şikayet Ara...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      /></div>
      <table className='tablo'>
        <thead>
          <tr>
            <th className='tabloBasligi'>Arıza No</th>
            <th className='tabloBasligi'>Başlık</th>
            <th className='tabloBasligi'>Statü</th>
            <th className='tabloBasligi center'>Detayları Gör</th>
          </tr>
        </thead>
        <tbody>
          {visibleComplaints.map((complaint) => (
            <tr key={complaint.id}>
              <td className='tabloİcerik'>{complaint.id}</td>
              <td className='tabloİcerik'>{complaint.title}</td>
              {complaint.status==='Acik' ? <td className='tabloİcerik kirmizi'>{complaint.status}</td> : <td className='tabloİcerik yesil'>{complaint.status}</td>}
              <td className='tabloİcerik center'>
                <Link to={`/complaint/${complaint.id}`}><img className='kucukikon' src={eye} alt='' /></Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className='rightdiv'>
        <button
          className='sayfabutonu'
          onClick={handlePrevPage}
          disabled={currentPage === 1}
        >
          Önceki Sayfa
        </button>
        <button
          className='sayfabutonu'
          onClick={handleNextPage}
          disabled={endIndex >= filteredComplaints.length}
        >
          Sonraki Sayfa
        </button>
      </div>
      <div className='center'>
        <Link to="../create-complaint"><button className='girisbutonlari'>Yeni Şikayet Oluştur</button></Link>
        <br />
        <br />
      </div>
    </div>
  );
};

export default UserComplaints;
