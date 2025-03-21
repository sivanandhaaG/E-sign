// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import Signature from './general-components/signature';
// import {
//   faClock,
//   faClose,
//   faEdit,
//   faPenToSquare,
//   faStamp,
//   faTimes,
// } from '@fortawesome/free-solid-svg-icons';
// import Stamp from './general-components/stamp';
// import './index.css';
// import DateComponent from './general-components/date';
// import Initials from './general-components/initials';
// import { Tooltip } from 'react-bootstrap';
// import Icons from './icons';
// import UserSignature from './general-components/UserSignature';

// const components = [
//   {
//     label: 'Signature',
//     id: 'signature',
//     component: <Signature />,
//     icon: <Icons type="signature" />,
//   },
//   {
//     label: 'Stamp',
//     id: 'stamp',
//     component: <Stamp />,
//     icon: <Icons type="stamp" />,
//   },
//   {
//     label: 'Date',
//     id: 'date',
//     component: <DateComponent />,
//     icon: <Icons type="date" />,
//   },
//   {
//     label: 'Initials',
//     id: 'initials',
//     component: <Initials />,
//     icon: <Icons type="initials" />,
//   },
// ];

// const componentMap = {
//   signature: Signature,
//   stamp: Stamp,
//   date: DateComponent,
//   initials: Initials,
// };

// const getComponent = (id, formData, setFormData, markerData, receiver) => {
//   const Component = componentMap[id];
//   return (
//     <Component
//       formData={formData}
//       setFormData={setFormData}
//       markerData={markerData}
//       receiver={receiver}
//     />
//   );
// };

// const smallComponents = ['date', 'initials'];
// const markerLabelMap = {
//   signature: 'Signature',
//   stamp: 'Stamp',
//   date: 'dd/mm/yyyy',
//   initials: 'Initials',
// };

// const getFormComponent = (marker, removeMarker, color, name, email, toggleApplyToAll, numPages) => {
//   const height = !smallComponents.includes(marker.component)
//     ? '48px'
//     : 'fit-content';
//   const padding = !smallComponents.includes(marker.component)
//     ? '12px 8px 12px 8px'
//     : '1px 12px';

//   const isDSCSignature = marker?.data?.markerType === "dsc";

//   return (
//     <>
//       <div
//         className="drag__component"
//         draggable={true}
//         onDragStart={(e) => {
//           const rect = e.target.getBoundingClientRect();
//           const offsetX = e.clientX - rect.x;
//           const offsetY = e.clientY - rect.y;
//           e.dataTransfer.setData(
//             "widgetComponent",
//             JSON.stringify({
//               component: marker.component,
//               id: marker.id,
//               offsetX,
//               offsetY,
//               applyToAll: marker.applyToAll || false,
//               pageNumber: marker.pageNumber,
//             })
//           );
//         }}
//         style={{
//           display: 'flex',
//           justifyContent: 'center',
//           alignItems: 'center',
//           backgroundColor: color.bg,
//           borderRadius: '4px',
//           position: 'relative',
//           cursor: 'pointer',
//           opacity: 1,
//           width: '150px',
//           height: height,
//           padding: padding,
//           border: `1px dotted ${color.borderColor}`,
//         }}
//       >
//         {isDSCSignature ? (
//           <div
//             style={{
//               display: "flex",
//               flexDirection: "column",
//               alignItems: "center",
//               textAlign: "center",
//               padding: "5px",
//               fontSize: "12px",
//               width: "100%",
//             }}
//           >
//             <div style={{ fontWeight: "bold", fontSize: "14px" }}>{marker.data.name}</div>
//             <div style={{ fontSize: "10px", color: "gray" }}>
//               Digitally Signed By {marker.data.name}
//             </div>
//             <div style={{ fontSize: "10px", color: "gray" }}>
//               {marker.data.timestamp}
//             </div>
//             <img
//               src={marker.data.signatureImage}
//               alt="Digital Signature"
//               style={{
//                 width: "80px",
//                 height: "30px",
//                 objectFit: "contain",
//                 marginTop: "5px",
//               }}
//               onError={(e) => console.error("Signature Image Load Error", e)}
//             />
//           </div>
//         ) : (
//           <>
//             {/* For non-digital signatures */}
//             {!smallComponents.includes(marker.component) && (
//               <Icons type={marker.component} color={color.color} />
//             )}
//             <div style={{ color: color.color }}>
//               {markerLabelMap[marker.component]}
//             </div>
//             {/* If the marker is 'initials', display the user's signature info below the label */}
//             {marker.component === 'initials' && <UserSignature />}
//           </>
//         )}

