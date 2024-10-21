import { useState } from "react";
import { registerUser } from "../services/api";
import './register.css';

const Register = () =>{
    const [formData, setFormData] = useState({
        username : '',
        email : '',
        password1 : '',
        password2 : '',
    });

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]:e.target.value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await registerUser(formData);
          console.log('Registration successful:', response);
        } catch (error) {
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
          <form className="register-form" onSubmit={handleSubmit}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password1"
              placeholder="Password"
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password2"
              placeholder="Confirm Password"
              onChange={handleChange}
              required
            />
            <button type="submit">Register</button>
          </form>
        </div>
      );
    };

export default Register;