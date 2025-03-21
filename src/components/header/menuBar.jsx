import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { HeaderData } from "./headerData";
import Offcanvas from "react-bootstrap/Offcanvas";
import MenuBarIcon from "../../assets/Icons/MenuBar-Icon.png";
import { Link } from "react-router-dom";
import "./header.css";

function MenuBar() {
  return (
    <>
      {[false].map((expand) => (
        <Navbar
          key={expand}
          expand={expand}
          className="bg-body-tertiary"
          id="SideMenuBar"
        >
          <Container fluid>
            {/* <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} /> */}
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`}>
              <img
                src={MenuBarIcon}
                aria-controls={`offcanvasNavbar-expand-${expand}`}
                alt="..."
              />
            </Navbar.Toggle>
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${expand}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
              placement="end"
              className="maneuBarSlide"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title
                  id={`offcanvasNavbarLabel-expand-${expand}`}
                  claassName="MenuTitle"
                >
                  <p className="MenuTitle">Menu</p>
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                {HeaderData.map((item) => (
                  <ul
                    key={item.id}
                    className="MenuBarsUL"
                    style={{
                      boxShadow: `
        4px 4px 8px rgba(0, 0, 0, 0.2), 
        inset -2px -2px 4px rgba(255, 255, 255, 0.6),
        inset 2px 2px 4px rgba(0, 0, 0, 0.1) 
      `,
                    }}
                  >
                    <li>
                      <Link to={item.url}>{item.menu}</Link>
                    </li>
                    <li>
                      <Link to="/features">Features</Link>
                    </li>
                    <li>
                      <Link to="/faq">FAQs</Link>
                    </li>
                    <li>
                      <Link to="/pricing">Pricing</Link>
                    </li>
                    <li>
                      <Link to="/blogs">Blogs</Link>
                    </li>
                    <li>
                      <Link to="/aboutus">About Us</Link>
                    </li>
                    <li>
                      <Link to="/contactus">Contact Us</Link>
                    </li>
                  </ul>
                ))}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default MenuBar;
