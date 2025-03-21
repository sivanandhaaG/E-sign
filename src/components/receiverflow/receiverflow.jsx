import {useState, useEffect} from 'react'
import {Container, Row, Col, Button, Form,Table, Card,InputGroup, ButtonGroup, Image, Modal } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

// Images
import ReceiverImg from '../../assets/images/general/receiverflow.png'
import PopupTick from '../../assets/images/general/popuptick.png'

const ReceiverFlow = () =>{

  const navigate = useNavigate()
    // Set to sign 1
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Set to view nsdl website
    const [showNsdl, setShowNsdl] = useState(true);
    const handleCloseNsdl = () => setShowNsdl(false);
    const handleShowNsdl = () => {
        setShowNsdl(!showNsdl)
        handleClose()
      }

    // Set 3 to show success response
    const [showSuccess, setShowSuccess] = useState(false);
    const handleCloseSuccess = () => {
      setShowSuccess(false)
      setShowNsdl(!showNsdl)
      navigate('/dashboard')
    }
    const handleShowSuccess = () => {
      setShowSuccess(true)
      handleCloseNsdl()
    }

    return(
        <Container fluid className='mt-5'>
          {showNsdl && (
            <Container className='py-5 px-0'>
              
              <Row className='px-0'>
                  <Col sm={12} md={8}>
                      <p className='esign-page-subheading'> NSDL based document signature </p>
                  </Col>
                  <hr className='mt-0'/>
              </Row>
              <Row className='d-flex align-items-center justify-content-center mb-5'>
                  <Image onClick={handleShow} className='w-50' src={ReceiverImg} alt='' />
              </Row>
              <hr className='mt-0'/>
              <Row>
                  <Col className='text-start'>
                  <Button className='btn-slate'> Previous </Button>
                  </Col>
                  <Col className='text-end'>
                  <Button className='btn-bg-indigo'> Next </Button>
                  </Col>
              </Row>
          </Container>
          )}

          {!showNsdl && (
            <Container className='py-5 px-0'>
              <iframe src="https://chat.openai.com/" width="100%" height="500" frameborder="0"></iframe>
                <Button className='btn-bg-indigo w-100 text-center' onClick={handleShowSuccess}> Proceed to sign </Button>
            </Container>
          )}
            

            {/* Set 1 */}
            <Modal show={show} onHide={handleClose}>
                <Modal.Body>
                      <img src={PopupTick} alt=''/>
                    <p className='page-subtitle mt-3'> Select Authentication Type </p>
                    <Form.Select size="sm" className='input-text'>
                                <option> OTP </option>
                    </Form.Select>
                    <Form.Check size="sm" className='mt-3 esign-page-subheading' type='checkbox' label='I Agree to the terms & conditions'>
                    </Form.Check>
                    <p className='esign-page-subheading'> By clicking this checkbox and eSign button, I voluntarily agree to Aadhaar eSign the previewed </p>

                    <Row>
                        <Col md={6}>
                        <Form.Control
                                        type="text"
                                        className='input-text'
                                        placeholder="Name"
                                        />
                        </Col>
                        <Col md={6}>
                        <Form.Control
                                        type="text"
                                        className='input-text'
                                        placeholder="Email"
                                        />
                        </Col>
                        
                    </Row>
                    <Row className='my-3'>
                    <Col md={6}>
                        <Button className='btn-slate w-100 text-center' onClick={handleClose}> Cancel </Button>
                        </Col>
                        <Col md={6}>
                        <Button className='btn-bg-indigo w-100 text-center' onClick={handleShowNsdl}> Proceed to sign </Button>
                        </Col>
                        <Col md={12}>
                          <p className='esign-page-subheading mt-1'> You will be redirected to the NSDL website for the eSign process</p>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>

            {/* Set 3 */}

            <Modal show={showSuccess} onHide={handleCloseSuccess}>
                <Modal.Body>
                      <img src={PopupTick} alt=''/>
                    <p className='page-subtitle mt-3 mb-0'> Success </p>
                    <p className='esign-page-subheading mt-0'> The document has been signed successfully. </p>

                    <Row className='my-3'>
                        <Col md={12} className='text-center'>
                        <Button className='btn-bg-indigo w-100 text-center' onClick={handleCloseSuccess}> Explore our Products </Button>
                        </Col>
                    </Row>
                </Modal.Body>
            </Modal>

        </Container>
    )
}

export default ReceiverFlow
