// import { useState } from "react";

// function DocumentUpload() {
//   const [file, setFile] = useState(null);
//   const [fileContent, setFileContent] = useState(null);
//   const [highlights, setHighlights] = useState([]); // Store highlights with notes
//   const [note, setNote] = useState(""); // Temporary note text
//   const [showNoteBox, setShowNoteBox] = useState(false); // Control note box visibility
//   const [highlightRange, setHighlightRange] = useState(null); // Range of selected text

//   const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
//     setFile(selectedFile);

//     if (selectedFile && selectedFile.type === "application/pdf") {
//       const fileURL = URL.createObjectURL(selectedFile);
//       setFileContent(fileURL);
//     }
//   };

//   const handleTextSelection = () => {
//     const selection = window.getSelection();
//     if (selection && selection.toString().trim() !== "") {
//       const range = selection.getRangeAt(0);
//       setHighlightRange(range);
//       setShowNoteBox(true);
//     }
//   };

//   const saveHighlight = () => {
//     if (highlightRange && note.trim() !== "") {
//       setHighlights((prev) => [
//         ...prev,
//         { text: highlightRange.toString(), note, range: highlightRange },
//       ]);
//       setNote("");
//       setShowNoteBox(false);
//     }
//   };

//   const renderHighlights = () => {
//     return highlights.map((highlight, index) => (
//       <mark
//         key={index}
//         style={{ backgroundColor: "yellow", padding: "0 2px" }}
//         title={highlight.note}
//       >
//         {highlight.text}
//       </mark>
//     ));
//   };

//   return (
//     <div className="col-12" style={{ display: "flex", height: "100vh" }}>
//       <div
//         className="border col-md-2 border"
//         style={{ marginTop: "65px", height: "100vh" }}
//       >
//         <h1>Notes</h1>
//       </div>
//       <div
//         className="col-md-10"
//         style={{ marginTop: "70px", position: "relative" }}
//         onMouseUp={handleTextSelection}
//       >
//         <input type="file" onChange={handleFileChange} />
//         {file && (
//           <div>
//             <embed
//               src={fileContent}
//               width="100%"
//               height="700px"
//               type="application/pdf"
//             />
//           </div>
//         )}

//         {/* Highlights */}
//         <div>{renderHighlights()}</div>

//         {/* Note Box */}
//         {showNoteBox && (
//           <div
//             style={{
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               background: "white",
//               border: "1px solid gray",
//               padding: "10px",
//               zIndex: 1000,
//             }}
//           >
//             <textarea
//               value={note}
//               onChange={(e) => setNote(e.target.value)}
//               placeholder="Add a note for this highlight"
//               style={{ width: "100%", height: "60px" }}
//             ></textarea>
//             <button onClick={saveHighlight}>Save</button>
//             <button onClick={() => setShowNoteBox(false)}>Cancel</button>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// }

// export default DocumentUpload;
import { useState } from "react";
import { Worker, Viewer } from "@react-pdf-viewer/core";
import "@react-pdf-viewer/core/lib/styles/index.css";
import { Button } from "react-bootstrap";
import './pdf.css'

function DocumentUpload() {
  const [file, setFile] = useState(null);
  const [highlights, setHighlights] = useState([]); 
  const [note, setNote] = useState("");
  const [showNoteBox, setShowNoteBox] = useState(false); 
  const [highlightedText, setHighlightedText] = useState(""); 
  const [selectionCoords, setSelectionCoords] = useState({ top: 0, left: 0 });

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      const fileURL = URL.createObjectURL(selectedFile);
      setFile(fileURL);
    }
  };

  const handleTextSelection = () => {
    const selection = window.getSelection();
    if (selection && selection.toString().trim() !== "") {
      const range = selection.getRangeAt(0);
      const rect = range.getBoundingClientRect();

      setHighlightedText(selection.toString());
      setSelectionCoords({
        top: rect.top + window.scrollY,
        left: rect.left + window.scrollX,
      });
      setShowNoteBox(true);
    }
  };

  const saveHighlight = () => {
    if (highlightedText.trim() !== "" && note.trim() !== "") {
      setHighlights((prev) => [...prev, { text: highlightedText, note }]);
      setHighlightedText("");
      setNote("");
      setShowNoteBox(false);
    }
  };

  const renderHighlightsInNotes = () => {
    return highlights.map((highlight, index) => (
      <div
        className="sideHighlightedData"
        key={index}
        style={{ borderBottom: "1px solid gray", padding: "15px" }}
      >
        <b>{highlight.note}</b>
        <p style={{marginTop:"5px"}}>{highlight.text}</p>
      </div>
    ));
  };

  return (
    <div className="col-12" style={{ display: "flex", height: "100vh" }}>
      {/* Left Sidebar for Notes */}
      <div
        className="col-md-3"
        style={{ height: "100vh", overflowY: "scroll",scrollbarWidth:"none"}}
      >
        <h1 style={{ marginLeft: "15px" }}>Notes</h1>
        <div>{renderHighlightsInNotes()}</div>
      </div>  

      {/* Main PDF Viewer */}
      <div
        className="col-md-9"
        style={{ position: "relative" ,height:"100vh",boxShadow:"0px 0px 2px 2px rgb(222, 226, 230)"}}
        onMouseUp={handleTextSelection}
      >
        <input type="file" onChange={handleFileChange} />
        {file && (
          <div
            style={{
              height: "90vh",
              overflow: "auto",
            }}
          >
            <Worker
              workerUrl={`https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js`}
            >
              <Viewer fileUrl={file} />
            </Worker>
          </div>
        )}

        {/* Note Box */}
        {showNoteBox && (
          <div
            style={{
              position: "absolute",
              top: selectionCoords.top + 10, 
              left: selectionCoords.left,
              background: "white",
              padding: "10px",
              zIndex: 1000,
              borderRadius:"10px",
              boxShadow:"0px 1px 2px 0px grey"
            }}
          >
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add notes"
              style={{
                width: "200px",
                height: "50px",
                border: "1px solid grey",
                padding:"10px",
                borderRadius:"10px"
              }}
            ></textarea>
            <br />
            <div style={{display:"flex",justifyContent:"end",gap:"10px"}}>
              <Button variant="success" onClick={saveHighlight}>
                Save
              </Button>
              <Button variant="danger" onClick={() => setShowNoteBox(false)}>
                Cancel
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DocumentUpload;
