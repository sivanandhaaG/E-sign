import React, { useEffect, useState } from "react";
import "./index.css";
import components from "./components";
import toast, { Toaster } from "react-hot-toast";
import { getUserProfileDetails } from "../../../app/api/userApi";

const Components = ({ activeReceiver }) => {
  const [userSignatures, setUserSignatures] = useState([]);

  // **Fetch user signatures from API**
  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await getUserProfileDetails();
        console.log("API Response:", response?.data?.signatures);
        if (response?.data?.signatures) {
          setUserSignatures(response.data.signatures);
        }
      } catch (error) {
        console.error("Error fetching user profile details:", error);
      }
    };
    fetchUserProfile();
  }, []);

  return (
    <div
      className="components"
      style={{ padding: "10px", overflowY: "scroll" }}
    >
      <div
        style={{
          fontSize: "16px",
          margin: "20px 0px",
          borderLeft: "3px solid #ffd65b",
          width: "100%",
       
          display: "flex",
          justifyContent: "center",
          gap: "10px",
        }}
      >
        Select And Drag
      </div>

      {/* Standard Components (Signature, Stamp, etc.) */}
      {components?.map((component, index) => (
        <div
          key={component.id || index}
          className="drag__component"
          draggable={true}
          onDragStart={(e) => {
            if (!activeReceiver?.email) {
              toast.error("Please select a receiver");
              return;
            }
            const rect = e.target.getBoundingClientRect();
            e.dataTransfer.setData(
              "widgetComponent",
              JSON.stringify({
                component: component.id,
                offsetX: e.clientX - rect.x,
                offsetY: e.clientY - rect.y,
              })
            );
          }}
        >
          <div
            style={{
              width: "30px",
              height: "30px",
              borderRadius: "4px",

              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {component.icon}
          </div>
          <div style={{ color: "#4F46E5" }}>{component.label}</div>
        </div>
      ))}

      <p
        style={{
          borderLeft: "3px solid #AA60C8",
          margin: "20px 0px",
          width: "100%",
          paddingLeft: "15px",
        }}
      >
        User Sign
      </p>

      {/* **Draggable User Signatures** */}
      {userSignatures.length > 0 &&
        userSignatures.map((user) => (
          <div
         
            key={user.userId} 
            className="drag__component user-signature"
            draggable={true}
            onDragStart={(e) => {
              if (!activeReceiver?.email) {
                toast.error("Please select a receiver");
                return;
              }

              const rect = e.target.getBoundingClientRect();

            
              const draggedSignature = {
                component: "userSignature",
                id: user.userId,
                signature: user.fileUrl, 
                name: user.name,
                offsetX: e.clientX - rect.x,
                offsetY: e.clientY - rect.y,
              };

              e.dataTransfer.setData(
                "widgetComponent",
                JSON.stringify(draggedSignature)
              );
            }}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              backgroundColor: "#f0f0f0",
              borderRadius: "4px",
              position: "relative",
              cursor: "pointer",
              opacity: 1,
              width: "150px",
              minHeight: "30px",  
              padding: "8px 12px",
              border: "1px dotted #ccc",
              wordWrap: "break-word", 
              whiteSpace: "nowrap", 
              overflow: "hidden",
              textOverflow: "ellipsis",
            }}
          >
            

            <div
              style={{
                color: "#4F46E5",
                textAlign: "center",
                fontWeight: "400  ",
             
              }}
            > 
              {user.name}
            </div>

            {/* User Signature Image */}
            {/* {user.fileUrl && (
              <img
                src={user.fileUrl}
                alt={`${user.name}'s Signature`}
                style={{
                  width: "100px",
                  height: "25px",
                  objectFit: "contain",
                  marginTop: "5px",
                }}
              />
            )} */}
          </div>
        ))}
    </div>
  );
};

export default Components;
