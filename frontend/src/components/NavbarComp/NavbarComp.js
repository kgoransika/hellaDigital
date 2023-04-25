import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { getUsername } from '../../helper/helper';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import './NavbarComp.css';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import Inventory2OutlinedIcon from '@mui/icons-material/Inventory2Outlined';
import CurrencyExchangeRoundedIcon from '@mui/icons-material/CurrencyExchangeRounded';
import ReceiptLongIcon from '@mui/icons-material/ReceiptLong';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import PostAddRoundedIcon from '@mui/icons-material/PostAddRounded';
import { GiWallet } from 'react-icons/gi';

export default function NavbarComp() {
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('');
  const navigate = useNavigate();

  const token = localStorage.getItem('token');

  useEffect(() => {
    getUsername()
      .then((decodedToken) => {
        setUsername(decodedToken.username);
        setRole(decodedToken.role);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

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
                {role === 'client' && (
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
                )}

                {token ? (
                  <div className="ms-auto" id="tabs">
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      {role !== 'client' && (
                        <>
                          <Nav.Link as={Link} to={'/dashboard'}>
                            <DashboardRoundedIcon className="h-6 w-6" />
                          </Nav.Link>
                          <Nav.Link as={Link} to={'/'}>
                            <GiWallet className="h-6 w-6" />
                          </Nav.Link>
                          {role === 'dps' && (
                            <>
                              <Nav.Link as={Link} to={'/listings'}>
                                <Inventory2OutlinedIcon className="h-6 w-6" />
                              </Nav.Link>
                            </>
                          )}
                          {role === 'dsp' && (
                            <>
                              <Nav.Link as={Link} to={'/serviceListings'}>
                                <PostAddRoundedIcon className="h-8 w-6" />
                              </Nav.Link>
                            </>
                          )}
                        </>
                      )}
                      {role === 'client' && (
                        <>
                          <Nav.Link as={Link} to={'/cart'}>
                            <ShoppingCartOutlinedIcon className="h-6 w-6" />
                          </Nav.Link>

                          <Nav.Link as={Link} to={'/products'}>
                            <Inventory2OutlinedIcon className="h-6 w-6" />
                          </Nav.Link>

                          <Nav.Link as={Link} to={'/'}>
                            <CurrencyExchangeRoundedIcon className="h-6 w-6" />
                          </Nav.Link>
                        </>
                      )}
                      <Nav.Link as={Link} to={'/orders'}>
                        <ReceiptLongIcon className="h-6 w-6" />
                      </Nav.Link>
                      <NavDropdown
                        title="Profile"
                        id={`offcanvasNavbarDropdown-expand-${expand}`}
                      >
                        <NavDropdown.Item as={Link} to={'/notifications'}>
                          Notifications
                        </NavDropdown.Item>
                        <NavDropdown.Item as={Link} to={'/messages'}>
                          Messages
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
