import React, { useState } from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  InputGroup,
  FormControl as BSFormControl,
  Image,
} from "react-bootstrap";
import { useNavigate, useLocation } from "react-router-dom";
import { useMutation } from 'react-query';
import Generator from "../../../assets/images/SignUp/generator.png"
import Logo from "../../../assets/images/SignUp/logo.png"
import { loginWithPassword } from '../../../app/api/userApi';
import CommonLoginScroller from "../commonlogin";
import backgroundImage from "../../../assets/images/SignUp/bck.svg";


const Login = () => {

  const [thisEmail, setThisEmail] = useState("");
  const navigate = useNavigate();

  // const { mutate, isLoading } = useMutation(loginWithPassword, {
  //   onSuccess: (data) => {
  //     console.log('data', data.data);
  //     const userData = data.data;
  //     localStorage.setItem('useremail', JSON.stringify(userData));
    
  //     navigate('/dashboard', { replace: true });
  //   },
  //   onError: (error) => {
  //     if (error.response?.data?.message) {
  //       toast.error(error.response.data.message);
  //     }
  //   },
  // });
  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem('useremail',thisEmail)
    navigate("/signin")
    // const formData = {
    //   email: thisEmail,
      
    // };
  
    // mutate(formData);
  };
  const handlesignup=()=>{
    navigate("/signup")
   
  }
  // const handlesignin =()=>{
  //   navigate("/signin")
  // }

  return (
    <Container fluid className="vh-100 d-flex align-items-center">
      <Row className="w-100">
        
       
        
        <Col
          md={6}
          className="d-none d-md-flex align-items-center justify-content-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            height: "100vh",
          }}
        >
          <div style={{width:"90%"}}>
                                 <CommonLoginScroller/>
                                 </div>
        </Col>
        <Col md={6} className="d-flex flex-column align-items-center justify-content-center">
          
          <div className="text-center mb-4">
            {/* <div style={{ position: "relative", width: "140px", margin: "auto" }}>
              <div
                style={{
                  position: "absolute",
                  left: "12px",
                  top: "12px",
                  height: "80px",
                  width: "80px",
                  borderRadius: "50%",
                  backgroundColor: "#BFD4E9",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  left: "30px",
                  height: "64px",
                  width: "64px",
                  borderRadius: "50%",
                  backgroundColor: "#063668",
                  zIndex: 2,
                }}
              />
              <div
                style={{
                  position: "absolute",
                  right: "2px",
                  top: "-4px",
                  height: "40px",
                  width: "40px",
                  borderRadius: "50%",
                  backgroundColor: "#DD1515",
                  zIndex: 999,
                }}
              />
            </div>
            <h1 className="text-primary" style={{marginTop:"7rem"}}>
              E-Sign
               <span className="fs-6 text-muted">Sign</span> 
            </h1> */}
            <Image
            src={Logo}
            alt="Login"
           
          />
          </div>

         
          <div style={{ maxWidth: "400px", width: "100%" }}>
            <h2 className="mb-4 text-start">Log in</h2>
            <Form onSubmit={handleSubmit}>
              
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="example@example.com"
                  value={thisEmail}
                  onChange={(e) => setThisEmail(e.target.value)}
                  required
                />
              </Form.Group>
              <Button
                type="submit"
                className="w-100 mb-3 btn-bg-indigo"
                // onClick={handlesignin}
                style={{
                  // backgroundColor: "#2a4365",
                  border: "none",
                  borderRadius: "25px",
                  padding: "10px 20px",
                }}
              >
                Continue
              </Button>

              <div className="text-center">
                <span className="text-muted">Don't have an account? </span>
                <Button variant="link" className="p-0 text-primary" onClick={handlesignup}>
                  Sign up
                </Button>
              </div>
            </Form>
          </div>
        </Col>

      </Row>
    </Container>
  );
};

export default Login;
