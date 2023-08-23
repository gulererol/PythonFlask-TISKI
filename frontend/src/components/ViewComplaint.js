import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ViewComplaint = ({ complaintId }) => {
  const [complaint, setComplaint] = useState(null);
  const [note, setNote] = useState('');
  const [status, setStatus] = useState('');
  const [satisfactionSurvey, setSatisfactionSurvey] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/complaints/${complaintId}`).then((response) => {
      setComplaint(response.data);
      setNote(response.data.note);
      setStatus(response.data.status);
      setSatisfactionSurvey(response.data.satisfaction_survey);
    });
  }, [complaintId]);

  const handleStatusChange = () => {
    axios
      .put(`http://localhost:5000/complaints/${complaintId}`, { status, note })
      .then((response) => {
        setStatus(response.data.status);
      });
  };

  // ...

  return (
    <div>
      {/* Burada ilgili arıza kaydının detaylarını ve gerekirse anketi gösterin */}
    </div>
  );
};

export default ViewComplaint;
