import React from 'react';
import './index.css';

const Thumbnails = ({ images, active, setActive }) => {
  return (
    <div className='thumbnails'>
      {images.map((image, index) => (
        <img
          className={`thumbnails__scroll ${
            active === index && 'thumbnail__active'
          }`}
          key={index}
          src={image}
          alt='pdf'
          id={`${index}`}
          onClick={() => setActive(index)}
        />
      ))}
    </div>
  );
};

export default Thumbnails;
