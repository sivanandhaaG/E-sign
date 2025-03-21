import { Button } from '@chakra-ui/react';
import React from 'react';
import { Col, Row } from 'react-bootstrap';

const PricingTable = () => {
  return (
    <Row
      className='mt-5 g-4'
      style={{
        minWidth: '1080px',
      }}
    >
      <Col
        style={{
          minWidth: '280px',
          maxWidth: '280px',
        }}
      ></Col>
      <Col
        className='text-center border  px-5 py-4 border-top-0 border-bottom-0'
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <span className='h5'> Startup</span>
        <Button
          colorScheme='teal'
          size='md'
          className='mt-3'
          variant={'outline'}
        >
          Choose Plan
        </Button>
      </Col>
      <Col
        className='text-center border  px-5 py-4 border-top-0 border-bottom-0'
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <span className='h5'> Premium</span>
        <Button
          size='md'
          colorScheme='teal'
          className='mt-3'
          variant={'outline'}
        >
          Choose Plan
        </Button>
      </Col>
      <Col
        className='text-center border  px-5 py-4 border-top-0 border-bottom-0'
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <span className='h5'> Scale</span>
        <Button
          size='md'
          colorScheme='teal'
          className='mt-3'
          variant={'outline'}
        >
          Choose Plan
        </Button>
      </Col>
      <Col
        className='text-center border  px-5 py-4 border-top-0 border-bottom-0'
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <span className='h5'> Enterprise</span>
        <Button
          size='md'
          colorScheme='teal'
          className='mt-3'
          variant={'outline'}
        >
          Choose Plan
        </Button>
      </Col>
    </Row>
  );
};

export default PricingTable;
