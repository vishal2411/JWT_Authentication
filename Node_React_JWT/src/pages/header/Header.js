import React from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import './Header.css';

const Header = () => {
    const token = localStorage.getItem("token");
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <Navbar className={`custom-navbar ${token ? 'logged-in' : 'not-logged-in'}`} data-bs-theme="dark">
            <Container>
                <Navbar.Brand as={Link} to="/">{token ? "Logged-In" : "Not-Logged-In"}</Navbar.Brand>
                <Nav className="ml-auto">
                    {token ? (
                        <>
                            <Nav.Link as={Link} to="/dashboard" className='nav-link'>Dashboard</Nav.Link>
                            <Nav.Link className='nav-link' onClick={handleLogout}>Logout</Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link as={Link} to="/login" className='nav-link'>Login</Nav.Link>
                            <Nav.Link as={Link} to="/register" className='nav-link'>Signup</Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    );
};

export default Header;
