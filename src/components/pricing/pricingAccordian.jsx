import { useState } from "react";
import check from "../../assets/images/general/check.svg";
import { Button } from "react-bootstrap";

const data = [
  {
    label: "Aadhaar eSign - OTP, Biometric, IRIS and Face",
    type: ["true", "true", "true", "true"],
  },
  {
    label: "Aadhaar eSign - OTP, Biometric, IRIS and Face2",
    type: ["false", "Paid add-on", "true", "true"],
  },
  {
    label: "Aadhaar eSign - OTP, Biometric, IRIS and Face3",
    type: ["false", "Paid add-on", "true", "true"],
  },
  {
    label: "Aadhaar eSign - OTP, Biometric, IRIS and Face4",
    type: ["false", "Paid add-on", "true", "true"],
  },
];

// const PricingAccordian = () => {
//   return (
//     <>
//       {data.map((item, index1) => {
//         return (
//           <div
//           key={index1}
//             className='mt-5'
//             style={{
//               minWidth: '1080px',
//             }}
//           >
//             <div
//               style={{
//                 minWidth: '300px',
//                 maxWidth: '300px',
//               }}
//             >
//               {item.label}
//             </div>

//             {item.type.map((type, index) => {
//               return (
//                 <div
//                 key={index}
//                   className='text-center border border-top-0 border-bottom-0'
//                   style={{
//                     display: 'flex',
//                     justifyContent: 'center',
//                     alignItems: 'center',
//                   }}
//                 >
//                   <span className='h5'>
//                     {type === 'true' ? (
//                       <>
//                         <img
//                           src={check}
//                           alt='check'
//                           style={{
//                             width: '25px',
//                             // height: '20px',
//                           }}
//                         />
//                       </>
//                     ) : type === 'false' ? (
//                       <></>
//                     ) : (
//                       type
//                     )}
//                   </span>
//                 </div>
//               );
//             })}
//           </div>
//         );
//       })}
//     </>
//   );
// };

// export default PricingAccordian;
import { IoIosAddCircleOutline } from "react-icons/io";
import { CiCircleInfo } from "react-icons/ci";

const pricingAccordian = () => {
  const [ShowAccordian, setShowAccordian] = useState("");
  const handleShowAccordian = (key) => {
    if (key?.label !== ShowAccordian) {
      setShowAccordian(key?.label);
    } else {
      setShowAccordian("");
    }
  };
  return (
    <div
      className="m-1"
      style={{
        padding: "1rem",
        overflowX: "scroll",
      }}
    >
      <table>
        <tbody>
          <tr>
            <td
              style={{
                width: "17%",
              }}
            >
              <div className="d-flex justify-content-between gap-4 align-items-center 1 p-1">
                <span
                  style={{
                    fontSize: "small",
                  }}
                ></span>
              </div>
            </td>
            <td
              className="border  px-5 py-4 border-top-0 border-bottom-0"
              style={{
                width: "10%",
              }}
            >
              <div className="d-flex justify-content-center flex-column align-items-center">
                <span className="h5"> Startup</span>
                <Button
                  colorScheme="teal"
                  className="btn-outlne-indigo-pill-transprint"
                  variant={"outline"}
                >
                  Choose Plan
                </Button>
              </div>
            </td>
            <td
              className="border  px-5 py-4 border-top-0 border-bottom-0"
              style={{
                width: "10%",
              }}
            >
              <div className="d-flex justify-content-center flex-column align-items-center">
                <span className="h5"> Premium</span>
                <Button
                  colorScheme="teal"
                  className="btn-outlne-indigo-pill-transprint"
                  variant={"outline"}
                >
                  Choose Plan
                </Button>
              </div>
            </td>
            <td
              className="border  px-5 py-4 border-top-0 border-bottom-0"
              style={{
                width: "10%",
              }}
            >
              <div className="d-flex justify-content-center flex-column align-items-center">
                <span className="h5"> Scale</span>
                <Button
                  colorScheme="teal"
                  className="btn-outlne-indigo-pill-transprint"
                  variant={"outline"}
                >
                  Choose Plan
                </Button>
              </div>
            </td>
            <td
              className="border  px-5 py-4 border-top-0 border-bottom-0"
              style={{
                width: "10%",
              }}
            >
              <div className="d-flex justify-content-center flex-column align-items-center">
                <span className="h5"> Enterprise</span>
                <Button
                  colorScheme="teal"
                  className="btn-outlne-indigo-pill-transprint"
                  variant={"outline"}
                >
                  Choose Plan
                </Button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      {/*  accordian*/}
      {data.map((key, index) => {
        return (
          <>
            <div
              key={index}
              className="d-flex justify-content-between align-items-center p-2 my-2 mx-0"
              style={{
                background: "#182949",
                margin: "1em",
                fontWeight: "bold",
              }}
            >
              <span>{key?.label}</span>
              <a
                type="text"
                className="p-1"
                onClick={() => {
                  handleShowAccordian(key);
                }}
              >
                <IoIosAddCircleOutline size="30px" />
              </a>
            </div>
            {key?.label === ShowAccordian && (
              <table>
                <tbody>
                  <tr>
                    <td
                      className=""
                      style={{
                        width: "15%",
                      }}
                    >
                      <div className="d-flex justify-content-between align-items-center m-1 p-1">
                        <span>
                          Aadhaar eSign - OTP, Biometric, IRIS and Face
                        </span>
                        <CiCircleInfo size={"20px"} className="m-1" />
                      </div>
                    </td>
                    {key?.type.map((type, index) => {
                      return (
                        <td
                          key={index}
                          className="border m-1  px-5 py-4 border-top-0 border-bottom-0"
                          style={{
                            width: "10%",
                          }}
                        >
                          <div className="d-flex justify-content-center">
                            {type === "true" ? (
                              <img src={check} alt="check" style={{
                                backgroundColor: "white",
                              }} />
                            ) : type === "false" ? (
                              <div />
                            ) : (
                              <>{type}</>
                            )}
                          </div>
                        </td>
                      );
                    })}
                  </tr>
                </tbody>
              </table>
            )}
          </>
        );
      })}
    </div>
  );
};

export default pricingAccordian;
