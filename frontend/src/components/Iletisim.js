import React from 'react';
import { Link } from 'react-router-dom';

function Iletisim () {
  const handleSendEmail = () => {
    const emailAddress = 'semihcakir04@gmail.com'; // yollanacak eposta
    const subject = 'İletişim Formu'; // eposta konu
    const body = 'Merhaba, \n\n'; // eposta içerik

    
    const mailtoLink = `mailto:${emailAddress}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;

   
    window.location.href = mailtoLink;
  };

  return (
    <>
    <div className='centerdiv'>
      <h1>Bize Mail Atın</h1>
      |<br/>
      |
      <h6 class="cevir centerdiv"> &gt; </h6>
    <button class="buton button" onClick={handleSendEmail}>Mail At</button> 
  </div>
  </>

  );
}

export default Iletisim