import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import DragAndDropFileUpload from "../../components/common/DragAndDropFileUpload/DragAndDropFileUpload";
import { Form } from "react-bootstrap";
import { Select } from "@chakra-ui/react";

function CreateDocument({ documentData, setDocumentData, isReadOnly, data }) {
  console.log(documentData, "documentData");
  console.log(data?.documentdetails?.documentName, "Getdata");
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDocumentData((prevData) => ({ ...prevData, [name]: value }));
  };

  const setDocumentFileUrl = (fileUrl) => {
    setDocumentData((prevData) => ({ ...prevData, fileUrl: fileUrl }));
  };

  return (
    <>
      <div>
        <DragAndDropFileUpload
          onFileUpload={(fileUrl) => setDocumentFileUrl(fileUrl)}
          setDocumentData={setDocumentData}
          onFileRemove={() => setDocumentFileUrl("")}
          isImage={false}
          allowedFileTypes={["application/pdf"]}
          isReadOnly={isReadOnly}
          docData={data}
        />

        <Row className="mb-3">
          <Col>
            <Form.Group>
              <Form.Label htmlFor="documentName" className="signup-label">
                Document Name
                <span className="signup-label-mandatory">*</span>
              </Form.Label>
              <Form.Control
                type="text"
                id="documentName"
                name="documentName"
                value={
                  isReadOnly
                    ? data?.documentdetails?.documentName
                    : documentData?.documentName
                }
                // value={documentData.documentName}
                onChange={handleChange}
                placeholder="Enter Document Name"
                required
                disabled={isReadOnly}
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group>
              <Form.Label
                htmlFor="documentReferenceNumber"
                className="signup-label"
              >
                Document Reference Number
                <span className="signup-label-mandatory">*</span>
              </Form.Label>
              <Form.Control
                required
                type="text"
                id="documentReferenceNumber"
                name="documentReferenceNumber"
                documentReferenceNumber
                value={
                  isReadOnly
                    ? data?.eSignRequests?.[0]?.documentReferenceNumber
                    : documentData?.documentReferenceNumber
                }
                // value={documentData.documentReferenceNumber}
                onChange={handleChange}
                placeholder="Enter Document Number"
                disabled={isReadOnly}
              />
            </Form.Group>
          </Col>
          {/* <Col>
            <Form.Group>
              <Form.Label
                htmlFor="documentReferenceNumber"
                className="signup-label" 
              >
                Choose Folder
                <span className="signup-label-mandatory">*</span>
              </Form.Label>
              <Form.Select aria-label="Default select example">
                <option value="1">One</option>
              </Form.Select>
            </Form.Group>
          </Col> */}
        </Row>
      </div>
    </>
  );
}

export default CreateDocument;
