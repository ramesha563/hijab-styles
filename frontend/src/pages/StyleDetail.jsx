import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';


const StyleDetail = () => {
  const { id } = useParams();
  const [style, setStyle] = useState(null);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL}/api/styles/${id}`)
      .then(res => setStyle(res.data))
      .catch(err => console.error(err));
  }, [id]);

  if (!style) return <p>Loading...</p>;

  return (
    <div className="style-detail">
      <h2>{style.name}</h2>
      <img src={style.imageUrl} alt={style.name} />
      <p>{style.description}</p>
    </div>
  );
};

export default StyleDetail; // ✅ Fix: Use default export
