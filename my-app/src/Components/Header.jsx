import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand className="d-flex justify-content-center w-100">
            Obesity Map Of Different States
          </Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;