//         <div
//           style={{
//             position: "absolute",
//             top: "-10px",
//             right: "-10px",
//             backgroundColor: "red",
//             color: "white",
//             borderRadius: "100%",
//             cursor: "pointer",
//             height: "20px",
//             width: "20px",
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//           onClick={() => removeMarker(marker.id)}
//         >
//           <FontAwesomeIcon icon={faClose} />
//         </div>
//       </div>
//       {numPages > 1 && marker.pageNumber === 1 && (
//         <div
//           style={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//             gap: "5px",
//             marginTop: "5px",
//           }}
//         >
//           <input
//             type="checkbox"
//             id={`applyToAll-${marker.id}`}
//             checked={!!marker.applyToAll}
//             onChange={(e) => {
//               console.log("Checkbox clicked:", e.target.checked);
//               toggleApplyToAll(marker.id);
//             }}
//             style={{ cursor: "pointer" }}
//           />
//           <label htmlFor={`applyToAll-${marker.id}`} style={{ cursor: "pointer", fontSize: "12px" }}>
//             Apply to all pages
//           </label>
//         </div>
//       )}
//     </>
//   );
// };

// export default components;
// export { getComponent, getFormComponent };

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Signature from "./general-components/signature";
import {
  faClock,
  faClose,
  faEdit,
  faPenToSquare,
  faStamp,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import Stamp from "./general-components/stamp";
import "./index.css";
import DateComponent from "./general-components/date";
import Initials from "./general-components/initials";
import { Tooltip } from "react-bootstrap";
import Icons from "./icons";
import UserSignature from "./general-components/UserSignature";
import { useState } from "react";

const components = [
  {
    label: "Signature",
    id: "signature",
    component: <Signature />,
    icon: <Icons type="signature" />,
  },
  {
    label: "Stamp",
    id: "stamp",
    component: <Stamp />,
    icon: <Icons type="stamp" />,
  },
  {
    label: "Date",
    id: "date",
    component: <DateComponent />,
    icon: <Icons type="date" />,
  },
  {
    label: "Initials",
    id: "initials",
    component: <Initials />,
    icon: <Icons type="initials" />,
  },
];

const componentMap = {
  signature: Signature,
  stamp: Stamp,
  date: DateComponent,
  initials: Initials,
  userSignature: UserSignature,
};

const getComponent = (id, formData, setFormData, markerData, receiver) => {
  const Component = componentMap[id];
  return (
    <Component
      formData={formData}
      setFormData={setFormData}
      markerData={markerData}
      receiver={receiver}
    />
  );
};

const smallComponents = ["date", "initials"];
const markerLabelMap = {
  signature: "Signature",
  stamp: "Stamp",
  date: "dd/mm/yyyy",
  initials: "Initials",
};
const getFormComponent = (
  marker,
  removeMarker,
  color,
  name,
  email,
  toggleApplyToAll,
  numPages,
  activeReceiver,
) => {
  const height = !smallComponents.includes(marker.component)
    ? "48px"
    : "fit-content";
  const padding = !smallComponents.includes(marker.component)
    ? "12px 8px 12px 8px"
    : "1px 12px";
  const isDSCSignature = marker?.data?.markerType === "dsc";

  console.log(marker,"sdsds");
  
  return (
    <>
      <div
        className="drag__component"
        draggable={marker.receiverName === activeReceiver.name}
                onDragStart={(e) => {
                  if (marker.receiverName !== activeReceiver.name) {
                    e.preventDefault(); 
                    return;
                  }
          const rect = e.target.getBoundingClientRect();
          const offsetX = e.clientX - rect.x;
          const offsetY = e.clientY - rect.y;
          e.dataTransfer.setData(
            "widgetComponent",
            JSON.stringify({
              component: marker.component,
              id: marker.id,
              offsetX,
              offsetY,
              applyToAll: marker.applyToAll || false,
              pageNumber: marker.pageNumber,
            })
          );
          
        }}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          // flexDirection: "column",
          textAlign: "center",
          backgroundColor: color.bg,
          borderRadius: "4px",
          position: "relative",
          cursor: marker.receiverName === activeReceiver.name ? "pointer" : "not-allowed", 
          opacity: marker.receiverName === activeReceiver.name ? 1 : 0.5,
          width: "150px",
          height: height,
          padding: padding,
          border: `1px dotted ${color.borderColor}`,
        }}
      >
        {isDSCSignature ? (
          <div
            className="dsc-signature"
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              textAlign: "center",
              padding: "5px",
              fontSize: "12px",
              width: "100%",
            }}
          >
            <div
              className="signature-name"
              style={{ fontWeight: "bold", fontSize: "14px" }}
            >
              {marker.data.name}
            </div>
            <div
              className="signature-text"
              style={{ fontSize: "10px", color: "gray" }}
            >
              Digitally Signed By {marker.data.name}
            </div>
            <div
              // className="signature-time"
              style={{ fontSize: "10px", color: "gray" }}
            >
              {marker.data.timestamp}
            </div>
            <img
              src={marker.data.signatureImage}
              alt="Digital Signature"
              className="signature-image"
              style={{
                width: "80px",
                height: "30px",
                objectFit: "contain",
                marginTop: "5px",
              }}
              onError={(e) => console.error("Signature Image Load Error", e)}
            />
          </div>
        ) : (
          <>
            {marker.component === "userSignature" ? (
              <UserSignature
                markerData={{ signature: marker.fileUrl, name: marker.name }}
              />
            ) : (
              <>
                {!smallComponents.includes(marker.component) && (
                  <Icons type={marker.component} color={color.color} />
                )}
                <div style={{ color: color.color }}>
                  {markerLabelMap[marker.component]}
                </div>
              </>
            )}
          </>
        )}

        
        <div
          className="remove-marker"
          style={{
            position: "absolute",
            top: "-10px",
            right: "-10px",
            backgroundColor: "red",
            color: "white",
            borderRadius: "100%",
            cursor: marker.receiverName === activeReceiver.name ? "pointer" : "not-allowed",
            height: "20px",
            width: "20px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            opacity: marker.receiverName === activeReceiver.name ? 1 : 0.5,
          }}
          onClick={() => {
            if (marker.receiverName === activeReceiver.name) {
              removeMarker(marker.id);
            }
          }}
        >
          <FontAwesomeIcon icon={faClose} />
        </div>
      </div>

      {/* Apply to All Pages Checkbox */}
      {/* {numPages > 1 && marker.pageNumber === 1 && (
        <div
          className="apply-all-container"
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: "5px",
            marginTop: "5px",
          }}
        >
          <input
            type="checkbox"
            id={`applyToAll-${marker.id}`}
            checked={!!marker.applyToAll}
            onChange={(e) => toggleApplyToAll(marker.id)}
            className="apply-all-checkbox"
          />
          <label
            htmlFor={`applyToAll-${marker.id}`}
            className="apply-all-label"
            style={{ fontWeight: "600" }}
          >
            Apply to all pages
          </label>
        </div>
      )} */}

{numPages > 1 && marker.pageNumber === 1 && (
  <div
    className="apply-all-container"
    style={{
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: "5px",
      marginTop: "5px",
    }}
  >
    <input
      type="checkbox"
      id={`applyToAll-${marker.id}-${marker.receiverEmail}`} 
      checked={marker.applyToAll} 
      disabled={marker.receiverName !== activeReceiver.name} 
      onChange={() => {
        if (marker.receiverName === activeReceiver.name) {
          console.log(
            `🔄 Toggling Apply to All for Marker: ${marker.id}, Previous State: ${marker.applyToAll}`
          );
          toggleApplyToAll(marker.id);
        }
      }}
      className="apply-all-checkbox"
    />
    <label
      htmlFor={`applyToAll-${marker.id}-${marker.receiverEmail}`}
      className="apply-all-label"
      style={{
        fontWeight: "600",
        color: marker.receiverName !== activeReceiver.name ? "gray" : "black",
        cursor: marker.receiverName !== activeReceiver.name ? "not-allowed" : "pointer",
      }}
    >
      Apply to all pages
    </label>
  </div>
)}






    </>
  );
};

export default components;
export { getComponent, getFormComponent };
