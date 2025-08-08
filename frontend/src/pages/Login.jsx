// import React, { useState } from 'react';
// import { useNavigate, Link } from 'react-router-dom';
// import api from '../services/api';
// import jwtDecode from 'jwt-decode';
// import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
// import { ToastContainer, toast } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import './Login.css';

// export default function Login({ setUserName }) {
//   const [form, setForm] = useState({ email: '', password: '' });
//   const [showPassword, setShowPassword] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       const { data } = await api.post('/auth/login', form);
//       localStorage.setItem('token', data.token);
//       const decoded = jwtDecode(data.token);
//       setUserName(decoded.name);
//       toast.success('Login successful!');
//       navigate('/');
//     } catch (error) {
//       toast.error('Login failed: ' + (error.response?.data?.message || 'Unknown error'));
//     }
//   };

//   return (
//     <div className="login-container">
//       <form onSubmit={handleSubmit} className="login-form">
//         <h2>Login</h2>

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

//         <button type="submit" className="btn-submit">Login</button>

//         <p className="signup-link">
//           Don't have an account? <Link to="/signup">Sign Up</Link>
//         </p>
//       </form>

//       {/* Toast container to show toast notifications */}
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop
//         closeOnClick
//         rtl={false}
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//         theme="colored"
//       />
//     </div>
//   );
// }
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';
import jwtDecode from 'jwt-decode';
import { FaEnvelope, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

export default function Login({ setUserName }) {
  const [form, setForm] = useState({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post('/auth/login', form);
      localStorage.setItem('token', data.token);
      const decoded = jwtDecode(data.token);
      setUserName(decoded.name);

      toast.success('Login successful! Redirecting...', {
        autoClose: 2000,
        onClose: () => navigate('/'),
      });
    } catch (error) {
      toast.error('Login failed: ' + (error.response?.data?.message || 'Unknown error'));
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
        <h2>Login</h2>

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

        <button type="submit" className="btn-submit">Login</button>

        <p className="signup-link">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </form>

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
