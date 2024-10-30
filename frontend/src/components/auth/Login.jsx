import React, { useState, useContext } from "react";
import { Container, Row, Col, Form, FormGroup, Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Link } from "react-router-dom";
import axios from 'axios';
import { AuthContext } from "./authcontext";
import { useNavigate } from "react-router-dom";
import '../../styles/login.css';

import loginImg from '../../assets/images/login.jpg';
import userIcon from '../../assets/images/userIcon.png';

const Login = () => {
  const { login } = useContext(AuthContext);  // Access login function from AuthContext
  const navigate = useNavigate();

  const [credentials, setCredentials] = useState({
    email: undefined,
    password: undefined
  });

  const [showPopup, setShowPopup] = useState(false);  // State for controlling the popup

  // Handle form input changes
  const handleChange = (e) => {
    setCredentials(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  // Handle login button click
  const handleClick = async (e) => {
    e.preventDefault();
    console.log("clicking");
    
    const email = credentials.email;
    const password = credentials.password;

    try {
      // Send login request to your backend
      const response = await axios.post('http://localhost:7800/api/auth/login', { email, password });
      
      const { token } = response.data;  // Assuming the response contains the token

      // Update the authentication state by calling login with the token
      login(token);  // Call login from AuthContext with the token
      
      setShowPopup(true);  // Show success popup on successful login
    } catch (err) {
      console.error("Login Error:", err);
    }
  };

  // Close the popup and navigate to the home page
  const handleClosePopup = () => {
    setShowPopup(false);
    navigate('/home');  // Navigate to home after closing the popup
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className="m-auto">
            <div className="login__container d-flex justify-content-between">
              <div className="login__img">
                <img src={loginImg} alt="Login" />
              </div>
              <div className="login__form">
                <div className="user">
                  <img src={userIcon} alt="User Icon" />
                </div>
                <h2>Login Here!</h2>

                <Form onSubmit={handleClick}>
                  <FormGroup>
                    <input 
                      type="email" 
                      placeholder="Email" 
                      required 
                      id="email"
                      onChange={handleChange} 
                    />
                  </FormGroup>
                  <FormGroup>
                    <input 
                      type="password" 
                      placeholder="Password" 
                      required 
                      id="password"
                      onChange={handleChange} 
                    />
                  </FormGroup></Form>
                  <Button className="btn secondary__btn auth__btn" type="submit" style={{ color: 'white' }} onClick={handleClick}>Login</Button>
          
                <p> Don't have an account? <Link to='/register'>Signup</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Popup Modal */}
      <Modal isOpen={showPopup} centered toggle={handleClosePopup}>
        <ModalHeader toggle={handleClosePopup}>Login Successful</ModalHeader>
        <ModalBody>
          You have successfully logged in!
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleClosePopup}>Close</Button>
        </ModalFooter>
      </Modal>
    </section>
  );
};

export default Login;
