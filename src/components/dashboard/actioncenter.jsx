import { useState, useEffect } from "react";
import { Container, Row, Col, Button, Form } from "react-bootstrap";

const ActionCenter = () => {
  return (
    <Container fluid className="mt-5">
      <Row>
        <Col md={7} sm={12}>
          <p> Action center </p>
          <p> Your Current Summary and Activity </p>
        </Col>
        <Col md={5} sm={12}>
          {/* <Button> Export Report </Button> */}
          <Button> New Document1 </Button>
        </Col>
      </Row>
      <Row>
        <Col md={7} sm={12}>
          <Button> Individual </Button>
          <Button> Organization </Button>
          <Button> Custom </Button>
          <Button> + </Button>
        </Col>
        <Col md={5} sm={12}>
          <Form.Control type="date" />
          <Form.Control type="date" />
          <Button> Filters </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ActionCenter;
