import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container, Modal, Tab} from 'react-bootstrap';
import '../../../src/index.css'
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';

import './NavBar.css';

import Auth from '../../utils/auth';

const NavBar = () => {
  // set modal display state
  const [showModal, setShowModal] = useState(false);
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  return (
    <>
      <Navbar className="NavBar" variant='dark' expand='lg'>
        <Container fluid>

          <Navbar.Brand as={Link} to='/'> <h1> QUIZ APP </h1> </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>

              {/* Signup Modal */}
              {Auth.loggedIn() ? (
                <>
                <Link className="btn btn-lg btn-info m-2" to="/me">
                {Auth.getProfile().data.username}'s profile
                </Link>
                <button className="logoutButton" onClick={logout}>
                  <h3>Logout</h3>
                </button>
                </>
              ) : (
                <Nav.Link onClick={() => setShowModal(true)}>
                  <h3>Login/Sign Up</h3>
                </Nav.Link>
              )}
            </Nav>

          </Navbar.Collapse>

        </Container>
      </Navbar>

      {/* set modal data up */}
      <Modal
        size='lg'
        show={showModal}
        onHide={() => setShowModal(false)}
        aria-labelledby='signup-modal'>
        {/* tab container to do either signup or login component */}
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header className="ModalHeader" closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={() => setShowModal(false)} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default NavBar;