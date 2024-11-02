import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerUser } from "../services/api";
import './styling/register.css';

const Register = () => {
  const navigate = useNavigate();
  const [errormsg, setError] = useState([]);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password1: '',
    password2: '',
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await registerUser(formData);
      console.log(response.data);
      setSuccess('Registration Successful!')

      setTimeout(()=>{
        setLoading(false);
        navigate('/login');
      }, 2000);
      
    } catch (error) {
      setError(error.response.data);

      // Log the full error response to understand the issue
      if (error.response) {
        console.error('Error response:', error.response.data);
      } else {
        console.error('Error:', error);
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {loading ? (
        <div className="loader">Loading...</div> // Loader animation
      ) : (
      <form className="register-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          className={errormsg.username ? 'error-user' : 'username'}
          placeholder="Username"
          onChange={handleChange}
          required
        />
        {errormsg.username && (
          <span className="error-msg">
            {errormsg.username}
          </span>
        )}
        <input
          type="email"
          name="email"
          className={errormsg.email ? 'error-email' : 'email'}
          placeholder="Email"
          onChange={handleChange}
          required
        />
        {errormsg.email && (
          <span className="error-msg">
            {errormsg.email}
          </span>
        )}
        <input
          type="password"
          name="password1"
          className={errormsg.password1 ? 'error-pass' : 'password1'}
          placeholder="Password"
          onChange={handleChange}
          required
        />
        {errormsg.password1 && (
          <span className="error-msg">
            {errormsg.password1}
          </span>
        )}
        <input
          type="password"
          name="password2"
          placeholder="Confirm Password"
          onChange={handleChange}
          required
        />
        <button type="submit">Register</button>
      </form>
      )}

      {success && <p>{success}</p>}
    </div>
  );
};

export default Register;