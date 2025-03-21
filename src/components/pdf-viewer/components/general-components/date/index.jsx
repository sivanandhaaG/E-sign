import React, { useEffect } from 'react';

const DateComponent = ({ formData, setFormData, markerData }) => {
  // date in dd/mm/yy format
  const date = new Date().toLocaleDateString();
  useEffect(() => {
    formData[markerData.markerId] = {
      markerId: markerData.markerId,
      markerType: 'text',
      data: date,
    };
    setFormData(formData);
  }, []);
  //   console.log(date);
  return <div>{date}</div>;
};

export default DateComponent;
