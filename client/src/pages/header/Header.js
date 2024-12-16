import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import styles from "./Header.module.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Remove the token
    // Optionally navigate to login or home page
    navigate("/login");
  };

  return (
    <>
      <Navbar className={styles.navbar} bg="dark" data-bs-theme="dark">
        <Container>
          <Navbar.Brand className={styles.navbarBrand}>
            <Link to="/" className="navbar-brand">
              <strong>Weather-app</strong>
            </Link>
          </Navbar.Brand>
          <Nav className="ml-auto">
            {token ? (
              <>
                <Nav.Link
                  as={Link}
                  to="/saved-cities"
                  className={styles.navLink}
                >
                  Saved-cities
                </Nav.Link>
                <Nav.Link onClick={handleLogout} className={styles.navLink}>
                  Logout
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={Link} to="/login" className={styles.navLink}>
                  Login
                </Nav.Link>
                <Nav.Link as={Link} to="/signup" className={styles.navLink}>
                  Signup
                </Nav.Link>
              </>
            )}
          </Nav>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
