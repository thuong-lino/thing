import React, { Component } from 'react';
import { Navbar, Container, Nav } from 'react-bootstrap';
import { Link, withRouter } from 'react-router-dom';
class Layout extends Component {
  render() {
    return (
      <>
        <Navbar bg="dark" variant="dark" fixed="top">
          <Container>
            <Link to="/">
              <Navbar.Brand>Brand</Navbar.Brand>
            </Link>
            <Nav className="me-auto">
              <Nav.Link href="/">Home</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
              <Nav.Link href="#pricing">Pricing</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
        <Container>{this.props.children}</Container>
      </>
    );
  }
}

export default withRouter(Layout);
