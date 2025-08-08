
import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import './Home.css';

export default function Home() {
  const [user, setUser] = useState(null);
  const [reviewsMap, setReviewsMap] = useState({});
  const navigate = useNavigate();

 const hijabs = [
    {
      id: 1,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Lxxsw2kWKIeQUiVh4vzOnXx1O9ZcxHvwSg&s',
      title: 'Classic Black Hijab',
      description: 'Elegant and simple for daily wear.',
    },
    {
      id: 2,
      image: 'data:image/jpeg;base64,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',
      title: 'Floral Print Hijab',
      description: 'Perfect for spring and summer outings.',
    },
    {
      id: 3,
      image: 'https://cdn.shopify.com/s/files/1/2337/7003/files/Untitled_design_6_-174514931121103_10bb0bf9-519f-47b8-b19a-78a2a51d3746.jpg?v=1745222188',
      title: 'Silk Satin Hijab',
      description: 'Soft and shiny for special occasions.',
    },
    {
      id: 4,
      image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtV7TLSvokWdbd8LFNhiBH-G7LLfAioo0mMA&s',
      title: 'Striped Pattern Hijab',
      description: 'Casual yet stylish look.',
    },
    {
      id: 5,
      image: 'https://cdn.pixabay.com/photo/2020/11/15/09/50/hijab-5745283_1280.jpg',
      title: 'Lace Trim Hijab',
      description: 'Delicate and feminine.',
    },
    {
      id: 6,
      image: ' https://maryamsessential.me.uk/cdn/shop/files/FullSizeRender_3f52817c-e1ea-4522-87f7-971cb7c87bfc.jpg?v=1720154161',
      title: 'Boho Style Hijab',
      description: 'Free-spirited and colorful.',
    },
    {
      id: 7,
      image:'https://alsafurahijabs.in/wp-content/uploads/2024/01/main-4.jpeg',
      title: 'Velvet Hijab',
      description: 'Rich texture for winter.',
    },
    {
      id: 8,
      image:'https://img.drz.lazcdn.com/static/pk/p/64491e6a9708ccc8439cdd583f54dd1a.jpg_960x960q80.jpg_.webp',
      title: 'Chiffon Hijab',
      description: 'Light and airy for hot days.',
    },
  ];
  

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      setUser(decoded);
    }

    hijabs.forEach(hijab => {
      fetchReviews(hijab.id);
    });
  }, []);

  const fetchReviews = async (hijabId) => {
    try {
      const { data } = await api.get(`/reviews/${hijabId}`);
      setReviewsMap(prev => ({ ...prev, [hijabId]: data }));
    } catch (err) {
      console.error('Error fetching reviews for hijab', hijabId, err);
    }
  };

  const handleReview = (hijabId) => {
    if (!user) {
      alert('Login required to leave a review.');
      navigate('/login');
    } else {
      navigate(`/hijab/${hijabId}`);
    }
  };

  return (
    <div className="home-container">
      <h1>Hijab Styles Gallery</h1>
      <div className="hijab-grid">
        {hijabs.map(hijab => {
          const reviews = reviewsMap[hijab.id] || [];
          const avgRating = reviews.length
            ? (reviews.reduce((acc, r) => acc + r.rating, 0) / reviews.length).toFixed(1)
            : null;

          return (
            <div className="card" key={hijab.id}>
              <img src={hijab.image} alt={hijab.title} />
              <h3>{hijab.title}</h3>
              <p>{hijab.description}</p>

              {avgRating && <p>⭐ Average Rating: {avgRating} / 5</p>}

              {reviews.length > 0 && (
                <p style={{ fontStyle: 'italic', color: 'gray' }}>
                  “{reviews[0].review || reviews[0].text}” — {reviews[0].userName || reviews[0].user}
                </p>
              )}

              <button onClick={() => handleReview(hijab.id)}>
                {user ? 'Add Review' : 'Login to Review'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
