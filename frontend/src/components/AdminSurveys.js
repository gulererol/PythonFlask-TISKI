import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const AdminSurveys = () => {
  const [anket, setAnket] = useState([]);
  const itemsPerPage = 10;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    loadAnket();
  }, []);

  const loadAnket = async () => {
    try {
      const response = await axios.get('http://localhost:5000/anketget');
      setAnket(response.data.anket);
    } catch (error) {
      console.error('anket yüklenirken bir hata oluştu:', error);
    }
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const visibleAnket = anket.slice(startIndex, endIndex);

  return (
    <div>
      <h2 className='center'>Anketler</h2>
      <Link className='geri' to="../Admin">Geri</Link>
      <table className='tablo'>
        <thead>
          <tr>
            <th className='tabloBasligi'>Arıza NO</th>
            <th className='tabloBasligi'>Memnuniyet Durumu</th>
            <th className='tabloBasligi'>Kullanıcı Notu</th>
            <th className='tabloBasligi'>Şikayet Başlığı</th>
            
          </tr>
        </thead>
        <tbody>
          {visibleAnket.map((complaint) => (
            <tr key={complaint.id}>
              <td className='tabloİcerik'>{complaint.id}</td>
              <td className='tabloİcerik'>{complaint.memnuniyet}</td>
              <td className='tabloİcerik'>{complaint.aciklama}</td>
              <td className='tabloİcerik'>{complaint.title}</td>
           
            </tr>
          ))}
        </tbody>
      </table>

      <div className='pagination-buttons rightdiv'>
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
          disabled={endIndex >= anket.length}
        >
          Sonraki Sayfa
        </button>
      </div>

      <br />
      <br />
      
    </div>
  );
};

export default AdminSurveys;
