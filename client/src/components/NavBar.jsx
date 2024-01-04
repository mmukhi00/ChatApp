import { Container, Nav, Navbar, Stack } from "react-bootstrap";
import { Link } from "react-router-dom";
import logo from "../assets/logo.svg";
import "../index.css";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
const NavBar = () => {
  const { user, logoutUser } = useContext(AuthContext);
  return (
    <Navbar style={styles.nav}>
      <Container>
        <Link to="/" className="link-light text-decoration-none">
          <img src={logo} style={{ width: "15%", height: "20%" }} />
        </Link>
        {user && (
          <span style={{ width: "170%", height: "20%", marginRight: "40%" }}>
            Logged in as {user?.name}
          </span>
        )}
        <Nav>
          <Stack direction="horizontal" gap={3}>
            {user && (
              <>
                <Link
                  onClick={() => {
                    logoutUser();
                  }}
                  to="/login"
                  className="link-dark text-decoration-none"
                >
                  Logout
                </Link>
              </>
            )}
            {!user && (
              <>
                <Link to="/login" className="link-dark text-decoration-none">
                  Login
                </Link>
                <Link to="/register" className="link-dark text-decoration-none">
                  Register
                </Link>
              </>
            )}
          </Stack>
        </Nav>
      </Container>
    </Navbar>
  );
};

const styles = {
  nav: {
    backgroundColor: "white",
    height: "180%",
  },
};

export default NavBar;
