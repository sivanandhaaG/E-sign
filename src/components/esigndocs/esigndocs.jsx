import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  Table,
  Card,
  InputGroup,
  ButtonGroup,
} from "react-bootstrap";
import "./esigndocs.css";
import { Stepper } from "react-form-stepper";
import OffcanvasComponent from "../../components/offcanvas/offcanvas";
import { TemplateFileData, sampleSignedData } from "./templateData";
import Slider from "react-slick";

// Images

import UploadIcon from "../../assets/images/general/fileupload.png";
import LeftArrowImg from "../../assets/images/general/arrow-left.png";
import RightArrowImg from "../../assets/images/general/arrow-right.png";
import DownloadIcon2 from "../../assets/images/general/download.png";
import UploadIcon2 from "../../assets/images/general/upload.png";
import PlusIcon from "../../assets/images/general/plus.png";
import ChevronUpIcon from "../../assets/images/general/chevron-up.png";
import ChevronDownIcon from "../../assets/images/general/chevron-down.png";
import CopyIcon from "../../assets/images/general/copy.png";
import DeleteIcon from "../../assets/images/general/delete.png";
import StampDoc from "../../assets/images/general/Stamp.png";
import LegalityDoc from "../../assets/images/general/legalitydoc.png";
import AnotherDoc from "../../assets/images/general/newdoc.png";
import SettingsIcon from "../../assets/images/general/settings.png";
import NotCompletedIcon from "../../assets/images/general/notcompleted.png";
import CompletedIcon from "../../assets/images/general/indicatorcompleted.png";
import SignedIcon from "../../assets/images/general/pen-tool.png";
import TrashIcon from "../../assets/images/general/trash-2.png";
import NotifyIcon from "../../assets/images/general/bell.png";
import SentgreenIcon from "../../assets/images/general/sent.png";
import toast, { Toaster } from "react-hot-toast";

