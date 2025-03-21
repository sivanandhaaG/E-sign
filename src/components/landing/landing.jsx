import {useState, useEffect} from 'react'
import { Container,Row, Col, Button } from 'react-bootstrap'
import SignUpPage from '../../pages/auth/signup'
import './landing.css'

//Images
import PlayIcon from '../../assets/images/general/play.png'

const LandingComponent = () =>{
    return(
        <Container fluid className='mt-5 py-5 slate-blue-bg'>
            <Container>
                <Row className='mt-md-3'>
                    <Col md={2}>
                    </Col>
                    <Col md={8}>
                        <p className='landing-text'> <span className='break-color'> Break free </span> <span className='break-color-not'> from the shackles of paperwork. </span></p>
                        <p className='landing-subtitle'> Embrace efficiency and cut the chains of paperwork! Liberate your organization to thrive in a paperless future. </p>
                    </Col>
                    <Col md={2}>
                    </Col>
                    <Col className='d-flex justify-content-center align-items-center'>
                    <Button size='lg' className='mx-1 btn-bg-indigo'> Request a demo </Button> <Button size='lg' className='mx-1 btn-outlne-indigo'> <img src={PlayIcon} alt=''/> Watch in Action </Button>
                    </Col>
                    <SignUpPage/>
                    
                </Row>
            </Container>
        </Container>
    )
}

export default LandingComponent