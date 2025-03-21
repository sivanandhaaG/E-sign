import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Logo from "../../assets/logo/logo.svg";
import Avatar from "../../assets/images/general/Avatar.png";
import "./header.css";

// Import data
import { HeaderData } from "./headerData";
import { useSelector } from "react-redux";

const Header = () => {
  const location = useLocation();
  const [activePage, setActivePage] = useState(8); // Set the initial state to 8 (Sign in)

  const isLoggedIn = useSelector((state) => state.user?.accessToken);

  useEffect(() => {
    // Get the path from the location object
    const currentPath = location.pathname;

    // Find the matching page from HeaderData based on the current path
    const matchingPage = HeaderData.find((item) => item.url === currentPath);

    // Update the activePage state with the matching page, or keep it as 8 (Sign in) if not found
    setActivePage(matchingPage ? matchingPage.id : 8);
  }, [location.pathname]);

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      className="bg-body-tertiary my-md-0 fixed-css"
      fixed="top"
    >
      <Container className="px-1 px-md-0">
        <Navbar.Brand href="/">
          <img src={Logo} alt="" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav style={{ justifyContent: "flex-end" }}>
            {HeaderData.map((item) => {
              const { id, menu, url } = item;
              const isActive = id === activePage;

              // Don't display sign in link when user is logged in
              if (isLoggedIn && url == "/signin") return;
              if (!isLoggedIn && url == "/logout") return;
              if (isLoggedIn && url == "/login") return;

              return (
                <Nav.Link
                  className={`header-text px-md-3 ${
                    isActive ? "active-link" : ""
                  }`}
                  key={id}
                  href={url}
                >
                  {menu}
                </Nav.Link>
              );
            })}
          </Nav>
          {/* <img style={{width:'4%',float:'right', marginLeft:"10px"}} className='img img thumbnail' src={Avatar} alt='' /> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
