import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import useFetch from '../../hooks/fetch.hook';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './NavbarComp.css';

export default function NavbarComp() {
  const navigate = useNavigate();
  const [{ isLoggedIn }] = useFetch();
  // logout handler function
  function userLogout() {
    localStorage.removeItem('token');
    window.location.reload();
    navigate('/');
  }
  return (
    <div>
      {['xxl'].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          id="navbar"
          bg="black"
          variant="dark"
        >
          <Container fluid id="containerNav">
            <Navbar.Brand href="/" id="brand">
              <span>HELLA</span>
              <span id="digital"> DIGITAL</span>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
            <Navbar.Offcanvas
              className="navbarOffcanvas"
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                  <Navbar.Brand href="/" id="brand">
                    <span>HELLA</span>
                    <span id="digital"> DIGITAL</span>
                  </Navbar.Brand>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="What digital product or service are you looking for today?"
                    className="me-2"
                    aria-label="Search"
                    style={{
                      width: '450px',
                    }}
                  />
                  <Button variant="outline-primary">Search</Button>
                </Form>
                {isLoggedIn ? (
                  <div className="ms-auto" id="tabs">
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <Nav.Link as={Link} to={'/dashboard'}>
                        <span>Dashboard</span>
                      </Nav.Link>
                      <Nav.Link as={Link} to={'/orders'}>
                        <span>Orders</span>
                      </Nav.Link>
                      <Nav.Link as={Link} to={'/listings'}>
                        <span>Listings</span>
                      </Nav.Link>
                      <NavDropdown
                        title="Profile"
                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                      >
                        <NavDropdown.Item as={Link} to={'/messages'}>
                          Messages
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={'/notifications'}>
                          Notifications
                        </NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item as={Link} to={'/profile'}>
                          Edit Profile
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={''}>
                          Settings
                        </NavDropdown.Item>
                        <NavDropdown.Item
                          onClick={userLogout}
                          as={Link}
                          to={''}
                        >
                          Log Out
                        </NavDropdown.Item>
                      </NavDropdown>
                    </Nav>
                  </div>
                ) : (
                  <Nav className="justify-content-end ms-auto">
                    <Nav.Link as={Link} to={'/username'}>
                      <span>Login</span>
                    </Nav.Link>
                    <Nav.Link as={Link} to={'/register'}>
                      <span>Register</span>
                    </Nav.Link>
                  </Nav>
                )}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </div>
  );
}
