

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
      image: 'https://www.aaliyacollections.com/cdn/shop/products/IMG_4415_720x.jpg?v=1645724786',
      title: 'Classic Black Hijab',
      description: 'Elegant and simple for daily wear.',
    },
    {
      id: 2,
      image: 'https://divnitycollections.myshopify.com/cdn/shop/products/light-blue-and-brown-digital-floral-hijab-884509.jpg?v=1615042885',
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
      image: 'https://www.emproyal.com/cdn/shop/files/EMP_2102_2017.jpg?v=1710701101&width=1400',
      title: 'Striped Pattern Hijab',
      description: 'Casual yet stylish look.',
    },
    {
      id: 5,
      image: 'https://m.media-amazon.com/images/I/71PAf+l873L._AC_SL1500_.jpg',
      title: 'Lace Trim Hijab',
      description: 'Delicate and feminine.',
    },
    {
      id: 6,
      image: 'https://maryamsessential.me.uk/cdn/shop/files/FullSizeRender_3f52817c-e1ea-4522-87f7-971cb7c87bfc.jpg?v=1720154161',
      title: 'Boho Style Hijab',
      description: 'Free-spirited and colorful.',
    },
    {
      id: 7,
      image: 'https://alsafurahijabs.in/wp-content/uploads/2024/01/main-4.jpeg',
      title: 'Velvet Hijab',
      description: 'Rich texture for winter.',
    },
    {
      id: 8,
      image: 'https://img.drz.lazcdn.com/static/pk/p/64491e6a9708ccc8439cdd583f54dd1a.jpg_960x960q80.jpg_.webp',
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
      
      {/* Video Section */}
 <div className="video-wrapper">
  <video
    className="header-video"
    controls // <-- yeh add kiya
    style={{ width: '100%', borderRadius: '12px' }}
  >
    <source src="/videos/work.mp4" type="video/mp4" />
    Your browser does not support the video tag.
  </video>
</div>


      {/* Heading */}
      <h1>Hijab Styles Gallery</h1>

      {/* Hijab Grid */}
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
