import React from "react";
import { Link } from "react-router-dom";
import { Navbar, Nav, Container} from 'react-bootstrap';
import '../../src/index.css'

// import Auth from '../utils/auth';

const AppNavbar = () => {
    return (
      <>
        <Navbar bg='dark' variant='dark' expand='lg'>
          <Container fluid>
            <Navbar.Brand as={Link} to='/'>
              QUIZ APP
            </Navbar.Brand>
              <Navbar.Toggle aria-controls='navbar'>
                <Navbar.Collapse id='navbar'>
                  <Nav className='ml-auto'>
                    <Nav.Link as={Link} to='/'>
                        Search for Quiz
                    </Nav.Link>
                  </Nav>
                </Navbar.Collapse>
              </Navbar.Toggle>
          </Container>
        </Navbar>
      </>
    );
};

export default AppNavbar;