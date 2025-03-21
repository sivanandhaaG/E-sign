import { useState, useEffect } from "react";
import "./DragAndDropFileUpload.css";
import CameraIcon from "../../../assets/images/general/upload-cloud.png";
import { useMutation } from "react-query";
import {
  deleteFileFromS3,
  uploadImageToS3,
  uploadFileToS3,
} from "../../../app/api/uploadApi";
import toast, { Toaster } from "react-hot-toast";
import fileIcon from "../../../assets/images/general/fileIcon.png";
import { CircularProgress } from "@chakra-ui/react";
import Delete from "../../../assets/images/general/delete-red.png";
import { Button } from "react-bootstrap";
import alertfile from "../../../assets/images/general/alertfile.png";
import fileIcon2 from "../../../assets/images/general/File.png";

const DragAndDropFileUpload = ({
  onFileUpload,
  onFileRemove,
  isImage = true,
  allowedFileTypes = [],
  setDocumentData,
  isReadOnly,
  docData,
}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [inputKey, setInputKey] = useState(0);
  const { mutate: uploadToS3, isLoading: isUploading } = useMutation(
    isImage ? uploadImageToS3 : uploadFileToS3,
    {
      onMutate: () => {
        setProgress(0);
      },
      onSuccess: (data) => {
        if (data.data?.fileUrl) {
          toast.success("File uploaded successfully");
          setFileUrl(data.data.fileUrl);
          onFileUpload(data.data.fileUrl);
          setProgress(100);
        }
      },
      onError: (error) => {
        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        }
      },
    }
  );

  const { mutate: removeFromS3, isLoading: isRemoving } = useMutation(
    deleteFileFromS3,
    {
      onSuccess: (data) => {
        setFileUrl(null);
        onFileRemove();
        setProgress(0);
        // Reset the file input
        setInputKey((prev) => prev + 1);
      },
      onError: (error) => {
        if (error.response?.data?.message) {
          toast.error(error.response.data.message);
        }
      },
    }
  );

  const handleUpload = (file) => {
    if (isReadOnly) return;
    setProgress(0);
    const formData = new FormData();
    formData.append("file", file);
    uploadToS3(formData);
  };

  const handleDrop = (e) => {
    if (isReadOnly) return;
    e.preventDefault();
    // check if the file is in accepted file types
    if (allowedFileTypes.length > 0) {
      const fileType = e.dataTransfer.files[0].type;
      if (!allowedFileTypes.includes(fileType)) {
        toast.error("Invalid file type");
        return;
      }
    }
    setSelectedFile(e.dataTransfer.files[0]);

    handleUpload(e.dataTransfer.files[0]);
  };

  const handleFileInputChange = (e) => {
    if (isReadOnly) return;
    const file = e.target.files[0];
    if (file) {
      const fileNameWithoutExtension = file.name.split(".")[0];
      const firstThreeChars = fileNameWithoutExtension.substring(0, 3);
      const randomDigits = Math.floor(10000 + Math.random() * 90000).toString();
      const documentReferenceNumber = firstThreeChars + randomDigits;
      setSelectedFile(file);
      handleUpload(file);
      setDocumentData((prevData) => ({
        ...prevData,
        documentName: fileNameWithoutExtension,
        documentReferenceNumber: documentReferenceNumber,
      }));
    }
  };

  const handleRemove = () => {
    if (isReadOnly || !fileUrl) {
      toast.error("fileUrl is missing");
      return;
    }
    removeFromS3(fileUrl);
    setSelectedFile(null);
    setDocumentData((prevData) => ({
      ...prevData,
      documentName: "",
    }));
  };

  const fileTypes = isImage ? "image/*" : ".pdf, .doc, .docx, .xls, .xlsx";
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let interval;
    if (progress < 100) {
      interval = setInterval(() => {
        setProgress((prev) => Math.min(prev + 2, 100));
      }, 100);
    }
    return () => clearInterval(interval);
  }, [progress]);

  const containerStyle = {
    position: "relative",
    padding: "10px",
    borderRadius: "5px",
    height: "70px",
    boxShadow: "rgb(0 0 0 / 10%) 0px 4px 8px 0px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "10px",
    width: "100%",
    backgroundColor: "#fff",
    overflow: "hidden",
  };

  const progressBarStyle = {
    position: "absolute",
    top: 0,
    left: 0,
    width: `${progress}%`,
    height: "100%",
    background: "#ddd6fe",
    transition: "width 0.3s ease-in-out",
    borderRadius: "5px",
  };

  const contentStyle = {
    zIndex: 1,
    display: "flex",
    alignItems: "center",
    paddingLeft: "10px",
    width: "100%",
  };
  return (
    <div>
      {!isImage &&
      (isReadOnly
        ? docData?.eSignRequests?.[0]?.editedDocumentFileUrl
        : fileUrl) ? (
        <div className="selected-image">
          <div className="d-flex align-items-center">
            <img src={fileIcon} />
            <div className="d-flex flex-column m-1 p-2">
              <label className="file-name">
                {isReadOnly
                  ? docData?.documentdetails?.documentName
                  : selectedFile?.name}
              </label>
              <p className="file-size">
                {isReadOnly ? "Stored file" : selectedFile?.size}
              </p>
            </div>
          </div>
          <Button variant="text" onClick={handleRemove}>
            <img src={Delete} alt="remove-icon" />
          </Button>
        </div>
      ) : (
        isImage === false && (
          <div
            className="dropzone"
            onDrop={handleDrop}
            htmlFor="file-upload-input"
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              opacity: isReadOnly ? 0.5 : 1,
              pointerEvents: isReadOnly ? "none" : "auto",
            }}
          >
            <img
              src={CameraIcon}
              className="mb-2 text-center upload-document"
              alt="upload"
            />
            <p className="page-subtitle-content mb-0 text-center file-text-color">
              Click to Upload or Drag and Drop
            </p>
            <img className="file-icon-image" src={fileIcon2} />
            {isImage ? (
              <p className="page-subtitle-content mb-0 text-center">
                SVG, PNG, JPG or GIF (max, 800x400px)
              </p>
            ) : (
              <p className="page-subtitle-content mb-0 text-center">
                Supported format .pdf
              </p>
            )}
            <input
              type="file"
              id="file-upload-input"
              name="image"
              onChange={handleFileInputChange}
              disabled={isReadOnly || isUploading}
              key={inputKey}
              accept={allowedFileTypes || fileTypes}
            />
          </div>
        )
      )}
      {isUploading && (
        <div style={containerStyle}>
          <div style={progressBarStyle}></div>
          <div style={contentStyle}>
            <img src={fileIcon} alt="File Icon" />
            <div className="d-flex flex-column m-1 p-2">
              <label
                className="file-name"
                style={{ fontWeight: "bold", color: "#333" }}
              >
                {selectedFile?.name}
              </label>
              <p className="file-size" style={{ color: "#555" }}>
                {(selectedFile?.size / 1024).toFixed(2)} KB
              </p>
            </div>
          </div>
          <div
            className="d-flex align-items-center"
            style={{ zIndex: 1, paddingRight: "10px" }}
          >
            <CircularProgress value={progress} size="32px" color="#4f46e5" />
          </div>
        </div>
      )}
      <p className="page-subtitle-content">{isRemoving && "Removing..."}</p>
      {/*  uplaod sucsses aad it as per condition*/}

      {/*  failed aad it as per condition*/}

      {isImage && selectedFile && (
        <div className="selected-image-2">
          <div className="d-flex align-items-center">
            <img src={alertfile} />
            <div className="d-flex  align-items-start flex-column m-1 p-2 ">
              <label className="file-name alert">{selectedFile?.name}</label>
              <p className="alert">{selectedFile?.size}</p>
              <Button className="try-again" variant="text">
                Try Again
              </Button>
            </div>
          </div>
          <Button variant="text" onClick={handleRemove}>
            <img src={Delete} alt="remove-icon" />
          </Button>
        </div>
      )}
      <Toaster
              toastOptions={{
                duration: 4000,
                closeButton: true,
              }}
            />
    </div>
  );
};

export default DragAndDropFileUpload;
