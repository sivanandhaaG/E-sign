import React, { useState, useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import styles from "./CorporateSignUpForm.module.css";
import { useMutation, useQuery } from "react-query";
import {
  fetchAllCompanyTypes,
  fetchAllDesignations,
} from "../../app/api/masterApi";
import { useNavigate } from "react-router-dom";
import { registerCorporate } from "../../app/api/userApi";
import DragAndDropFileUpload from "../common/DragAndDropFileUpload/DragAndDropFileUpload";
import toast, { Toaster } from "react-hot-toast";
import "../../components/signinup/signup.css";

function CorporateSignUpForm() {
  const [formData, setFormData] = useState({
    companyName: "",
    companyTypeId: "",
    companyEmail: "",
    numberOfEmployees: "",
    companySeal: "",
    specificCompanyType: "",
    specificDesignationType: "",
    firstName: "",
    designationId: "",
    // idNumber: '',
    phoneNumber: "",
    email: "",
    // password: '',
  });
  const [showCustomCompanyInput, setShowCustomCompanyInput] = useState(false);
  const [showDesignationInput, setShowCustomDesignationInput] = useState(false);

  const { data: designationData } = useQuery(
    "designations",
    fetchAllDesignations,
    // {
    //   enabled: false,
    // }
  );
  
  const { data: companyTypeData } = useQuery(
    "companyTypes",
    fetchAllCompanyTypes,
    // {
    //   enabled: false,
    // }
  );
  useEffect(() => {
    fetchAllDesignations(); 
    fetchAllCompanyTypes();
    }, []);
    console.log(companyTypeData,"companyTypeData")
  const navigate = useNavigate();

  const { mutate, isLoading } = useMutation(registerCorporate, {
    onSuccess: (data) => {
      navigate("/forgetresetlink");
      toast.success("Please check your email for the login link");

      if (data?.data?.verificationToken) {
        // Success case: Show success message and navigate
        toast.success("Please check your email for the login link");
      }
    },
    onError: (error) => {
      // Handle API error response
      if (error.response?.data?.message) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Signup failed. Please try again.");
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // alert(JSON.stringify(formData, null, 2));
    mutate(formData);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "email") {
      localStorage.setItem("forgetemail", value);
    }
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const setCompanySeal = (fileUrl) => {
    setFormData((prev) => ({ ...prev, companySeal: fileUrl }));
  };

  return (
    <Form onSubmit={(e) => handleSubmit(e, formData)}>
      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label htmlFor="companyName" className="signup-label">
              Company Name
              <span className="signup-label-mandatory"> * </span>
            </Form.Label>
            <Form.Control
              className="signup-placeholder"
              required
              type="text"
              id="companyName"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              placeholder="Enter Company Name"
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group>
            <Form.Label htmlFor="companyTypeId" className="signup-label">
              Company Type
              <span className="signup-label-mandatory"> * </span>
            </Form.Label>
            <Form.Select
              id="companyTypeId"
              name="companyTypeId"
              value={formData.companyTypeId}
              onChange={(e) => {
                handleChange(e);
                const selectedCompany = companyTypeData?.data.find(
                  (company) => company.companyTypeId === e.target.value
                );
                if (selectedCompany?.name === "Others") {
                  setShowCustomCompanyInput(true);
                } else {
                  setShowCustomCompanyInput(false);
                }
              }}
              required
            >
              <option value="" disabled>
                Choose Option
              </option>
              {companyTypeData?.data &&
                companyTypeData.data.map((companyType) => (
                  <option
                    key={companyType.companyTypeId}
                    value={companyType.companyTypeId}
                  >
                    {companyType.name}
                  </option>
                ))}
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <Col>
        {showCustomCompanyInput && (
          <Form.Group>
            <Form.Label htmlFor="specificCompanyType" className="signup-label">
              Specify Company Type
            </Form.Label>
            <Form.Control
              className="signup-placeholder"
              id="specificCompanyType"
              name="specificCompanyType"
              type="text"
              value={formData.specificCompanyType || ""}
              onChange={handleChange}
              placeholder="Enter your company type"
              required
            />
          </Form.Group>
        )}
      </Col>
      <Row className="mb-3">
        <Col>
          <Form.Group>
            <Form.Label htmlFor="companyEmail" className="signup-label">
              Company Email
              <span className="signup-label-mandatory"> * </span>
            </Form.Label>
            <Form.Control
              className="signup-placeholder"
              required
              type="email"
              id="companyEmail"
              name="companyEmail"
              value={formData.companyEmail}
              onChange={handleChange}
              placeholder="Enter Company Email"
            />
          </Form.Group>
        </Col>

        <Col>
          <Form.Group>
            <Form.Label htmlFor="numberOfEmployees" className="signup-label">
              Number of Employees
              <span className="signup-label-mandatory"> * </span>
            </Form.Label>
            <Form.Select
              className="signup-placeholder"
              id="numberOfEmployees"
              name="numberOfEmployees"
              value={formData.numberOfEmployees}
              onChange={handleChange}
              placeholder="Choose Option"
            >
              <option value="" disabled>
                Choose Option
              </option>
              <option>10-100</option>
              <option>100-500</option>
              <option>500-1000</option>
            </Form.Select>
          </Form.Group>
        </Col>
      </Row>

      <DragAndDropFileUpload
        onFileUpload={setCompanySeal}
        onFileRemove={() => setCompanySeal("")}
      />

      <div className={styles.formSection}>
        <div className={styles.subHeaderLine}>
          <span className={styles.subHeaderText}>Admin Details</span>
        </div>

        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label htmlFor="firstName" className="signup-label">
                First Name
                <span className="signup-label-mandatory"> * </span>
              </Form.Label>
              <Form.Control
                className="signup-placeholder"
                required
                type="text"
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                placeholder="Enter Admin First Name"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label htmlFor="middleName" className="signup-label">
                Middle Name
              </Form.Label>
              <Form.Control
                className="signup-placeholder"
                type="text"
                id="middleName"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                placeholder="Enter Admin Middle Name"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label htmlFor="lastName" className="signup-label">
                Last Name
                <span className="signup-label-mandatory"> * </span>
              </Form.Label>
              <Form.Control
                className="signup-placeholder"
                required
                type="text"
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                placeholder="Enter Admin Last Name"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label htmlFor="designationId" className="signup-label">
                Designation
                <span className="signup-label-mandatory"> * </span>
              </Form.Label>
              <Form.Select
                id="designationId"
                name="designationId"
                value={formData.designationId}
                onChange={(e) => {
                  handleChange(e);
                  const selectedDesignation = designationData?.data.find(
                    (designation) =>
                      designation.designationId === e.target.value
                  );
                  console.log(selectedDesignation, "selectedDesignation");

                  if (selectedDesignation?.title === "Others") {
                    setShowCustomDesignationInput(true);
                  } else {
                    setShowCustomDesignationInput(false);
                  }
                }}
                required
              >
                <option value="" disabled>
                  Choose Option
                </option>
                {designationData?.data &&
                  designationData.data.map((designation) => (
                    <option
                      key={designation.designationId}
                      value={designation.designationId}
                    >
                      {designation.title}
                    </option>
                  ))}
              </Form.Select>
            </Form.Group>
          </Col>

          {/* <Col>
            <Form.Label htmlFor='idNumber' className='signup-label'>
              ID Number
              <span className='signup-label-mandatory'> * </span>
            </Form.Label>

            <Form.Control
              type='text'
              placeholder='Enter ID Number'
              id='idNumber'
              name='idNumber'
              value={formData.idNumber}
              onChange={handleChange}
              required
            />
          </Col> */}
        </Row>
        <Col>
          {showDesignationInput && (
            <Form.Group>
              <Form.Label
                htmlFor="specificDesignationType"
                className="signup-label"
              >
                Specify Designation Type
              </Form.Label>
              <Form.Control
                className="signup-placeholder"
                id="specificDesignationType"
                name="specificDesignationType"
                type="text"
                value={formData.specificDesignationType || ""}
                onChange={handleChange}
                placeholder="Enter your Designation type"
                required
              />
            </Form.Group>
          )}
        </Col>
        <Row>
          <Col>
            <Form.Label htmlFor="phoneNumber" className="signup-label">
              Mobile Number
              <span className="signup-label-mandatory"> * </span>
            </Form.Label>

            <Form.Control
              className="signup-placeholder"
              type="text"
              placeholder="Enter Mobile Number"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
          </Col>
          <Col>
            <Form.Label htmlFor="email" className="signup-label">
              Email
              <span className="signup-label-mandatory"> * </span>
            </Form.Label>

            <Form.Control
              className="signup-placeholder"
              type="email"
              placeholder="Enter Admin Email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </Col>
        </Row>
      </div>

      <Button
        type="submit"
        disabled={isLoading}
        size="md"
        className="mx-0 my-4 py-2 btn-bg-indigo"
      >
        Create Account
      </Button>
    </Form>
  );
}

export default CorporateSignUpForm;
