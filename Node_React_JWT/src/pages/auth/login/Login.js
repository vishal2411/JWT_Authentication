import React, { useState } from 'react';
import { Button, Form, Alert } from 'react-bootstrap'; // Import Alert for error messages
import './Login.css';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState(''); // State to hold error messages

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(''); // Clear previous errors

    try {
      const response = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      if (!response.ok) {
        // Check if response is not OK and set an error message
        const result = await response.json();
        throw new Error(result.message || "Login failed");
      }

      const result = await response.json();
      localStorage.setItem("token", result.token);
      console.log(result);
      navigate('/dashboard');
    } catch (error) {
      // Set the error message from the catch block
      setError(error.message);
    } finally {
      setFormData({
        email: "",
        password: ""
      });
    }
  };

  return (
    <div className='center-form'>
      <Form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {error && <Alert variant="danger">{error}</Alert>} {/* Display error message if exists */}
        <Form.Group controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control 
            type="email" 
            name="email"
            placeholder="Enter email" 
            value={formData.email}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Form.Group controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            name="password"
            placeholder="Enter password" 
            value={formData.password}
            onChange={handleInputChange}
          />
        </Form.Group>
        <Button variant="primary" type="submit" className='w-100'>
          Login
        </Button>
      </Form>
    </div>
  );
};

export default Login;
