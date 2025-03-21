import React from "react";

const SignTag = React.memo(({ top, onClick }) => {
    return (
      <button
        onClick={onClick}
        style={{
          position: "absolute",
          top: `${top}px`,
          left: "-77px",
          backgroundColor: "#4f46e5",
          color: "white",
          fontWeight: "bold",
          border: "none",
          padding: "10px 20px",
          cursor: "pointer",
          clipPath: "polygon(0% 0%, 80% 0%, 100% 50%, 80% 100%, 0% 100%)",
          transition: "top 0.3s ease-in-out, left 0.3s ease-in-out",
          zIndex: 999,
        }}
      >
        SIGN
      </button>
    );
  });
  

export default SignTag;
