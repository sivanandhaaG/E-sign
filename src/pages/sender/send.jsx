import React from "react";
import { Button } from "react-bootstrap";
import PdfViewer from "../../components/pdf-viewer";
import { DocusealForm, DocusealBuilder } from "@docuseal/react";
import logo from "../../assets/logo/logo.svg";

function Send({
  handleSend,
  isSending,
  documentData,
  setDocumentData,
  receivers,
  setReceivers,
  setIsChecked,
  isChecked,
  setKycCheckedUsers,
  kycCheckedUsers,
  isReadOnly,
  data
}) {
  console.log("documentData h", documentData);
  return (
    <div>
      <PdfViewer
        documentData={documentData}
        setDocumentData={setDocumentData}
        receivers={receivers}
        setReceivers={setReceivers}
        setIsChecked={setIsChecked}
        isChecked={isChecked}
        setKycCheckedUsers={setKycCheckedUsers}
            kycCheckedUsers={kycCheckedUsers}
            isReadOnly={isReadOnly}
            data={data}
      />

      <div
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginTop: "20px",
        }}
      >
        {/* <Button
          className='btn-bg-indigo text-right'
          onClick={handleSend}
          disabled={isSending}
        >
          Send
        </Button> */}
      </div>
    </div>
  );
}

export default Send;
