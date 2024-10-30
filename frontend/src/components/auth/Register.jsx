import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Container, Row, Col, Modal, ModalHeader, ModalBody, ModalFooter, Button } from "reactstrap";
import '../../styles/register.css';

import regImg from '../../assets/images/regimg.png';
import userIcon from '../../assets/images/userIcon.png';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [showPopup, setShowPopup] = useState(false); // State for controlling the popup
  const navigate = useNavigate();

  // Handle form submission for registration
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, email, password);
    try {
      // Make an API request to the registration endpoint
      const result = await axios.post('http://localhost:7800/api/auth/signup', {
        username,
        email,
        password,
      });
      console.log(result);
      
      // Show the success popup after registration
      setShowPopup(true);
    } catch (err) {
      console.error("Error:", err.response ? err.response.data : err.message);
    }
  };

  // Handle the closing of the popup and redirect to the login page
  const handleClosePopup = () => {
    setShowPopup(false);
    navigate('/login'); // Navigate to the login page after closing the popup
  };

  return (
    <section>
      <Container>
        <Row>
          <Col lg='8' className='m-auto'>
            <div className="reg__container d-flex justify-content-between">
              <div className="reg__img">
                <img src={regImg} alt="Registration" />
              </div>
              <div className="reg__form">
                <div className="user">
                  <img src={userIcon} alt="User Icon" />
                </div>
                <h2>Sign Up Here!</h2>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <input
                      type="text"
                      placeholder="Enter Name"
                      autoComplete="off"
                      name="username"
                      className="form-control rounded"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="email"
                      placeholder="Enter Email"
                      autoComplete="off"
                      name="email"
                      className="form-control rounded"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-3">
                    <input
                      type="password"
                      placeholder="Enter Password"
                      name="password"
                      className="form-control rounded"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <button type="submit" className="regbtn btn w-100 rounded">
                    Register
                  </button>
                </form>
                <p>Already Have an Account? <Link to='/login'>Login</Link></p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>

      {/* Popup Modal */}
      <Modal isOpen={showPopup} toggle={handleClosePopup}>
        <ModalHeader toggle={handleClosePopup}>Sign Up Successful</ModalHeader>
        <ModalBody>
          You have successfully signed up!
        </ModalBody>
        <ModalFooter>
          <Button color="primary" onClick={handleClosePopup}>Close</Button>
        </ModalFooter>
      </Modal>
    </section>
  );
}

export default Register;
