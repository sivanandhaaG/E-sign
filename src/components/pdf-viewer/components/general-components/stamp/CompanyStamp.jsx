const CompanyStamp = ({ companyName, registrationNumber }) => {
  return (
    <div
      style={{
        position: "relative",
        width: "80px",
        height: "80px",
        border: "4px dashed black",
        borderRadius: "360px",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        textAlign: "center",
        fontFamily: "'Times New Roman', Times, serif",
        fontSize: "14px",
        backgroundColor: "#f9f9f9",
        boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
      }}
    >
      <p
        style={{
          margin: "0",
          fontSize: "8px",
          fontWeight: "bold",
          textTransform: "uppercase",
          color: "#000",
          letterSpacing: "1px",
        }}
      >
        {companyName}
      </p>
      <p
        style={{
          margin: "0",
          fontSize: "6px",
          color: "#555",
        }}
      >
        {registrationNumber}
      </p>
    </div>
  );
};

export default CompanyStamp;
// import stampit from "stampit";

// const CompanyStampFactory = stampit({
//   props: {
//     companyName: "Default Company",
//     registrationNumber: "000000",
//     styles: {
//       container: {
//         position: "relative",
//         width: "80px",
//         height: "80px",
//         border: "4px dashed #000",
//         borderRadius: "360px",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "center",
//         alignItems: "center",
//         textAlign: "center",
//         fontFamily: "'Times New Roman', Times, serif",
//         fontSize: "14px",
//         backgroundColor: "#f9f9f9",
//         boxShadow: "0 4px 6px rgba(0, 0, 0, 0.2)",
//       },
//       companyName: {
//         margin: "0",
//         fontSize: "8px",
//         fontWeight: "bold",
//         textTransform: "uppercase",
//         color: "#000",
//         letterSpacing: "1px",
//       },
//       registrationNumber: {
//         margin: "0",
//         fontSize: "6px",
//         color: "#555",
//       },
//     },
//   },
//   methods: {
//     render() {
//       const { companyName, registrationNumber, styles } = this;
//       return (
//         <div style={styles.container}>
//           <p style={styles.companyName}>{companyName}</p>
//           <p style={styles.registrationNumber}>{registrationNumber}</p>
//         </div>
//       );
//     },
//   },
// });

// const CompanyStamp = (props) => {
//   const Stamp = CompanyStampFactory(props);
//   return Stamp.render();
// };

// export default CompanyStamp;
// import { useStampedReviews } from "@frontend-sdk/stamped"; // Import the hook from the stamped SDK
// import getConfig from "@frontend-config";

// export const StampedReviews = ({
//   companyName = "Default Company",
//   registrationNumber = "0000",
//   apiKey,
//   productId,
// }) => {
//   const { storePlatformDomain } = getConfig();
//   useStampedReviews(apiKey, storePlatformDomain);

//   return (
//     <div>
//       <img
//         src={`https://stamped.io/inc/image/badges.png?apikey=${apiKey}&sId=${productId}&type=badge1&label1=${encodeURIComponent(
//           companyName
//         )}&label2=${encodeURIComponent(registrationNumber)}`}
//         alt="Stamped Badge"
//       />
//     </div>
//   );
// };


// import { ReactSVG } from 'react-svg';

// const CompanyStamp = ({ companyName, registrationNumber }) => {
//   // Define the SVG markup, including placeholders for dynamic props
//   const svgMarkup = `
//     <svg xmlns="http://www.w3.org/2000/svg" width="200" height="100" viewBox="0 0 300 150">
//       <rect x="0" y="0" width="300" height="150" rx="20" ry="20" fill="#f0f0f0" stroke="#000" stroke-width="2" />
//       <text x="50%" y="40%" text-anchor="middle" font-size="20" font-family="Arial" fill="black">
//         ${companyName}
//       </text>
//       <text x="50%" y="60%" text-anchor="middle" font-size="16" font-family="Arial" fill="black">
//         Registration No: ${registrationNumber}
//       </text>
//     </svg>
//   `;

//   return (
//     <div>
//       {/* Render the dynamic SVG as an inline component */}
//       <ReactSVG src={`data:image/svg+xml;utf8,${encodeURIComponent(svgMarkup)}`} />
//     </div>
//   );
// };

// export default CompanyStamp;
