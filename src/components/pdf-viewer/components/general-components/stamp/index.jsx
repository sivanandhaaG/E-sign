import React, { useRef } from "react";
import "./index.css";
import { Button, Form, Modal, Row, Tab, Tabs } from "react-bootstrap";
import Icons from "../../icons";

const Stamp = ({ formData, setFormData, markerData }) => {
  const [signatureTabOpen, setSignatureTabOpen] = React.useState(false);

  console.log("formData", formData, markerData);

  const handleOpenSignatureTab = () => {
    setSignatureTabOpen(true);
  };
  const handleCloseSignatureTab = () => {
    setSignatureTabOpen(false);
  };

  const onSignatureImageChoose = (e) => {
    const files = e.target.files;
    if (!files.length) return; // No file selected

    const file = files[0];
    // const acceptedTypes = ["image/png", "image/jpeg", "image/jpg"]; // Allowed formats

    // if (!acceptedTypes.includes(file.type)) {
    //   alert("Only PNG, JPG, and JPEG images are allowed!");
    //   e.target.value = ""; // Reset file input
    //   return;
    // }

    const reader = new FileReader();

    reader.addEventListener(
      "load",
      () => {
        console.log("reader", reader.result);
        formData[markerData.markerId] = {
          markerId: markerData.markerId,
          markerType: "image",
          data: reader.result,
        };
        setFormData({ ...formData }); // Ensure reactivity
        handleCloseSignatureTab();
      },
      false
    );

    reader.readAsDataURL(file); // Read the valid file
  };

  const data = formData[markerData?.markerId]?.data;
  return (
    <>
      <div className="signature" onClick={handleOpenSignatureTab}>
        {data ? (
          <img
            src={data}
            style={{
              width: "99px",
              height: "48px",
            }}
            alt="signature"
          />
        ) : (
          <div
            style={{
              display: "flex",
              gap: "10px",
              alignItems: "center",
            }}
          >
            Click to add stamp
          </div>
        )}
      </div>
      <Modal show={signatureTabOpen} onHide={handleCloseSignatureTab}>
        <Modal.Header closeButton>
          <Modal.Title>Add Stamp</Modal.Title>
        </Modal.Header>
        <Modal.Body className="signature__modal">
          <div>
            <Form.Group controlId="formFileLg" className="mb-3">
              <Form.Label>Choose your Stamp</Form.Label>
              <Form.Control
                type="file"
                allow="image/*"
                accept="image/*"
                size="lg"
                onChange={onSignatureImageChoose}
              />
            </Form.Group>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSignatureTab}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseSignatureTab}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Stamp;
// import { useState } from "react";
// import "./index.css";
// import { Button, Form, Modal } from "react-bootstrap";
// import CompanyStamp from "./CompanyStamp";

// const Stamp = ({ formData, setFormData, markerData }) => {
//   const [signatureTabOpen, setSignatureTabOpen] = useState(false);
//   const [createStampTabOpen, setCreateStampTabOpen] = useState(false);
//   const [companyName, setCompanyName] = useState("");
//   const [registrationNumber, setRegistrationNumber] = useState("");
//   const [tempData, setTempData] = useState(null);

//   const handleOpenSignatureTab = () => {
//     setSignatureTabOpen(true);
//   };

//   const handleCloseSignatureTab = () => {
//     setSignatureTabOpen(false);
//     setTempData(null);
//   };

//   const handleOpenCreateStampTab = () => {
//     setCreateStampTabOpen(true);
//   };

//   const handleCloseCreateStampTab = () => {
//     setCreateStampTabOpen(false);
//   };

//   const onSignatureImageChoose = (e) => {
//     const file = e.target.files[0];
//     const reader = new FileReader();

//     reader.addEventListener(
//       "load",
//       () => {
//         setTempData({
//           markerType: "image",
//           data: reader.result,
//         });
//       },
//       false
//     );

//     if (file) {
//       reader.readAsDataURL(file);
//     }
//   };

//   const handleCreateStamp = () => {
//     setTempData({
//       markerType: "text",
//       data: { companyName, registrationNumber },
//     });
//     handleCloseCreateStampTab();
//   };

//   // Handle save changes
//   const handleSaveChanges = () => {
//     if (tempData) {
//       formData[markerData.markerId] = {
//         markerId: markerData.markerId,
//         ...tempData,
//       };
//       setFormData(formData);
//     }
//     handleCloseSignatureTab();
//   };

//   const data = formData[markerData?.markerId]?.data;

//   return (
//     <>
//       <div className="signature" onClick={handleOpenSignatureTab}>
//         {data ? (
//           typeof data === "string" ? (
//             <img
//               src={data}
//               style={{
//                 width: "99px",
//                 height: "48px",
//               }}
//               alt="signature"
//             />
//           ) : (
//             <CompanyStamp
//               companyName={data.companyName}
//               registrationNumber={data.registrationNumber}
//               productId={data.markerId}
//             />
//           )
//         ) : (
//           <div
//             style={{
//               display: "flex",
//               gap: "10px",
//               alignItems: "center",
//             }}
//           >
//             Click to add stamp
//           </div>
//         )}
//       </div>

//       {/* Modal for choosing an image */}
//       <Modal show={signatureTabOpen} onHide={handleCloseSignatureTab}>
//         <Modal.Header closeButton>
//           <Modal.Title>Add Stamp</Modal.Title>
//         </Modal.Header>
//         <Modal.Body className="signature__modal">
//           <Form.Group controlId="formFileLg" className="mb-3">
//             <Form.Label>Choose your Stamp</Form.Label>
//             <Form.Control
//               type="file"
//               accept="image/*"
//               onChange={onSignatureImageChoose}
//             />
//           </Form.Group>
//           <Button
//             variant="link"
//             onClick={handleOpenCreateStampTab}
//             style={{
//               background: "green",
//               color: "white",
//               textDecoration: "none",
//             }}
//           >
//             Create Stamp
//           </Button>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseSignatureTab}>
//             Close
//           </Button>
//           <Button
//             variant="primary"
//             onClick={handleSaveChanges}
//             disabled={!tempData} // Disable button if no stamp is chosen or created
//           >
//             Save Changes
//           </Button>
//         </Modal.Footer>
//       </Modal>

//       {/* Modal for creating a stamp with text */}
//       <Modal show={createStampTabOpen} onHide={handleCloseCreateStampTab}>
//         <Modal.Header closeButton>
//           <Modal.Title>Create Stamp</Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group className="mb-3" controlId="companyName">
//               <Form.Label>Company Name</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter Company Name"
//                 value={companyName}
//                 onChange={(e) => setCompanyName(e.target.value)}
//               />
//             </Form.Group>
//             <Form.Group className="mb-3" controlId="registrationNumber">
//               <Form.Label>Registration Number</Form.Label>
//               <Form.Control
//                 type="text"
//                 placeholder="Enter Registration Number"
//                 value={registrationNumber}
//                 onChange={(e) => setRegistrationNumber(e.target.value)}
//               />
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button variant="secondary" onClick={handleCloseCreateStampTab}>
//             Close
//           </Button>
//           <Button variant="primary" onClick={handleCreateStamp}>
//             Create Stamp
//           </Button>
//         </Modal.Footer>
//       </Modal>
//     </>
//   );
// };

// export default Stamp;
