import React from 'react';
import styles from './CorporateProfile.module.css';
import { Col, Container, Row } from 'react-bootstrap';
import CorporateDetailsForm from './CorporateDetailsForm';
import CorporateProfileForm from './CorporateProfileForm';

function CorporateProfile() {
    return (
        <Container fluid style={{ paddingInline: "2rem" }} >
            <Row className={styles.rowContainer}>
                <Col md={4}>
                    <label className={styles.label}>Corporate Info</label>
                    <p className={styles.labelDescription}>Update your corporate details</p>
                </Col>
                <Col md={8}>
                    <CorporateDetailsForm />
                </Col>
            </Row>
            {/* <Row className={styles.rowContainer}>
                <Col md={4}>
                    <label className={styles.label}>Profile</label>
                    <p className={styles.labelDescription}>Update your bio</p>
                </Col>
                <Col md={8}>
                    <CorporateProfileForm />
                </Col>
            </Row> */}
        </Container>
    )
}

export default CorporateProfile