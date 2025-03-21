import React, { useState } from "react";
import { Col, Form, Button, Container } from "react-bootstrap";
import { BsPlus } from "react-icons/bs";
import DeleteIcon from "../../assets/images/general/delete.png";
import Dropdown from "react-bootstrap/Dropdown";

function ReceiverDetails({ receivers, setReceivers, isReadOnly }) {
  const handleInputChange = (index, event) => {
    const newReceivers = receivers.map((receiver, rIndex) => {
      if (index === rIndex) {
        return { ...receiver, [event.target.name]: event.target.value };
      }
      return receiver;
    });

    setReceivers(newReceivers);
  };

  const addReceiver = () => {
    setReceivers([
      ...receivers,
      { name: "", email: "", phoneNumber: "", markers: [] },
    ]);
  };

  // const removeReceiver = (email) => {
  //   setReceivers(receivers.filter((receiver) => receiver.email !== email));
  // };
  const removeReceiver = (indexToRemove) => {
    // eslint-disable-next-line react/prop-types
    setReceivers(receivers.filter((_, index) => index !== indexToRemove));
  };

  const SignatureType = [{ type: "Virtual Sign" }, { type: "Doc Sign" }];

  // State to track the selected type and toggle status
  const [selectedType, setSelectedType] = useState("Signature Type");
  const [toggleState, setToggleState] = useState({
    "Virtual Sign": false,
    "Doc Sign": false,
  });

  // Handle toggle state change
  const handleToggleChange = (itemType) => {
    // Reset the other toggle to false and set the selected one to true
    const updatedState = {
      "Virtual Sign": false,
      "Doc Sign": false,
      [itemType]: true,
    };

    setToggleState(updatedState);
    setSelectedType(itemType);
  };

  return (
    <div>
      {receivers.map((receiver, index) => (
        <React.Fragment key={index}>
          <Container className="mb-3 ReceiverDetailsContent">
            <Col>
              <Form.Group>
                <Form.Label htmlFor="name" className="signup-label">
                  Name
                  <span className="signup-label-mandatory">*</span>
                </Form.Label>
                <Form.Control
                  type="text"
                  id="name"
                  name="name"
                  value={receiver.name}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Enter Receiver Name"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label htmlFor="email" className="signup-label">
                  Email
                  <span className="signup-label-mandatory">*</span>
                </Form.Label>
                <Form.Control
                  type="email"
                  id="email"
                  name="email"
                  value={receiver.email}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Enter Receiver Email"
                  required
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label htmlFor="phoneNumber" className="signup-label">
                  Mobile Number
                  <span className="signup-label-mandatory">*</span>
                </Form.Label>
                <Form.Control
                  type="phoneNumber"
                  id="phoneNumber"
                  name="phoneNumber"
                  value={receiver.phoneNumber}
                  onChange={(e) => handleInputChange(index, e)}
                  placeholder="Enter Receiver Mobile Number"
                  required
                />
              </Form.Group>
            </Col>
            {/* <Col>
              <Form.Group>
                <Dropdown className="ReceiversDropDown">
                  <Dropdown.Toggle variant="success" id="dropdown-basic">
                    {selectedType}
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    {SignatureType.map((item, index) => (
                      <Dropdown.Item
                        href="#"
                        key={index}
                        className="d-flex align-items-center"
                        onClick={() => handleToggleChange(item.type)}
                      >
                        <Form.Check
                          type="switch"
                          id={`custom-switch-${index}`}
                          checked={toggleState[item.type]}
                          onChange={() => handleToggleChange(item.type)}
                        />
                        <span className="ms-2">{item.type}</span>
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </Form.Group>
            </Col> */}
          </Container>
          {receivers.length > 1 && (
            <div className="d-flex justify-content-end ">
              <Button
                // onClick={() => removeReceiver(receiver.email)}
                onClick={() => removeReceiver(index)}
                className="btn-icons-bg mx-1"
                size="sm"
                style={{background:"transparent"}}
              >
                <img src={DeleteIcon} alt="delete" />
              </Button>
            </div>
          )}
        </React.Fragment>
      ))}
      <div className="d-flex justify-content-center">
        <Button
          onClick={addReceiver}
          size="md"
          className="btn-success d-flex align-items-center"
        >
          <span>
            <BsPlus />
          </span>
          Add Invitee
        </Button>
      </div>
    </div>
  );
}

export default ReceiverDetails;
