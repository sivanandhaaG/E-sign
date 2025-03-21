import { useEffect, useState } from 'react';

export default function useWindowResize() {
  const [dimension, setDimension] = useState([0, 0]);

  useEffect(() => {
    window.addEventListener('resize', () => {
      setDimension([window.innerWidth, window.innerHeight]);
    });
    return () => {
      window.removeEventListener('resize', () => {
        setDimension([window.innerWidth, window.innerHeight]);
      });
    };
  }, []);

  return dimension;
}
