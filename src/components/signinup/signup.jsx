import { useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import CommonLoginScroller from "./commonlogin";

import Form from 'react-bootstrap/Form';

const SignUp = () =>{
    return(
        <Container fluid className='mt-5 py-2 px-md-2 px-0 bg-white rounded-4'>
            <Container className=''>
                <Row className='d-flex justify-content-center align-items-center py-0 py-md-3'>
                    <Col md={6} className='mb-3'>
                       <CommonLoginScroller/>
                    </Col>
                    <Col md={6}>
                        <Row>
                            <Col md={12}>
                            <p className='signinup-common-title'> Sign up</p>
                            <p> <span className='signinup-common-sub1'> Have an account already ? </span> <span className='signinup-common-sub2'> <a href='/signin'>Sign in</a>  </span> </p>
                            <Form>
                                {['radio'].map((type) => (
                                    <div key={`inline-${type}`} className="mb-3">
                                    <Form.Check
                                        className='radio-border'
                                        inline
                                        label="Individual"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-1`}
                                    />
                                    <Form.Check
                                        className='radio-border'
                                        inline
                                        label="Corporate"
                                        name="group1"
                                        type={type}
                                        id={`inline-${type}-2`}
                                    />
                                    </div>
                                ))}
                                </Form>
                            </Col>
                            <Col md={4} className="mt-2">
                            <Form.Label ><span className="signup-label"> First Legal Name </span><span className="signup-label-mandatory"> * </span> </Form.Label>
                                <Form.Control
                                    size="sm" className='input-text'
                                    type="text"
                                    placeholder='First Legal Name'
                                />
                            </Col>
                            <Col md={4} className="mt-2">
                            <Form.Label ><span className="signup-label"> Middle Name </span> </Form.Label>
                                <Form.Control
                                    size="sm" className='input-text'
                                    type="text"
                                    placeholder='Middle Name'
                                />
                            </Col>
                            <Col md={4} className="mt-2">
                            <Form.Label ><span className="signup-label"> Last Legal Name </span><span className="signup-label-mandatory"> * </span> </Form.Label>
                                <Form.Control
                                    size="sm" className='input-text'
                                    type="text"
                                    placeholder='Last Legal Name'
                                />
                            </Col>  
                            <Col md={6} className="mt-2">
                            <Form.Label ><span className="signup-label"> Mobile Number </span><span className="signup-label-mandatory"> * </span> </Form.Label>
                                <Form.Control
                                    size="sm" className='input-text'
                                    type="number"
                                    placeholder='Mobile Number'
                                />
                            </Col> 
                            <Col md={6} className="mt-2">
                            <Form.Label ><span className="signup-label"> Email </span><span className="signup-label-mandatory"> * </span> </Form.Label>
                                <Form.Control
                                    size="sm" className='input-text'
                                    type="email"
                                    placeholder='Email'
                                />
                            </Col> 
                            {/* <Col md={12} className="mt-2">
                            <Form.Label ><span className="signup-label"> Password </span><span className="signup-label-mandatory"> * </span> </Form.Label>
                                <Form.Control
                                    size="sm" className='input-text'
                                    type="password"
                                    placeholder='Password'
                                />
                            </Col>  */}
                            <Col md={12} className='mt-2'>
                                <Button size='md' className='mx-0 my-1 btn-bg-indigo' > Create Account  </Button>
                            </Col>
                        </Row>
                            
                    </Col>
                </Row>
            </Container>
        </Container>
    )
}

export default SignUp