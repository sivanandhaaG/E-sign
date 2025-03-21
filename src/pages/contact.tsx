import React from 'react';
import { Container, Row } from 'react-bootstrap';
import CTAComponent from '../components/pricing/ctaComponent';

const ContactPage = () => {
  return (
    <Row className='mt-5 px-5'>
      <Container fluid className='py-5 px-5'>
        <CTAComponent />
      </Container>
    </Row>
  );
};

export default ContactPage;