const ESignedComponent = () => {
  var settings = {
    dots: false,
    arrows: false,
    infinite: false,
    slidesToShow: 2,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  const [activeStep, setActiveStep] = useState(0);
  const [radioValue, setRadioValue] = useState("Use Stamp");
  const [selectedButton, setSelectedButton] = useState("Upload");
  const [tabData, setTabData] = useState(true);
  const [disableStamp, setDisableStamp] = useState(false);
  const [hideFolderDrop, setHideFolderDrop] = useState(true);
  const [togglefirstSection, setTogglefirstSection] = useState(true);
  const [hideFlow, setHideFlow] = useState(true);

  //Inputs

  const FunHideFlow = () => {
    setHideFlow(!hideFlow);
  };

  const uploadNewTemplate = () => {
    setTogglefirstSection(!togglefirstSection);
  };

  const CreateDetailsCommon = () => {
    return (
      <div>
        <Row className="mt-5">
          <Col md={4}>
            <p className="input-titles mb-md-0 mb-2"> Enter Document Name </p>
            <Form.Control
              size="sm"
              className="input-text mb-md-0 mb-2"
              type="text"
              placeholder="For example: Legal Notice"
            />
          </Col>
          <Col md={4}>
            <p className="input-titles mb-md-0 mb-2">
              {" "}
              Document Reference Number{" "}
            </p>
            <Form.Control
              size="sm"
              className="input-text mb-md-0 mb-2"
              type="text"
              placeholder="For example: ZZ0132246"
            />
          </Col>
          {hideFolderDrop && (
            <Col md={4}>
              <p className="input-titles mb-0"> Choose Folder </p>
              <Form.Select size="sm" className="input-text">
                <option> Onboarding Documents @Arslan </option>
                <option> Onboarding Documents @raghavendar </option>
                <option> Onboarding Documents @Amar </option>
              </Form.Select>
            </Col>
          )}
        </Row>
        <Row className="mt-5 mb-3">
          <Col>
            <Form>
              {["radio"].map((type) => (
                <Row key={`inline-${type}`} className="mb-3">
                  <Col md={4}>
                    <Form.Check
                      className="radio-border"
                      inline
                      label="Use Stamp"
                      name="group1"
                      value="Use Stamp"
                      checked={radioValue === "Use Stamp"}
                      onChange={onOptionChange}
                      type={type}
                      id={`inline-${type}-1`}
                    />
                    <p className="input-titles">
                      {" "}
                      Include pre-ordered stamp in the document.{" "}
                    </p>

                    <Form.Select
                      disabled={disableStamp}
                      size="sm"
                      className="input-text mt-3 mb-md-0 mb-3"
                    >
                      <option> Stamp of Uttrakhand - ₹100 </option>
                      <option> Stamp of Uttrakhand - ₹100 </option>
                      <option> Stamp of Uttrakhand - ₹100 </option>
                    </Form.Select>
                  </Col>
                  <Col md={4}>
                    <Form.Check
                      className="radio-border"
                      inline
                      label="Upload Stamp"
                      name="group1"
                      value="Upload Stamp"
                      checked={radioValue === "Upload Stamp"}
                      onChange={onOptionChange}
                      type={type}
                      id={`inline-${type}-2`}
                    />
                    <p className="input-titles">
                      {" "}
                      Upload your own scanned stamp{" "}
                    </p>
                  </Col>
                </Row>
              ))}
            </Form>
          </Col>
        </Row>
      </div>
    );
  };

  const CreateDetails = ({ activeStep }) => {
    const textStyle = activeStep === 1 ? { color: "rgb(114,105,215)" } : {};
    return (
      <div>
        <p style={textStyle} className="stepper-title mb-0">
          {" "}
          Create{" "}
        </p>{" "}
        <p style={textStyle} className="stepper-subtitle">
          {" "}
          Please provide your name and email{" "}
        </p>
      </div>
    );
  };

  const CreateDetailsUploadData = () => {
    return (
      <div>
        <Row>
          <Col md={12}>
            <div className="custom-parent input-text">
              <div className="custom-file-upload">
                <img src={UploadIcon} alt="upload" />
                <p className="page-subtitle-content mb-0 text-center file-text-color">
                  {"Click to Upload or drag and drop"}
                </p>
                <p className="page-subtitle-content mt-0 text-center">
                  Supported format .pdf
                </p>
                <Form.Control type="file" accept="application/pdf" />
              </div>
            </div>
          </Col>
        </Row>
        <CreateDetailsCommon />
      </div>
    );
  };

  const CreateDetailsTemplateData = () => {
    const [startDate, setStartDate] = useState("");
    const [endDate, setEndDate] = useState("");
    const [tenentName, setTenentName] = useState("");
    const [tenentPan, setTenentPan] = useState("");
    const [residentAddress, setResidentAddress] = useState("");
    const [landlordName, setLandLordName] = useState("");
    const [landlordFatherName, setLandLordFatherName] = useState("");
    const [propertyAddress, setPropertyAddress] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [companyAddress, setCompanyAddress] = useState("");
    const [monthlyRent, setMonthlyRent] = useState("");
    const [securityDeposit, setSecurityDeposit] = useState("");
    const [checked, setChecked] = useState("");

    const functionCall = (item) => {
      console.log(item);
      setChecked(item);
    };

    const functionCallMore = (item) => {
      console.log(item);
      alert(item.filename);
    };
    return (
      <div className="border">
        {togglefirstSection ? (
          <>
            <Row className="mb-0">
              <Col sm={12} md={4}>
                <div className="text-end mb-3">
                  <Form.Control
                    size="sm"
                    className="input-text"
                    type="text"
                    placeholder="Search Templates"
                  />
                </div>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <div className="border border-2" style={{ borderRadius: 5 }}>
                  <Row className="px-2 my-3">
                    <Col md={6} className="esign-page-heading">
                      Choose Templates
                    </Col>

                    <Col md={6} className="text-end">
                      <Button
                        size="md"
                        className=" mx-1 my-1 my-md-0 btn-outlne-indigo"
                      >
                        {" "}
                        <img src={DownloadIcon2} alt="" /> Export Template{" "}
                      </Button>
                      <Button
                        size="md"
                        className="mx-1 my-1  my-md-0 btn-bg-indigo"
                        onClick={uploadNewTemplate}
                      >
                        {" "}
                        <img src={UploadIcon2} alt="" /> Upload New Template{" "}
                      </Button>
                    </Col>
                  </Row>
                  <Table
                    className="custom-table"
                    bordered
                    hover
                    responsive="sm"
                    style={{ width: "100%" }}
                  >
                    <thead className="dash-table-header">
                      <tr>
                        <th>
                          {" "}
                          <Form.Check
                            inline
                            // name="group1"
                            // value="Use Stamp"
                            // checked={radioValue === "Use Stamp"}
                            // onChange={onOptionChange}
                            type="checkbox"
                          />
                        </th>
                        <th colSpan={2}> File Name </th>
                        <th>File Size</th>
                        <th>Template ID</th>
                        <th colSpan={2}>Last Updated </th>
                      </tr>
                    </thead>
                    <tbody style={{ height: 370 }}>
                      {TemplateFileData.map((item) => (
                        <tr key={item.id} className="dash-table-body">
                          <td style={{ width: "0.5%" }}>
                            {" "}
                            <Form.Check
                              inline
                              name="group1"
                              value={item}
                              checked={checked === item}
                              onChange={() => {
                                functionCall(item);
                              }}
                              type="checkbox"
                            />
                          </td>
                          <td style={{ width: "1%" }}>
                            <img className="mx-3" src={item.fileicon} alt="" />
                          </td>
                          <td style={{ width: "50%" }}>{item.filename}</td>
                          <td
                            style={{ width: "15%" }}
                            className="page-subtitle-content"
                          >
                            {item.filesize}
                          </td>
                          <td
                            style={{ width: "15%" }}
                            className="page-subtitle-content"
                          >
                            {item.templateID}
                          </td>
                          <td
                            style={{ width: "15%" }}
                            className="page-subtitle-content"
                          >
                            {item.updatedDate}
                          </td>
                          <td
                            style={{ cursor: "pointer" }}
                            onClick={() => {
                              functionCallMore(item);
                            }}
                          >
                            <img src={item.moreicon} alt="" />
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </div>
              </Col>
            </Row>
            <CreateDetailsCommon />
          </>
        ) : (
          <>
            <Row className="d-flex justify-content-center align-items-center">
              <Col md={6} style={{ maxHeight: 600, overflowY: "scroll" }}>
                <p className="text-center text-underline">
                  {" "}
                  <b> RENT AGREEMENT </b>{" "}
                </p>
                <div>
                  <p className="text-justify input-titles">
                    This rent agreement is made on this
                    <span className="text-underline"> {startDate} </span>
                    <span className="text-underline"> {endDate} </span>
                    <span className="text-underline"> {tenentName} </span>
                    <span className="text-underline"> {tenentPan} </span>
                    <span className="text-underline"> {residentAddress} </span>
                    <span className="text-underline"> {landlordName} </span>
                    <span className="text-underline">
                      {" "}
                      {landlordFatherName}{" "}
                    </span>
                    <span className="text-underline"> {propertyAddress} </span>
                    <span className="text-underline"> {companyName} </span>
                    <span className="text-underline"> {companyAddress} </span>
                    <span className="text-underline"> ₹{monthlyRent} </span>
                    <span className="text-underline"> ₹{securityDeposit} </span>
                  </p>
                </div>
              </Col>
              <Col md={6}>
                <Card className="p-3">
                  <Row className="">
                    <Col md={8} className="mb-2">
                      <p className="esign-page-heading mb-1">
                        {" "}
                        Create new e-Sign Document
                      </p>
                      <p className="esign-page-subheading">
                        {" "}
                        Create or choose from existing templates{" "}
                      </p>
                    </Col>
                    <Col md={4} className="text-end">
                      <Button
                        size="md"
                        className="btn-bg-indigo"
                        onClick={uploadNewTemplate}
                      >
                        {" "}
                        <img src={LeftArrowImg} alt="" /> Use Available{" "}
                      </Button>
                    </Col>

                    <Col md={4} className="mb-2">
                      <p className="input-titles mt-1"> Date of Agreement </p>
                    </Col>
                    <Col md={8} className="mb-2">
                      <InputGroup className="w-100" size="md">
                        <Form.Control
                          type="date"
                          className="input-text"
                          placeholder="Start Date"
                          value={startDate}
                          onChange={(obj) => {
                            setStartDate(obj.target.value);
                          }}
                        />
                        <Form.Control
                          type="date"
                          className="input-text"
                          placeholder="End Date"
                          value={endDate}
                          onChange={(obj) => {
                            setEndDate(obj.target.value);
                          }}
                        />
                      </InputGroup>
                    </Col>

                    <Col md={4} className="mb-2">
                      <p className="input-titles mt-1"> Tenent Name </p>
                    </Col>
                    <Col md={8} className="mb-2">
                      <Form.Control
                        type="text"
                        className="input-text"
                        placeholder="Full Name of tenant"
                        value={tenentName}
                        onChange={(obj) => {
                          setTenentName(obj.target.value);
                        }}
                      />
                    </Col>

                    <Col md={4} className="mb-2">
                      <p className="input-titles mt-1"> Tenent PAN Number </p>
                    </Col>
                    <Col md={8} className="mb-2">
                      <Form.Control
                        type="text"
                        className="input-text"
                        placeholder="PAN Number of tenant"
                        value={tenentPan}
                        onChange={(obj) => {
                          setTenentPan(obj.target.value);
                        }}
                      />
                    </Col>

                    <Col md={4} className="mb-2">
                      <p className="input-titles mt-1"> Resident Address </p>
                    </Col>
                    <Col md={8} className="mb-2">
                      <Form.Control
                        as="textarea"
                        className="input-text"
                        placeholder="Full address of the tenant"
                        value={residentAddress}
                        onChange={(obj) => {
                          setResidentAddress(obj.target.value);
                        }}
                      />
                    </Col>

                    <Col md={4} className="mb-2">
                      <p className="input-titles mt-1"> Landlord Name </p>
                    </Col>
                    <Col md={8} className="mb-2">
                      <Form.Control
                        type="text"
                        className="input-text"
                        placeholder="Full name of landlord"
                        value={landlordName}
                        onChange={(obj) => {
                          setLandLordName(obj.target.value);
                        }}
                      />
                    </Col>

                    <Col md={4} className="mb-2">
                      <p className="input-titles mt-1">
                        {" "}
                        Landlord Father Name{" "}
                      </p>
                    </Col>
                    <Col md={8} className="mb-2">
                      <Form.Control
                        type="text"
                        className="input-text"
                        placeholder="Father name of landlord"
                        value={landlordFatherName}
                        onChange={(obj) => {
                          setLandLordFatherName(obj.target.value);
                        }}
                      />
                    </Col>

                    <Col md={4} className="mb-2">
                      <p className="input-titles mt-1"> Property Address </p>
                    </Col>
                    <Col md={8} className="mb-2">
                      <Form.Control
                        as="textarea"
                        className="input-text"
                        placeholder="Full address of the property"
                        value={propertyAddress}
                        onChange={(obj) => {
                          setPropertyAddress(obj.target.value);
                        }}
                      />
                    </Col>

                    <Col md={4} className="mb-2">
                      <p className="input-titles mt-1"> Company Name </p>
                    </Col>
                    <Col md={8} className="mb-2">
                      <Form.Control
                        type="text"
                        className="input-text"
                        placeholder="Name of the company"
                        value={companyName}
                        onChange={(obj) => {
                          setCompanyName(obj.target.value);
                        }}
                      />
                    </Col>

                    <Col md={4} className="mb-2">
                      <p className="input-titles mt-1"> Company Address </p>
                    </Col>
                    <Col md={8} className="mb-2">
                      <Form.Control
                        as="textarea"
                        className="input-text"
                        placeholder="Full address of the company"
                        value={companyAddress}
                        onChange={(obj) => {
                          setCompanyAddress(obj.target.value);
                        }}
                      />
                    </Col>

                    <Col md={4} className="mb-2">
                      <p className="input-titles mt-1"> Monthly Rental (₹) </p>
                    </Col>
                    <Col md={8} className="mb-2">
                      <Form.Control
                        type="number"
                        className="input-text"
                        placeholder="Amount in Rupees"
                        value={monthlyRent}
                        onChange={(obj) => {
                          setMonthlyRent(obj.target.value);
                        }}
                      />
                    </Col>

                    <Col md={4} className="mb-2">
                      <p className="input-titles mt-1">
                        {" "}
                        Security Deposit (₹){" "}
                      </p>
                    </Col>
                    <Col md={8} className="mb-2">
                      <Form.Control
                        type="number"
                        className="input-text"
                        placeholder="Amount in Rupees"
                        value={securityDeposit}
                        onChange={(obj) => {
                          setSecurityDeposit(obj.target.value);
                        }}
                      />
                    </Col>
                  </Row>
                </Card>
              </Col>
            </Row>
          </>
        )}
      </div>
    );
  };

  const ReceiverDetails = ({ activeStep }) => {
    const textStyle = activeStep === 2 ? { color: "#4338CA" } : {};
    return (
      <div>
        <p style={textStyle} className="stepper-title mb-0">
          {" "}
          Receiver Details{" "}
        </p>{" "}
        <p style={textStyle} className="stepper-subtitle">
          {" "}
          Enter details of receiver{" "}
        </p>
      </div>
    );
  };

  const ReceiverDetailsUploadData = () => {
    return (
      <div>
        <p> Receiver Details </p> <p> Enter details of receiver upload</p>
      </div>
    );
  };

  const ReceiverDetailsTemplateData = () => {
    const [showOffCanvas, setShowOffCanvas] = useState(false);

    const handleClose = () => setShowOffCanvas(false);
    const handleShow = () => setShowOffCanvas(true);

    const [invites, setInvites] = useState([
      { name: "", email: "", mobile: "", signingMethod: "e-Sign Aadhaar" },
      { name: "", email: "", mobile: "", signingMethod: "e-Sign Aadhaar" },
    ]);

    const handleAddInvite = () => {
      setInvites([
        ...invites,
        { name: "", email: "", mobile: "", signingMethod: "e-Sign Aadhaar" },
      ]);
    };
    console.log(invites);
    const handleDeleteInvite = (index) => {
      if (index >= 2) {
        const updatedInvites = [...invites];
        updatedInvites.splice(index, 1);
        setInvites(updatedInvites);
      } else {
        toast.error(
          "User dont have permission to delete the first two input fields"
        );
      }
    };

    const handleInputChange = (index, e) => {
      const { name, value } = e.target;
      const updatedInvites = [...invites];
      updatedInvites[index][name] = value;
      setInvites(updatedInvites);
    };

    const handleInputCopy = (index) => {
      const inviteToCopy = { ...invites[index] };
      setInvites([...invites, inviteToCopy]);
    };

    const handlePositionUp = (index) => {
      if (index > 0) {
        const updatedInvites = [...invites];
        const temp = updatedInvites[index];
        updatedInvites[index] = updatedInvites[index - 1];
        updatedInvites[index - 1] = temp;
        setInvites(updatedInvites);
      } else {
        toast.error("Can't Move this Up");
      }
    };

    const handlePositionDown = (index) => {
      if (index < invites.length - 1) {
        const updatedInvites = [...invites];
        const temp = updatedInvites[index];
        updatedInvites[index] = updatedInvites[index + 1];
        updatedInvites[index + 1] = temp;
        setInvites(updatedInvites);
      } else {
        toast.error("Can't Move this Down");
      }
    };

    return (
      <div>
        <Card className="p-3">
          <Row>
            <Col md={4}>
              <Form.Check
                inline
                label="Request signing order"
                // name="group1"
                // value="Use Stamp"
                // checked={radioValue === "Use Stamp"}
                // onChange={onOptionChange}
                type="checkbox"
              />
              <p className="input-titles mx-4"> Request user to sign this </p>
            </Col>
            <Col md={4}>
              <Form.Check
                inline
                label="My Signature"
                // name="group1"
                // value="Use Stamp"
                // checked={radioValue === "Use Stamp"}
                // onChange={onOptionChange}
                type="checkbox"
              />
              <p className="input-titles mx-4"> Include my signature in this</p>
            </Col>
            <Col md={12}>
              <hr />
            </Col>
          </Row>
          {invites.map((invite, index) => (
            <Row className="mt-3">
              <Col md={4} className="mb-3">
                <p className="input-titles mb-1"> Name of the receiver </p>
                <Form.Control
                  name="name"
                  value={invite.name}
                  onChange={(e) => handleInputChange(index, e)}
                  size="sm"
                  className="input-text"
                  type="text"
                  placeholder="Enter Full Name of receiver"
                />
              </Col>
              <Col md={4} className="mb-3">
                <p className="input-titles mb-1"> Email </p>
                <Form.Control
                  name="email"
                  value={invite.email}
                  onChange={(e) => handleInputChange(index, e)}
                  size="sm"
                  className="input-text"
                  type="text"
                  placeholder="Enter Email ID"
                />
              </Col>
              <Col md={4} className="mb-3">
                <p className="input-titles mb-1"> Mobile Number </p>
                <Form.Control
                  name="mobile"
                  value={invite.mobile}
                  onChange={(e) => handleInputChange(index, e)}
                  size="sm"
                  className="input-text"
                  type="text"
                  placeholder="Enter +91 Mobile Number"
                />
              </Col>
              <Col md={3} className="mb-3">
                <Form.Select
                  name="signingMethod"
                  value={invite.signingMethod}
                  onChange={(e) => handleInputChange(index, e)}
                  size="sm"
                  className="input-text"
                >
                  <option> e-Sign Aadhaar </option>
                  <option> Virtual Sign </option>
                  <option> Document Sign </option>
                  <option> Automated Sign </option>
                </Form.Select>
              </Col>
              <Col md={9} className="text-end mb-3">
                <Button
                  onClick={() => handleInputCopy(index)}
                  className="btn-icons-bg mx-1"
                  size="sm"
                >
                  {" "}
                  <img src={CopyIcon} alt="copy" />{" "}
                </Button>
                <Button
                  onClick={() => handlePositionUp(index)}
                  className="btn-icons-bg mx-1"
                  size="sm"
                >
                  {" "}
                  <img src={ChevronUpIcon} alt="moveup" />{" "}
                </Button>
                <Button
                  onClick={() => handlePositionDown(index)}
                  className="btn-icons-bg mx-1"
                  size="sm"
                >
                  {" "}
                  <img src={ChevronDownIcon} alt="movedown" />{" "}
                </Button>
                <Button
                  onClick={() => handleDeleteInvite(index)}
                  className="btn-icons-bg mx-1"
                  size="sm"
                >
                  {" "}
                  <img src={DeleteIcon} alt="delete" />{" "}
                </Button>
                <span className="more-filters" onClick={handleShow}>
                  {" "}
                  More Options{" "}
                </span>
              </Col>
            </Row>
          ))}
          <Row className="d-flex justify-content-center align-items-center">
            <Col md={4} className=""></Col>
            <Col md={4} className="text-center">
              <Button
                onClick={handleAddInvite}
                size="md"
                className="btn-emerald-bg"
              >
                {" "}
                <img src={PlusIcon} alt="" /> Add Invite{" "}
              </Button>
            </Col>
            <Col md={4} className=""></Col>
          </Row>

          <Row className="d-flex justify-content-center align-items-center">
            <Col md={12}>
              <hr />
            </Col>
            <Row className="mt-3">
              <Col md={4} className="mb-3">
                <p className="input-titles mb-1"> Name of the receiver </p>
                <Form.Control
                  disabled
                  name="name"
                  size="sm"
                  className="input-text"
                  type="text"
                  placeholder="Enter Full Name of receiver"
                />
              </Col>
              <Col md={4} className="mb-3">
                <p className="input-titles mb-1"> Email </p>
                <Form.Control
                  disabled
                  name="email"
                  size="sm"
                  className="input-text"
                  type="text"
                  placeholder="Enter Email ID"
                />
              </Col>
              <Col md={4} className="mb-3">
                <p className="input-titles mb-1"> Mobile Number </p>
                <Form.Control
                  disabled
                  name="mobile"
                  size="sm"
                  className="input-text"
                  type="text"
                  placeholder="Enter +91 Mobile Number"
                />
              </Col>
              <Col md={3} className="mb-3">
                <Form.Select
                  name="signingMethod"
                  size="sm"
                  className="input-text"
                >
                  <option> e-Sign Aadhaar </option>
                  <option> Virtual Sign </option>
                  <option> Document Sign </option>
                  <option> Automated Sign </option>
                </Form.Select>
              </Col>
              <Col md={9} className="text-end mb-3">
                <Button disabled className="btn-icons-bg mx-1" size="sm">
                  {" "}
                  <img src={CopyIcon} alt="copy" />{" "}
                </Button>
                <Button disabled className="btn-icons-bg mx-1" size="sm">
                  {" "}
                  <img src={ChevronUpIcon} alt="moveup" />{" "}
                </Button>
                <Button disabled className="btn-icons-bg mx-1" size="sm">
                  {" "}
                  <img src={ChevronDownIcon} alt="movedown" />{" "}
                </Button>
                <Button disabled className="btn-icons-bg mx-1" size="sm">
                  {" "}
                  <img src={DeleteIcon} alt="delete" />{" "}
                </Button>
              </Col>
            </Row>
          </Row>
          <OffcanvasComponent show={showOffCanvas} onHide={handleClose} />
        </Card>
      </div>
    );
  };

  const SendDetails = ({ activeStep }) => {
    const textStyle = activeStep === 3 ? { color: "#4338CA" } : {};
    return (
      <div>
        <p style={textStyle} className="stepper-title mb-0">
          {" "}
          Send{" "}
        </p>{" "}
        <p style={textStyle} className="stepper-subtitle">
          {" "}
          One final Step{" "}
        </p>
      </div>
    );
  };

  const SendUploadData = () => {
    return (
      <div>
        <p> Send </p> <p> One final Step Upload</p>
      </div>
    );
  };

  const SendTemplateData = () => {
    return (
      <Row>
        <Col xs={12} className="text-center">
          <img className="legaldoc-css w-75" src={StampDoc} alt="" />
        </Col>
      </Row>
    );
  };

  const steps = [
    { label: <CreateDetails activeStep={activeStep + 1} /> },
    { label: <ReceiverDetails activeStep={activeStep + 1} /> },
    { label: <SendDetails activeStep={activeStep + 1} /> },
  ];

  const isPreviousDisabled = activeStep === 0;
  const isNextDisabled = activeStep === steps.length - 1;

  function getSectionComponentUpload() {
    switch (activeStep) {
      case 0:
        return <CreateDetailsUploadData />;
      case 1:
        // return <ReceiverDetailsUploadData />;
        return <ReceiverDetailsTemplateData />;
      case 2:
        // return <SendUploadData />;
        return <SendTemplateData />;
      default:
        return null;
    }
  }

  function getSectionComponentTemplate() {
    switch (activeStep) {
      case 0:
        return <CreateDetailsTemplateData />;
      case 1:
        return <ReceiverDetailsTemplateData />;
      case 2:
        return <SendTemplateData />;
      default:
        return null;
    }
  }

  const onOptionChange = (e) => {
    setRadioValue(e.target.value);
    if (e.target.value === "Upload Stamp") {
      setDisableStamp(true);
    } else {
      setDisableStamp(false);
    }
  };

  const UploadData = () => {
    return (
      <div>
        <Stepper
          steps={steps}
          styleConfig={{
            activeBgColor: "transparent",
            activeTextColor: "transparent",
            inactiveBgColor: "#F8FAFC",
            inactiveTextColor: "#4F46E5",
            completedBgColor: "transparent",
            completedTextColor: "transparent",
            size: "1.5em",
          }}
          activeStep={activeStep}
        />
        {getSectionComponentUpload()}
        <Row className="mt-5">
          <Col md={12}>
            <hr />
          </Col>
          <Col xs={6} className="text-start">
            <Button
              className="btn-slate"
              onClick={() => setActiveStep(activeStep - 1)}
              disabled={isPreviousDisabled}
            >
              <img src={LeftArrowImg} alt="" /> Previous
            </Button>
          </Col>
          <Col xs={6} className="text-end">
            {!isNextDisabled && (
              <Button
                className="btn-bg-indigo"
                onClick={() => setActiveStep(activeStep + 1)}
                disabled={isNextDisabled}
              >
                Next <img src={RightArrowImg} alt="" />
              </Button>
            )}
            {isNextDisabled && (
              <Button className="btn-bg-indigo" onClick={() => FunHideFlow()}>
                Submit <img src={RightArrowImg} alt="" />
              </Button>
            )}
          </Col>
        </Row>
      </div>
    );
  };

  const TemplateData = () => {
    return (
      <div>
        <Stepper
          steps={steps}
          styleConfig={{
            activeBgColor: "transparent",
            activeTextColor: "transparent",
            inactiveBgColor: "#F8FAFC",
            inactiveTextColor: "#4F46E5",
            completedBgColor: "rgb(114,105,215)",
            completedTextColor: "rgb(114,105,215)",
            connectorStateColors: true, 
            size: "1.5em",
          }}
          activeStep={activeStep}
        />
        {getSectionComponentTemplate()}
        <Row className="mt-5">
          <Col md={12}>
            <hr />
          </Col>
          <Col xs={6} className="text-start">
            <Button
              className="btn-slate"
              onClick={() => setActiveStep(activeStep - 1)}
              disabled={isPreviousDisabled}
            >
              <img src={LeftArrowImg} alt="" /> Previous
            </Button>
          </Col>
          <Col xs={6} className="text-end">
            {!isNextDisabled && (
              <Button
                className="btn-bg-indigo"
                onClick={() => setActiveStep(activeStep + 1)}
                disabled={isNextDisabled}
              >
                Next <img src={RightArrowImg} alt="" />
              </Button>
            )}
            {isNextDisabled && (
              <Button className="btn-bg-indigo" onClick={() => FunHideFlow()}>
                Submit <img src={RightArrowImg} alt="" />
              </Button>
            )}
          </Col>
        </Row>
      </div>
    );
  };

  const contentMap = {
    Upload: <UploadData />,
    Templates: <TemplateData />,
  };

  const handleButtonClick = (buttonName) => {
    setSelectedButton(buttonName);
    setActiveStep(0);
    if (buttonName === "Upload") {
      setTabData(!tabData);
      setHideFolderDrop(true);
    } else {
      setHideFolderDrop(false);
    }
  };

  return (
    <Container fluid className="mt-5">
      <Container className="py-5 px-0">
        {hideFlow && (
          <>
            <Row className="px-0">
              <Col sm={12} md={8}>
                <p className="esign-page-heading mb-1">
                  {" "}
                  Create new e-Sign Document
                </p>
                <p className="esign-page-subheading">
                  {" "}
                  Create or choose from existing templates{" "}
                </p>
              </Col>
              <Col sm={12} md={4} className="text-end">
                <Button
                  size="md"
                  className={
                    selectedButton === "Upload" ? "selected" : "mx-1 esign-btn"
                  }
                  onClick={() => handleButtonClick("Upload")}
                >
                  Upload
                </Button>
                <Button
                  size="md"
                  className={
                    selectedButton === "Templates"
                      ? "selected"
                      : "mx-1 esign-btn"
                  }
                  onClick={() => handleButtonClick("Templates")}
                >
                  Templates
                </Button>
              </Col>
            </Row>
            <hr className="mt-0" />
            <Row>{contentMap[selectedButton]}</Row>
          </>
        )}
        {!hideFlow && (
          <>
            <Row className="px-0">
              <Col sm={12} md={6} className="mb-3">
                <Card className="px-2 py-2">
                  <img className="w-100" src={LegalityDoc} alt="" />
                </Card>
              </Col>
              <Col sm={12} md={6}>
                <Card className="px-3 py-5">
                  <Table>
                    <tbody>
                      <tr style={{ height: "50px" }}>
                        <td className="input-titles "> Status </td>
                        <td className="document-final-table ">
                          {" "}
                          Sent <img src={SentgreenIcon} alt="" />{" "}
                        </td>
                      </tr>
                      <tr style={{ height: "50px" }}>
                        <td className="input-titles"> Document ID </td>
                        <td className="document-final-table"> UK000AAA1234 </td>
                      </tr>
                      <tr style={{ height: "50px" }}>
                        <td className="input-titles"> Document Name </td>
                        <td className="document-final-table">
                          {" "}
                          Rental Agreement{" "}
                        </td>
                      </tr>
                      <tr style={{ height: "50px" }}>
                        <td className="input-titles"> Last Updated </td>
                        <td className="document-final-table">
                          {" "}
                          Sep 14, 2023, 11:15:03 AM{" "}
                        </td>
                      </tr>
                    </tbody>
                  </Table>
                </Card>
                <div className="mt-5">
                  <Slider {...settings}>
                    {sampleSignedData.map((item) => {
                      const { id, name, email, active, status, image } = item;
                      let iconImg = "";
                      if (status === "Signed") {
                        iconImg = CompletedIcon;
                      } else {
                        iconImg = NotCompletedIcon;
                      }
                      return (
                        <div
                          className="px-1 mb-5 mx-2"
                          style={{ cursor: "move" }}
                        >
                          <Row className="mb-0 ">
                            <Col xs={5} className="px-0">
                              <hr className="line-hr-css" />
                            </Col>
                            <Col xs={2} className="text-center px-1">
                              <img className="w-100" src={iconImg} alt="" />
                            </Col>
                            <Col xs={5} className="px-0">
                              <hr className="line-hr-css" />
                            </Col>
                            <Col xs={12} className="text-center">
                              <p className="document-final-table text-center mt-1">
                                {" "}
                                Date{" "}
                              </p>
                            </Col>
                          </Row>
                          <Card
                            className="px-2 py-2 action-style"
                            style={{ border: "none" }}
                          >
                            <Row>
                              <Col key={id} md={10}>
                                <img src={image} alt="" />
                              </Col>
                              <Col md={2} className="text-end">
                                <img src={SettingsIcon} alt="" />
                              </Col>
                              <Col xs={12} className="input-titles mt-2">
                                <span className="final-list-name">
                                  {" "}
                                  {name}{" "}
                                </span>{" "}
                                <span
                                  className={
                                    active === "• Online"
                                      ? "signed-css"
                                      : active === "• Away"
                                      ? "expired-css"
                                      : ""
                                  }
                                >
                                  {" "}
                                  {active}{" "}
                                </span>{" "}
                                <br />
                                <span> {email} </span>
                              </Col>
                              <Col xs={12} className="input-titles">
                                <hr />
                              </Col>
                              <Col xs={6} className="input-titles text-start">
                                Status :
                              </Col>
                              <Col xs={6} className="input-titles text-end">
                                <span
                                  className={
                                    status === "Signed"
                                      ? "signed-css"
                                      : status === "Not yet signed"
                                      ? "expired-css"
                                      : ""
                                  }
                                >
                                  {" "}
                                  {status}{" "}
                                </span>
                              </Col>
                              <Col xs={12} className="input-titles">
                                <hr />
                              </Col>
                              <Col xs={12}>
                                {status === "Signed" && (
                                  <ButtonGroup
                                    size="sm"
                                    className="mx-1 btn-bg-indigo"
                                  >
                                    <Button className="btn-bg-indigo">
                                      {" "}
                                      <img src={SignedIcon} alt="" />{" "}
                                    </Button>
                                    <Button className="btn-bg-indigo">
                                      {" "}
                                      Sign{" "}
                                    </Button>
                                  </ButtonGroup>
                                )}
                                {status === "Signed" && (
                                  <ButtonGroup
                                    size="sm"
                                    className="mx-1 btn-trash"
                                  >
                                    <Button className="btn-trash">
                                      {" "}
                                      <img src={TrashIcon} alt="" />{" "}
                                    </Button>
                                    <Button className="btn-trash">
                                      {" "}
                                      Reject{" "}
                                    </Button>
                                  </ButtonGroup>
                                )}
                                {status === "Not yet signed" && (
                                  <ButtonGroup
                                    size="sm"
                                    className="mx-1 btn-slate"
                                  >
                                    <Button className="btn-slate">
                                      {" "}
                                      <img src={TrashIcon} alt="" />{" "}
                                    </Button>
                                    <Button className="btn-slate">
                                      {" "}
                                      View Profile{" "}
                                    </Button>
                                  </ButtonGroup>
                                )}
                                <Button size="sm" className="mx-1 btn-slate">
                                  {" "}
                                  <img src={NotifyIcon} alt="" />{" "}
                                </Button>
                              </Col>
                            </Row>
                          </Card>
                        </div>
                      );
                    })}
                  </Slider>
                </div>
              </Col>
              <Col sm={12} md={12}>
                <hr />
              </Col>
              <Col sm={12} md={12} className="text-center">
                <a href="/sender">
                  {" "}
                  <Button className="btn-bg-indigo" size="lg">
                    Create another Document{" "}
                    <img
                      style={{ width: 12, marginLeft: 5 }}
                      src={AnotherDoc}
                      alt=""
                    />
                  </Button>
                </a>
              </Col>
            </Row>
          </>
        )}
      </Container>
    </Container>
  );
};

export default ESignedComponent;
