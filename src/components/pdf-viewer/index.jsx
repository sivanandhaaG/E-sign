import React from "react";
import Components from "./components";
import ViewPort from "./viewport";
// import Thumbnails from "./thumbnails";
import Toolbar from "./toolbar";
import "./index.css";
import img1 from "./images/img1.png";
import img2 from "./images/img2.png";
// import img3 from "./images/img3.png";
// import img4 from "./images/img4.png";

import { DndContext } from "@dnd-kit/core";

const PdfViewer = ({
  documentData,
  setDocumentData,
  receivers,
  setReceivers,
  setIsChecked,
  isChecked,
  setKycCheckedUsers,
  kycCheckedUsers,
  isReadOnly,
  data,
}) => {
  const [images, setImages] = React.useState([img1, img2]);
  const [active, setActive] = React.useState(1);
  const [numPages, setNumPages] = React.useState(null);
  const [activeReceiver, setActiveReceiver] = React.useState({
    name: "select receiver",
    email: "",
  });
  // console.log("documentData", setReceivers);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "100vh",
        // width: "100%",
      }}
    >
      <div
        className=""
        style={{
          maxWidth: "fit-content",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Toolbar
          numPages={numPages}
          setNumPages={setNumPages}
          active={active}
          setActive={setActive}
          documentData={documentData}
          setDocumentData={setDocumentData}
          receivers={receivers}
          setActiveReceiver={setActiveReceiver}
          activeReceiver={activeReceiver}
          isPagination={false}
          setIsChecked={setIsChecked}
          isChecked={isChecked}
          setKycCheckedUsers={setKycCheckedUsers}
          kycCheckedUsers={kycCheckedUsers}
          isReadOnly={isReadOnly}
          data={data}
        />
        <div className="pdfviewer">
          {/* <DndContext> */}
          <Components
            activeReceiver={activeReceiver}
            isReadOnly={isReadOnly}
            data={data}
          />

          <ViewPort
            documentData={documentData}
            setDocumentData={setDocumentData}
            images={images}
            active={active}
            numPages={numPages}
            setNumPages={setNumPages}
            activeReceiver={activeReceiver}
            setActiveReceiver={setActiveReceiver}
            receivers={receivers}
            setReceivers={setReceivers}
            isReadOnly={isReadOnly}
            data={data}
          />

          {/* <Thumbnails images={images} active={active} setActive={setActive} /> */}
          {/* </DndContext> */}
        </div>
        <Toolbar
          numPages={numPages}
          setNumPages={setNumPages}
          active={active}
          setActive={setActive}
          documentData={documentData}
          setDocumentData={setDocumentData}
          receivers={receivers}
          setActiveReceiver={setActiveReceiver}
          activeReceiver={activeReceiver}
          isReciverToolbar={false}
        />
      </div>
    </div>
  );
};

export default PdfViewer;
