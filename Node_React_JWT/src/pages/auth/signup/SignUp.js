import React from 'react'
import { Button } from 'react-bootstrap'
import { Form } from 'react-bootstrap'
import { useState } from 'react'; // Import useState here
import './SignUp.css';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {
    
    const navigate = useNavigate();
    const[formData, setFormData] = useState({
        email:'',
        name:'',
        password:''
    })

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({ ...formData, [name]: value });
    }

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try{
           const response = await fetch("http://localhost:5000/user/register",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(formData)
            })
            const result = await response.json();
            console.log(result);
            navigate('/login');
        }catch(error){
            console.error(error.message);
        }finally{
           setFormData({
            email:"",
            name:"",
            password:""
           })
        }
    }

  return (
    <div className='center-form'>
        <Form onSubmit={handleSubmit}>
            <h1>SignUp</h1>
            <Form.Group  controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control 
                    type="email" 
                    name = "email"
                    placeholder="Enter email" 
                    value={formData.email}
                    onChange={handleInputChange}
                    />
            </Form.Group>
            <Form.Group controlId="formBasicname">
                <Form.Label>Name</Form.Label>
                <Form.Control 
                    type="name" 
                    name = "name"
                    placeholder="Enter name" 
                    value={formData.name}
                    onChange={handleInputChange}
                    />
            </Form.Group>
            <Form.Group controlId="formBasicpassword">
                <Form.Label>Password</Form.Label>
                <Form.Control 
                    type="password" 
                    name = "password"
                    placeholder="Enter password" 
                    value={formData.password}
                    onChange={handleInputChange}
                    />
            </Form.Group>
            <Button variant="primary" type="submit" className='w-100'>
                SignUp
            </Button>
        </Form>
    </div>
  )
}

export default SignUp