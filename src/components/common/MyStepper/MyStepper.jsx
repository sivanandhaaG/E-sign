// import React from "react";
// import { Stepper } from "react-form-stepper";
// // import {Stepper} from "react-vertical-stepper";
// function MyStepper({ steps, activeStep }) {
//   return (
//     <>

//       <Stepper
//         steps={steps?.map((step) => {
//           const textStyle = activeStep === 1 ? { color: "#4338CA" } : {};
//           return {
//             label: (
//               <div>
//                 <p style={textStyle} className="stepper-title mb-0">
//                   {step.header}
//                 </p>
//                 <p style={textStyle} className="stepper-subtitle">
//                   {step.subHeader}
//                 </p>
//               </div>
//             ),
//           };
//         })}
//         styleConfig={{
//           activeBgColor: "#ffff",
//           activeTextColor: "transparent",
//           inactiveBgColor: "#F8FAFC",
//           inactiveTextColor: "#4F46E5",
//           //   inactiveTextColor: "#E5E7EB",
//           completedBgColor: "transparent",
//           completedTextColor: "transparent",
//           size: "1.5em",
//         }}
//         activeStep={activeStep}
//       />
//     </>
//   );
// }

// export default MyStepper;

// Correct one

// import { Stepper } from "react-form-stepper";

// function MyStepper({ steps, activeStep }) {
//   return (
//     <>
//       <Stepper
//         steps={steps?.map((step, index) => {
//           const isActive = activeStep === index;
//           const isCompleted = activeStep > index;

//           const textStyle = isActive
//             ? { color: "#4338CA" }
//             : isCompleted
//             ? { color: "#4CAF50" }
//             : {};

//           return {
//             label: (
//               <div>
//                 <p style={textStyle} className="stepper-title mb-0">
//                   {step.header}
//                 </p>
//                 <p style={textStyle} className="stepper-subtitle">
//                   {step.subHeader}
//                 </p>
//               </div>
//             ),
//           };
//         })}
//         styleConfig={{
//           activeBgColor: "#FFFF",
//           activeTextColor: "transparent",
//           inactiveBgColor: "#F8FAFC",
//           inactiveTextColor: "#4F46E5",
//           completedBgColor: "#E5E7EB",
//           completedTextColor: "transparent",
//           size: "1.5em",
//           connectorStateColors: true,
//           connectorStyleConfig: {
//             completedColor: "var(--Colors-indigo-700, #4338CA)",
//             activeColor: "#4338CA",
//             disabledColor: "#E5E7EB",
//             size: 4,
//           },
//         }}
//         activeStep={activeStep}
//       />
//     </>
//   );
// }

// export default MyStepper;

// import { transition } from "@chakra-ui/react";
import Stepper from "react-stepper-horizontal";
import { Tooltip } from "@chakra-ui/react";
import moment from "moment";

function MyStepper({
  steps,
  activeStep,
  errorMessages = [],
  hasError,
  createdAt,
  viewedAt,
  signedAt,
}) {
  const stepLabels = steps.map((step, index) => {
    const isActive = activeStep === index;
    const isCompleted = activeStep > index;
    const errorMessage = errorMessages[index] || "";
    const isError = hasError && !!errorMessage;
    const isReadOnly = window.location.pathname.includes("/details/");

    const labelStyle = {
      color: isError
        ? "#DC3545" // Red for error
        : isCompleted
        ? "#4CAF50" // Green for completed
        : isActive
        ? "#4CAF50" // Blue for active
        : "gray", // Default color
      fontWeight: "500",
    };

    // Select the correct timestamp for each step
    let timestamp = null;
    if (step.header === "Sent") timestamp = createdAt;
    if (step.header === "Viewed") timestamp = viewedAt;
    if (step.header === "Signed") timestamp = signedAt;

    return {
      title: (
        <Tooltip label={errorMessage} hasArrow isDisabled={!isError}>
          <div style={{ textAlign: "center" }}>
            <p style={{ ...labelStyle, margin: 0 }}>{step.header}</p>
            <p style={{ ...labelStyle, margin: 0, fontSize: "0.85em" }}>
              {step.subHeader}
            </p>
            {isReadOnly && timestamp && (
              <p
                style={{
                  ...labelStyle,
                  paddingTop: "5px",
                  fontWeight: "500",
                  fontSize: "14px",
                }}
              >
                {moment(timestamp).format("DD-MM-YYYY - hh:mm:ss A")}
              </p>
            )}
          </div>
        </Tooltip>
      ),
    };
  });

  return (
    <Stepper
      steps={stepLabels}
      activeStep={activeStep}
      activeColor={hasError ? "#4CAF50" : "#4CAF50"}
      completeColor="#4CAF50"
      defaultColor="gray"
      circleFontColor="white"
      size={39}
      completeBarColor="#4CAF50"
      defaultBarColor="#E5E7EB"
      titleTop={20}
    />
  );
}

export default MyStepper;
