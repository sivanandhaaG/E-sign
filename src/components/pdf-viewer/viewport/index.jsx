import React, { useEffect, useRef, useState } from "react";
import "./index.css";
import { Document, Page } from "react-pdf";
import { pdfjs } from "react-pdf";
import components, {
  // getComponent,
  getFormComponent,
} from "../components/components";
import { MarkerColors } from "./colors";
import { Spinner, useMediaQuery } from "@chakra-ui/react";
import { getComponent } from "../../../components/pdf-viewer/components/components";

const ViewPort = ({
  documentData,
  setDocumentData,
  images,
  active,
  numPages,
  receivers,
  setReceivers,
  activeReceiver,
  setActiveReceiver,
  setNumPages,
  isReadOnly,
  data,
}) => {
  useEffect(() => {
    pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;
  }, []);

  console.log(
    data?.eSignRequests?.[0]?.receivers
      .map((markers) => markers.markers)
      .map((marker) => marker.marker),
    "datarrww"
  );
  const marker = data?.eSignRequests?.[0]?.receivers?.[0]?.markers || [];

  console.log(
    marker.map((marker) => marker?.pageNumber),
    "markersss"
  );
  const [formData, setFormData] = useState({});
  const [isMobile] = useMediaQuery("(max-width: 768px)");
  const [scale, setScale] = useState(isMobile ? window.innerWidth / 617 : 1.0);
  const viewportRef = React.useRef(null);
  const markerRefs = useRef([]);

  console.log(documentData?.fileUrl + "from viewport");
  const isScrollable = function (ele) {
    const hasScrollableContent = ele.scrollHeight > ele.clientHeight;

    const overflowYStyle = window.getComputedStyle(ele).overflowY;
    const isOverflowHidden = overflowYStyle.indexOf("hidden") !== -1;

    return hasScrollableContent && !isOverflowHidden;
  };

  const toggleApplyToAll = (markerId) => {
    console.log(`🔄 Toggling Apply to All for Marker: ${markerId}, Receiver: ${activeReceiver.name}`);
  
    setReceivers((prevReceivers) =>
      prevReceivers.map((receiver) => {
        if (receiver.email === activeReceiver.email) {
          return {
            ...receiver,
            markers: receiver.markers.map((marker) => { 
              if (marker.id === markerId) {
                const newApplyToAll = !marker.applyToAll; 
                console.log(`✔️ Marker ${markerId} applyToAll changed to:`, newApplyToAll);
                return { ...marker, applyToAll: newApplyToAll };
              }
              return marker;
            }),
          };
        }
        return receiver;
      })
    );
  
    // setReceivers((prevReceivers) =>
    //   prevReceivers.map((receiver) => {
    //     if (receiver.email === activeReceiver.email) {
    //       let isCurrentlyAppliedToAll = receiver.markers.some(
    //         (marker) => marker.id === markerId && marker.applyToAll
    //       );
  
    //       if (!isCurrentlyAppliedToAll) {
    //         console.log(`❌ Unchecking Apply to All for Marker: ${markerId}`);
  
    //         return {
    //           ...receiver,
    //           markers: receiver.markers.filter(
    //             (marker) =>
    //               marker.id === markerId || 
    //               (!marker.id.startsWith(`copy-${markerId}-`) &&
    //                marker.pageNumber === 1 &&
    //                marker.receiverEmail === activeReceiver.email) 
    //           ),
    //         };
    //       } else {
    //         console.log(`✅ Checking Apply to All for Marker: ${markerId}`);
  
    //         const baseMarker = receiver.markers.find(
    //           (marker) => marker.id === markerId
    //         );
  
    //         if (!baseMarker) return receiver;
  
    //         const newMarkers = Array.from({ length: numPages - 1 }, (_, i) => ({
    //           ...baseMarker,
    //           id: `copy-${markerId}-${i + 2}-${activeReceiver.email}`, 
    //           pageNumber: i + 2,
    //           applyToAll: true,
    //           receiverEmail: activeReceiver.email, 
    //         }));
  
    //         return {
    //           ...receiver,
    //           markers: [...receiver.markers, ...newMarkers],
    //         };
    //       }
    //     }
    //     return receiver; 
    //   })
    // );

    setReceivers((prevReceivers) =>
      prevReceivers.map((receiver) => {
        if (receiver.email === activeReceiver.email) {
          let isCurrentlyAppliedToAll = receiver.markers.some(
            (marker) => marker.id === markerId && marker.applyToAll
          );
    
          if (!isCurrentlyAppliedToAll) {
            console.log(`❌ Unchecking Apply to All for Marker: ${markerId}`);
    
            return {
              ...receiver,
              markers: receiver.markers.filter(
                (marker) =>
                
                  marker.id === markerId || 
            
                  !marker.id.startsWith(`copy-${markerId}-`)
              ),
            };
          } else {
            console.log(`✅ Checking Apply to All for Marker: ${markerId}`);
    
            const baseMarker = receiver.markers.find(
              (marker) => marker.id === markerId
            );
    
            if (!baseMarker) return receiver;
    
            const newMarkers = Array.from({ length: numPages - 1 }, (_, i) => ({
              ...baseMarker,
              id: `copy-${markerId}-${i + 2}-${activeReceiver.email}`, 
              pageNumber: i + 2,
              applyToAll: true,
              receiverEmail: activeReceiver.email, 
            }));
    
            return {
              ...receiver,
              markers: [...receiver.markers, ...newMarkers],
            };
          }
        }
        return receiver; 
      })
    );
    

  };
  
  
  
  
  
  
  
  
  

  const removeMarker = (markerId) => {
    console.log(`🗑 Removing marker: ${markerId} for receiver: ${activeReceiver.name}`);
  
    setReceivers((prevReceivers) =>
      prevReceivers.map((receiver) => {
        if (receiver.email === activeReceiver.email) {
          const updatedMarkers = receiver.markers.filter(
            (marker) =>
              marker.id !== markerId &&
              !marker.id.startsWith(`copy-${markerId}-`) &&
              marker.receiverEmail === activeReceiver.email
          );
  
          console.log("After removing marker:", updatedMarkers);
  
          return { ...receiver, markers: updatedMarkers };
        }
        return receiver;
      })
    );
  
    setActiveReceiver((prevActiveReceiver) => {
      const updatedMarkers = prevActiveReceiver.markers.filter(
        (marker) =>
          marker.id !== markerId &&
          !marker.id.startsWith(`copy-${markerId}-`) &&
          marker.receiverEmail === activeReceiver.email
      );
  
      console.log("Updated activeReceiver.markers:", updatedMarkers);
  
      return { ...prevActiveReceiver, markers: updatedMarkers };
    });
  };
  
  
  const getScrollableParent = function (ele) {
    return !ele || ele === document.body
      ? document.body
      : isScrollable(ele)
      ? ele
      : getScrollableParent(ele.parentNode);
  };

  function GetCoordinates(e, myImg, offsetX, offsetY) {
    var PosX = 0;
    var PosY = 0;
    var ImgPos;
    ImgPos = FindPosition(myImg);
    const parent = getScrollableParent(myImg);
    if (!e) var e = window.event;
    if (e.pageX || e.pageY) {
      console.log("sss");
      PosX = e.pageX - offsetX;
      PosY = e.pageY + viewportRef.current.scrollTop - offsetY;
    } else if (e.clientX || e.clientY) {
      PosX =
        e.clientX +
        parent.scrollLeft +
        document.body.scrollLeft +
        viewportRef.current.scrollLeft +
        document.documentElement.scrollLeft -
        offsetX;
      PosY =
        e.clientY +
        parent.scrollTop +
        document.body.scrollTop +
        viewportRef.current.scrollTop +
        document.documentElement.scrollTop -
        offsetY;
    }
    PosX = PosX - ImgPos[0];
    PosY = PosY - ImgPos[1];

    const xRatio = (PosX / myImg.width) * 100;
    const yRatio = (PosY / myImg.height) * 100;

    const height = myImg.height / 7;
    const width = myImg.width / 5;

    return { x: PosX, y: PosY, xRatio, yRatio, height, width };
  }

  function FindPosition(oElement) {
    if (typeof oElement.offsetParent != "undefined") {
      for (var posX = 0, posY = 0; oElement; oElement = oElement.offsetParent) {
        posX += oElement.offsetLeft;
        posY += oElement.offsetTop;
      }
      return [posX, posY];
    } else {
      return [oElement.x, oElement.y];
    }
  }

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  let allMarkers = receivers.map((receiver, index) =>
    receiver.markers.map((marker) => {
      return {
        ...marker,
        receiverIndex: index,
        receiverName: receiver.name,
        receiverEmail: receiver.email,
      };
    })
  );
  console.log(allMarkers, "allMarkers");
  console.log(marker, "marker");
  allMarkers = allMarkers.flat();

  const combinedMarkers = [...allMarkers, ...marker];

  console.log(allMarkers, "allMarkers");

  return (
    <Document
      file={
        isReadOnly
          ? data?.eSignRequests?.[0]?.editedDocumentFileUrl
          : documentData?.fileUrl
      }
      onLoadSuccess={onDocumentLoadSuccess}
      className="viewport"
      inputRef={viewportRef}
      loading={
        <div
          style={{
            width: "617px",
            height: "700px",
            heightL: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Spinner size="xl" color="blue.500" thickness="4px" speed="0.65s" />
        </div>
      }
      style={{
        border: "1px solid black",
      }}
    >
      {combinedMarkers
        ?.filter((marker) => marker.pageNumber === active) 
        ?.map((marker, index) => (
          <div
            style={{
              position: "absolute",
              top: marker?.y,
              left: marker?.x,
              zIndex: 100,
            }}
            key={marker.markerId || marker.id || `marker-${index}`} 
          >
            {getFormComponent(
              marker,
              removeMarker,
              MarkerColors[`_${marker.receiverIndex + 1}`] || "black", 
              marker.receiverName,
              marker.receiverEmail,
              toggleApplyToAll,
              numPages,
              activeReceiver
            )}
          </div>
        ))}

      {/* {marker?.[0].map((marker, markerIndex) => {
          // const Component = getComponent(marker.component);
          return (
            <div
              style={{
                position: "absolute",
                top: marker.y,
                left: marker.x,
                zIndex: 100,
              }}
              key={markerIndex}
            >
              {getFormComponent(
                marker,
                // removeMarker,
                MarkerColors[`_${marker.receiverIndex + 1}`],
                marker.receiverName,
                marker.receiverEmail,
                toggleApplyToAll,
                numPages,
                // marker.name,    
          marker.fileUrl 
              )}
            </div>
          );
        })} */}
      <Page
        onDragOver={(e) => {
          console.log("drop", e, e.nativeEvent.offsetHeight);
          e.preventDefault();
        }}
        onDrop={(e) => {
          e.preventDefault();
        
          const componentData = JSON.parse(e.dataTransfer.getData("widgetComponent"));
          console.log("📌 Component Dropped:", componentData);
        
          const { x, y, height, width } = GetCoordinates(
            e,
            e.target,
            componentData.offsetX,
            componentData.offsetY
          );
        
          const pageNumber = active;
        
          setReceivers((prevReceivers) =>
            prevReceivers.map((receiver) => {
              if (receiver.email === activeReceiver.email) {
                const existingMarkerIndex = receiver.markers.findIndex(
                  (marker) => marker.id === componentData.id
                );
        
                if (existingMarkerIndex !== -1) {
                  return {
                    ...receiver,
                    markers: receiver.markers.map((marker, index) =>
                      index === existingMarkerIndex ? { ...marker, x, y } : marker
                    ),
                  };
                } else {
                  let newMarkers = [
                    {
                      id: `marker-${receiver.email}-${receiver.markers.length + 1}`,
                      component: componentData.component,
                      x: x,
                      y: y,
                      height,
                      width,
                      pageNumber,
                      applyToAll: componentData.applyToAll ,
                      fileUrl: componentData.signature || "",
                      receiverEmail: activeReceiver.email, // Ensure marker belongs to the active receiver
                    },
                  ];
        
                  if (componentData.applyToAll && pageNumber === 1) {
                    newMarkers = Array.from({ length: numPages - 1 }, (_, i) => ({
                      id: `copy-marker-${receiver.email}-${receiver.markers.length + 1}-${i + 2}`,
                      component: componentData.component,
                      x: x,
                      y: y,
                      height,
                      width,
                      pageNumber: i + 2, // Page 2 onward
                      applyToAll: true,
                      fileUrl: componentData.signature || "",
                      receiverEmail: activeReceiver.email, // Ensure it belongs to the right receiver
                    }));
                  }
        
                  return {
                    ...receiver,
                    markers: [...receiver.markers, ...newMarkers],
                  };
                }
              }
              return receiver;
            })
          );
        }}
        
        
        
        pageNumber={active}
        className="viewport__page"
        renderAnnotationLayer={false}
      />
    </Document>
  );
};

export default ViewPort;
