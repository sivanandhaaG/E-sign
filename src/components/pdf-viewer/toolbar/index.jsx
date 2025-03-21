// import React, { useState } from "react";
// import "./index.css";
// import { Button, Dropdown, FormLabel, FormCheck } from "react-bootstrap";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faArrowLeft, faArrowRight, faEye } from "@fortawesome/free-solid-svg-icons";

// const Toolbar = ({
//   numPages,
//   setNumPages,
//   active,
//   setActive,
//   documentData,
//   receivers,
//   setReceivers,
//   activeReceiver,
//   setActiveReceiver,
//   isReciverToolbar = true,
//   isPagination = true,
//   setIsChecked,
//   isChecked,
//   kycCheckedUsers,
//   setKycCheckedUsers
// }) => {

//   const handleNext = () => {
//     if (active < numPages) {
//       setActive(active + 1);
//     }
//   };

//   const handlePrevious = () => {
//     if (active > 1) {
//       setActive(active - 1);
//     }
//   };

//   const handleReceiverChange = (receiver) => {
//     setActiveReceiver(receiver);
//     setIsChecked(kycCheckedUsers?.[receiver.name] || false);
//   };

//   const handleCheckboxChange = () => {
//     if (activeReceiver) {
//       const updatedKycCheckedUsers = {
//         ...(kycCheckedUsers || {}),
//         [activeReceiver.name]: !isChecked,
//       };
//       setKycCheckedUsers(updatedKycCheckedUsers);
//       setIsChecked(!isChecked);
//     }
//   };

//   console.log("KYC Checked Users:", kycCheckedUsers);

//   return (
//     <div
//       className="toolbar"
//       style={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         gap: "10px",
//       }}
//     >
//       {isPagination && (
//         <>
//           <FormLabel>Page:</FormLabel>
//           <Button className="btn-bg-indigo" onClick={handlePrevious} disabled={active === 1}>
//             <FontAwesomeIcon icon={faArrowLeft} />
//           </Button>
//           <Dropdown>
//             <Dropdown.Toggle id="dropdown-basic">{active}</Dropdown.Toggle>
//             <Dropdown.Menu>
//               {Array.from({ length: numPages }, (_, i) => i + 1).map((page, index) => (
//                 <Dropdown.Item onClick={() => setActive(page)} key={index}>
//                   {page}
//                 </Dropdown.Item>
//               ))}
//             </Dropdown.Menu>
//           </Dropdown>
//           <Button className="btn-bg-indigo" onClick={handleNext} disabled={active === numPages}>
//             <FontAwesomeIcon icon={faArrowRight} />
//           </Button>
//         </>
//       )}
//       {isReciverToolbar && (
//         <>
//           <FormLabel>Receiver:</FormLabel>
//           <Dropdown>
//             <Dropdown.Toggle id="dropdown-basics">
//               {activeReceiver ? activeReceiver.name : "Select Receiver"}
//             </Dropdown.Toggle>
//             <Dropdown.Menu>
//               {receivers.map((receiver, index) => (
//                 <Dropdown.Item onClick={() => handleReceiverChange(receiver)} key={index}>
//                   <div>
//                     <div>{receiver.name}</div>
//                     <div style={{ fontSize: "12px", color: "grey" }}>{receiver.email}</div>
//                   </div>
//                 </Dropdown.Item>
//               ))}
//             </Dropdown.Menu>
//           </Dropdown>
//           {activeReceiver && activeReceiver.name!=="select receiver" && (
//             <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
//               <FormCheck
//                 type="checkbox"
//                 checked={isChecked}
//                 onChange={handleCheckboxChange}
//                 label="Enable Photo KYC"
//               />
//               <FontAwesomeIcon icon={faEye} style={{ cursor: "pointer" }} />
//             </div>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default Toolbar;

import React, { useEffect, useState } from "react";
import "./index.css";
import { Button, Dropdown, FormLabel, FormCheck } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faEye,
} from "@fortawesome/free-solid-svg-icons";

