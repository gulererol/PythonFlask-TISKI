import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import eye from '../assets/eye.png';
import SolvedComplaints from './SolvedComplaints';

const OpenComplaints = ({ userData }) => {
  const [complaints, setComplaints] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredComplaints, setFilteredComplaints] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    getComplaints();
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

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleComplaints = filteredComplaints.slice(startIndex, endIndex);

  const getComplaints = async () => {
    try {
      let response;

      response = await axios.get('http://localhost:5000/complaints/open');

      setComplaints(response.data.complaints);
      setFilteredComplaints(response.data.complaints);
    } catch (error) {
      console.error(error);
    }
  };

  if (userData.is_yetkili)
    return (
      <>
        <h1 className='center'>{'Açık Arızalar'}</h1>
        <div className='aramakutusu rightdiv'>
        <input 
          type='text'
          placeholder='Şikayet Ara...'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        /></div>
        <br />
        <table className='tablo'>
          <thead>
            <tr>
              <th className='tabloBasligi'>Arıza No</th>
              <th className='tabloBasligi'>Başlık</th>
              <th className='tabloBasligi'>Statü</th>
              <th className='tabloBasligi'>Detayları Gör</th>
            </tr>
          </thead>
          <tbody>
            {visibleComplaints.map((complaint) => (
              <tr className='tabloİcerik' key={complaint.id}>
                <td className='tabloİcerik'>{complaint.id}</td>
                <td className='tabloİcerik'>{complaint.title}</td>
                <td className='tabloİcerik'>{complaint.status}</td>
                <td className='tabloİcerik'>
                  <Link to={`/complaint/${complaint.id}`}>
                    <img className='kucukikon' src={eye} alt='' />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <br />
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
      <div className='center'><Link to="../solved-complaints"><button className='sayfabutonu'>Çözümlenmiş Arızalara Git</button></Link> <br/><br/><br/> </div>
      </>);
};

export default OpenComplaints;
