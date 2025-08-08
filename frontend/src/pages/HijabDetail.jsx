
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import jwt_decode from 'jwt-decode';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './HijabDetails.css';

const StarRating = ({ rating, setRating }) => {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="star-rating" role="radiogroup" aria-label="Star Rating">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = star <= (hovered || rating);
        return (
          <span
            key={star}
            className={filled ? 'star filled' : 'star'}
            onClick={() => setRating(star)}
            onMouseEnter={() => setHovered(star)}
            onMouseLeave={() => setHovered(0)}
            role="radio"
            aria-checked={rating === star}
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') setRating(star);
            }}
            aria-label={`${star} star${star > 1 ? 's' : ''}`}
          >
            ★
          </span>
        );
      })}
    </div>
  );
};

export default function HijabDetail() {
  const { id } = useParams();
  const [review, setReview] = useState('');
  const [rating, setRating] = useState(5);
  const [reviews, setReviews] = useState([]);
  const [user, setUser] = useState(null);

  const [editId, setEditId] = useState(null);
  const [editReview, setEditReview] = useState('');
  const [editRating, setEditRating] = useState(5);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwt_decode(token);
      setUser(decoded);
    }

    fetchReviews();
  }, [id]);

  const fetchReviews = async () => {
    try {
      const { data } = await api.get(`/reviews/${id}`);
      setReviews(data);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      toast.error('Failed to fetch reviews');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) return toast.error('You must be logged in');

    try {
      await api.post('/reviews', {
        hijabId: id,
        user: user.name || user.email,
        rating,
        review,
      });

      setReview('');
      setRating(5);
      toast.success('Review submitted successfully!');
      fetchReviews();
    } catch (err) {
      console.error(err);
      toast.error('Failed to submit review');
    }
  };

  const handleDelete = async (reviewId) => {
    try {
      await api.delete(`/reviews/${reviewId}`);
      toast.success('Review deleted successfully!');
      fetchReviews();
    } catch (err) {
      console.error(err);
      toast.error('Delete failed');
    }
  };

  const handleEdit = (rev) => {
    setEditId(rev._id);
    setEditReview(rev.review);
    setEditRating(rev.rating);
  };

  const handleUpdate = async () => {
    try {
      await api.put(`/reviews/${editId}`, {
        review: editReview,
        rating: editRating,
      });
      setEditId(null);
      setEditReview('');
      toast.success('Review updated successfully!');
      fetchReviews();
    } catch (err) {
      console.error(err);
      toast.error('Update failed');
    }
  };

  return (
    <div className="hijab-detail-container">
      <h2 className="page-title">Hijab Style #{id}</h2>

      {user && (
        <form onSubmit={handleSubmit} className="review-form">
          <h3>Add Your Review</h3>
          <label>Rating:</label>
          <StarRating rating={rating} setRating={setRating} />

          <textarea
            placeholder="Write your review"
            value={review}
            onChange={(e) => setReview(e.target.value)}
            required
            className="review-textarea"
          />

          <button type="submit" className="btn-submit">
            Submit
          </button>
        </form>
      )}

      <div className="reviews-section">
        <h3>Reviews</h3>
        {reviews.length === 0 ? (
          <p className="no-reviews">No reviews yet.</p>
        ) : (
          reviews.map((rev) => (
            <div key={rev._id} className="review-card">
              {editId === rev._id ? (
                <div className="review-edit-form">
                  <p>Editing review:</p>
                  <StarRating rating={editRating} setRating={setEditRating} />

                  <textarea
                    value={editReview}
                    onChange={(e) => setEditReview(e.target.value)}
                    className="review-textarea"
                    style={{ height: '80px' }}
                  />

                  <button onClick={handleUpdate} className="btn-submit">
                    Update
                  </button>
                  <button
                    onClick={() => setEditId(null)}
                    className="btn-cancel"
                    type="button"
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <p className="review-header">
                    ⭐ {rev.rating} — <strong>{rev.user}</strong>
                  </p>
                  <p className="review-text">{rev.review}</p>
                  {user && rev.user === (user.name || user.email) && (
                    <div className="review-actions">
                      <button
                        onClick={() => handleEdit(rev)}
                        className="btn-action"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(rev._id)}
                        className="btn-action btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  )}
                </>
              )}
            </div>
          ))
        )}
      </div>

      {/* Toast Container: put at bottom or top level */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </div>
  );
}
