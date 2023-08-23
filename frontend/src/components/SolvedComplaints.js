import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import eye from '../assets/eye.png';

const SolvedComplaints = ({ userData }) => {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getSolvedComplaints();
  }, []);

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

  const getSolvedComplaints = async () => {
    try {
      let response;

      // Fetch all solved complaints for admin
      response = await axios.get('http://localhost:5000/complaints/solved');

      setComplaints(response.data.complaints);
      setFilteredComplaints(response.data.complaints);
    } catch (error) {
      console.error(error);
    }
  };
if(userData.is_yetkili)
  return (
    <div className='centerdiv'>
      <h1>Çözümlenmiş Arızalar</h1>
      <input
        type='text'
        placeholder='Şikayet Ara...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <br />
      <table className='tablo'>
        <thead>
          <tr>
            <th className='tabloBasligi'>Arıza No</th>
            <th className='tabloBasligi'>Başlık</th>
            <th className='tabloBasligi'>Kaydı Oluşturan Kullanıcı</th>
            <th className='tabloBasligi'>Statü</th>
            <th className='tabloBasligi'>Detayları Gör</th>
          </tr>
        </thead>
        <tbody>
          {visibleComplaints.map((complaint) => (
            <tr key={complaint.id}>
              <td className='tabloİcerik'>{complaint.id}</td>
              <td className='tabloİcerik'>{complaint.title}</td>
              <td className='tabloİcerik'>{complaint.user_id}</td>
              <td className='tabloİcerik'>{complaint.status}</td>
              <td className='tabloİcerik center'>
                <Link to={`/complaint/${complaint.id}`}>
                  <img className='kucukikon' src={eye} alt='' />
                </Link>
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
    </div>
  );
};

export default SolvedComplaints;
