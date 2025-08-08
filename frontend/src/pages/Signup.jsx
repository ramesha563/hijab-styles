// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import api from '../services/api';
// import jwtDecode from 'jwt-decode';
// import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
// import './Signup.css';

// export default function Signup({ setUserName }) {
//   const [form, setForm] = useState({ name: '', email: '', password: '' });
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await api.post('/auth/register', form);

//       if (!data.token) {
//         alert('Signup succeeded but token missing in response.');
//         return;
//       }

//       localStorage.setItem('token', data.token);
//       const decoded = jwtDecode(data.token);

//       if (!decoded.name) {
//         alert('Token decoded but name missing.');
//         return;
//       }

//       setUserName(decoded.name);
//       navigate('/');
//     } catch (error) {
//       console.error('Signup error:', error);

//       // Show backend error message if available, otherwise generic
//       const message =
//         error.response?.data?.message ||
//         error.message ||
//         'Signup failed due to unknown error';

//       alert(`Signup failed: ${message}`);
//     }
//   };

//   return (
//     <div className="signup-container">
//       <form onSubmit={handleSubmit} className="signup-form">
//         <h2>Create Account</h2>

//         <div className="input-group">
//           <FaUser className="icon" />
//           <input
//             type="text"
//             placeholder="Name"
//             value={form.name}
//             onChange={e => setForm({ ...form, name: e.target.value })}
//             required
//           />
//         </div>

//         <div className="input-group">
//           <FaEnvelope className="icon" />
//           <input
//             type="email"
//             placeholder="Email"
//             value={form.email}
//             onChange={e => setForm({ ...form, email: e.target.value })}
//             required
//           />
//         </div>

//         <div className="input-group password-group">
//           <FaLock className="icon" />
//           <input
//             type={showPassword ? 'text' : 'password'}
//             placeholder="Password"
//             value={form.password}
//             onChange={e => setForm({ ...form, password: e.target.value })}
//             required
//           />
//           <span
//             className="password-toggle"
//             onClick={() => setShowPassword(!showPassword)}
//             role="button"
//             tabIndex={0}
//             aria-label={showPassword ? 'Hide password' : 'Show password'}
//           >
//             {showPassword ? <FaEyeSlash /> : <FaEye />}
//           </span>
//         </div>

//         <button type="submit" className="btn-submit">Sign Up</button>

//         <p className="login-link">
//           Already have an account? <Link to="/login">Log In</Link>
//         </p>
//       </form>
//     </div>
//   );
// }
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import jwtDecode from 'jwt-decode';
import { FaUser, FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';

export default function Signup({ setUserName }) {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/register', form);

      if (!data.token) {
        toast.error('Signup succeeded but token missing in response.');
        return;
      }

      localStorage.setItem('token', data.token);
      const decoded = jwtDecode(data.token);

      if (!decoded.name) {
        toast.error('Token decoded but name missing.');
        return;
      }

      setUserName(decoded.name);

      toast.success('Signup successful! Redirecting...', {
        autoClose: 2000,
        onClose: () => navigate('/'),
      });
    } catch (error) {
      console.error('Signup error:', error);
      const message =
        error.response?.data?.message ||
        error.message ||
        'Signup failed due to unknown error';

      toast.error(`Signup failed: ${message}`);
    }
  };

  return (
    <div className="signup-container">
      <form onSubmit={handleSubmit} className="signup-form">
        <h2>Create Account</h2>

        <div className="input-group">
          <FaUser className="icon" />
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={e => setForm({ ...form, name: e.target.value })}
            required
          />
        </div>

        <div className="input-group">
          <FaEnvelope className="icon" />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={e => setForm({ ...form, email: e.target.value })}
            required
          />
        </div>

        <div className="input-group password-group">
          <FaLock className="icon" />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Password"
            value={form.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            required
          />
          <span
            className="password-toggle"
            onClick={() => setShowPassword(!showPassword)}
            role="button"
            tabIndex={0}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button type="submit" className="btn-submit">Sign Up</button>

        <p className="login-link">
          Already have an account? <Link to="/login">Log In</Link>
        </p>
      </form>

      {/* Toast container to show toast notifications */}
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
