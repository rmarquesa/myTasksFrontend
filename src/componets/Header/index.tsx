import React from 'react'
import { Container, Nav, Navbar} from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Header: React.FC = () => {
  return (
    <>
    <Navbar bg="dark" variant="dark">
      <Container>
        <Navbar.Brand href="#home">MyTasks</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Item as={Link} className="nav-link" to="/">Home</Nav.Item>
          <Nav.Item as={Link} className="nav-link" to="/tasks">Tasks</Nav.Item>
        </Nav>
      </Container>
    </Navbar>
    <br />
    </>
  );
}

export default Header;