const Toolbar = ({
  numPages,
  setNumPages,
  active,
  setActive,
  documentData,
  receivers,
  setReceivers,
  activeReceiver,
  setActiveReceiver,
  isReciverToolbar = true,
  isPagination = true,
  setIsChecked,
  isChecked,
  kycCheckedUsers,
  setKycCheckedUsers,
  isReadOnly,
  data,
}) => {
  console.log(data?.eSignRequests?.[0]?.receivers, "datadatadata");

  const handleNext = () => {
    if (active < numPages) {
      setActive(active + 1);
    }
  };

  const handlePrevious = () => {
    if (active > 1) {
      setActive(active - 1);
    }
  };

  const handleReceiverChange = (receiver) => {
    setActiveReceiver(receiver);
    setIsChecked(kycCheckedUsers?.[receiver.name] || false);
  };

  const handleCheckboxChange = () => {
    if (activeReceiver) {
      const updatedKycCheckedUsers = {
        ...(kycCheckedUsers || {}),
        [activeReceiver.name]: !isChecked,
      };
      setKycCheckedUsers(updatedKycCheckedUsers);
      setIsChecked(!isChecked);
    }
  };

  // Automatically select the receiver if there's only one
  useEffect(() => {
    if (receivers.length === 1) {
      setActiveReceiver(receivers[0]);
    }
  }, [receivers, setActiveReceiver]);

  return (
    <div
      className="toolbar"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
      }}
    >
      {isPagination && (
        <>
          <FormLabel>Page:</FormLabel>
          <Button
            className="btn-bg-indigo"
            onClick={handlePrevious}
            disabled={active === 1}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </Button>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basic">{active}</Dropdown.Toggle>
            <Dropdown.Menu>
              {Array.from({ length: numPages }, (_, i) => i + 1).map(
                (page, index) => (
                  <Dropdown.Item onClick={() => setActive(page)} key={index}>
                    {page}
                  </Dropdown.Item>
                )
              )}
            </Dropdown.Menu>
          </Dropdown>
          <Button
            className="btn-bg-indigo"
            onClick={handleNext}
            disabled={active === numPages}
          >
            <FontAwesomeIcon icon={faArrowRight} />
          </Button>
        </>
      )}
      {isReciverToolbar && (
        <>
          <FormLabel>Receiver:</FormLabel>
          <Dropdown>
            <Dropdown.Toggle id="dropdown-basics">
              {activeReceiver?.name}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              {receivers.map((receiver, index) => (
                <Dropdown.Item
                  onClick={() => handleReceiverChange(receiver)}
                  key={index}
                >
                  <div>
                    <div>{receiver.name}</div>
                    <div style={{ fontSize: "12px", color: "grey" }}>
                      {receiver.email}
                    </div>
                  </div>
                </Dropdown.Item>
              ))}
              {isReadOnly &&
                (data?.eSignRequests?.[0]?.receivers?.length > 0 ? (
                  data.eSignRequests[0].receivers.map((item, index) => (
                    <Dropdown.Item
                      onClick={() => handleReceiverChange(item)}
                      key={index}
                    >
                      <div>
                        <div>{item.name}</div>
                        <div style={{ fontSize: "12px", color: "grey" }}>
                          {item.email}
                        </div>
                      </div>
                    </Dropdown.Item>
                  ))
                ) : (
                  <div>Data not Found</div>
                ))}
            </Dropdown.Menu>
          </Dropdown>
          {/* {activeReceiver && activeReceiver.name !== "Select Receiver" && (
            <div style={{ display: "flex", alignItems: "center", gap: "5px" }}>
              <FormCheck
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                label="Enable Photo KYC"
              />
              <FontAwesomeIcon icon={faEye} style={{ cursor: "pointer" }} />
            </div>
          )} */}
        </>
      )}
    </div>
  );
};

export default Toolbar;
