import PropTypes from "prop-types";
import "./table.css";
import { Card, Form } from "react-bootstrap";
import { Input } from "@chakra-ui/react";
import TableBody from "./TableBody";
import PaginationWrapper from "./PaginationWrapper";
import Spinner from "react-bootstrap/Spinner";
import { useState, useEffect } from "react";

const Tablecomponet = ({
  tablecolumn,
  tableData,
  prevPage,
  nextPage,
  currentPage,
  totalPages,
  setActiveDocument,
  activitieRow,
  data,
}) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLoading = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    handleLoading();
  }, []);

  const filteredData = searchQuery.trim()
    ? (data || []).filter(
        (row) =>
          row.documentDetails?.documentName
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase()) ||
          row.documentDetails?.documentReferenceNumber
            ?.toLowerCase()
            .includes(searchQuery.toLowerCase())
      )
    : tableData || [];

  return (
    <div>
      <Card className="table-container">
        <div className="d-flex justify-content-between p-2">
          {/* <div style={{ marginLeft: "17px" }}>
            <Form.Select
              aria-label="10"
              style={{
                width: "100px",
              }}
            >
              <option value="1">10</option>
              <option value="2">20</option>
              <option value="3">30</option>
            </Form.Select>
          </div> */}
          <div className="d-flex gap-2 mx-3">
            <div>
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
        <div className="table-wraper">
          <table className="mx-4 ">
            <thead>
              <tr className="tHead border p-1 ">
                <th className="table-column">
                  <span className="headeName">{"SL.No"}</span>
                </th>
                {tablecolumn &&
                  tablecolumn.map((item, index) => (
                    <th key={item?.keyname + index} className="table-column">
                      <div className="d-flex gap-2 align-items-center justify-content-center w-150">
                        <span
                          className="headeName"
                          style={{ fontSize: "12px" }}
                        >
                          {item?.header}
                        </span>
                      </div>
                    </th>
                  ))}
                {/* <th className="table-column">
                  <span className="headeName">Action</span>
                </th> */}
              </tr>
            </thead>
            {loading ? (
              <div
                style={{
                  height: "50vh",
                  width: "100vw",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Spinner animation="border" role="status">
                  <span className="visually-hidden">Loading...</span>
                </Spinner>
              </div>
            ) : (
              <TableBody
                tableData={filteredData}
                tablecolumn={tablecolumn}
                setActiveDocument={setActiveDocument}
                activitieRow={activitieRow}
                currentPage={currentPage}
                rowsPerPage={4}
              />
            )}
          </table>
        </div>
        <div className="pagination-wrapper">
          <PaginationWrapper
            currentPage={currentPage}
            totalPages={totalPages}
            prevPage={prevPage}
            nextPage={nextPage}
          />
        </div>
      </Card>
    </div>
  );
};

Tablecomponet.propTypes = {
  tablecolumn: PropTypes.arrayOf(
    PropTypes.shape({
      keyname: PropTypes.string.isRequired,
    })
  ).isRequired,
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  initialRowsPerPage: PropTypes.number,
  nextPage: PropTypes.func,
  prevPage: PropTypes.func,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  setActiveDocument: PropTypes.func,
  activitieRow: PropTypes.func,
};

export default Tablecomponet;
// import PropTypes from "prop-types";
// import { useState, useEffect } from "react"; // Import hooks for managing state
// import "./table.css";
// import { Card, Form } from "react-bootstrap";
// import { Input } from "@chakra-ui/react";
// import TableBody from "./TableBody";
// import PaginationWrapper from "./PaginationWrapper";

// const Tablecomponet = ({
//   tablecolumn,
//   tableData,
//   prevPage,
//   nextPage,
//   currentPage,
//   totalPages,
//   setActiveDocument,
//   activitieRow,
// }) => {
//   const [rowsPerPage, setRowsPerPage] = useState(10); // State for rows per page

//   // Function to handle rows per page change
//   const handleRowsPerPageChange = (event) => {
//     const selectedValue = event.target.value;
//     setRowsPerPage(Number(selectedValue)); // Update rows per page state
//   };

//   // Calculate the start and end indices based on rows per page and current page
//   const startIndex = (currentPage - 1) * rowsPerPage;
//   const endIndex = startIndex + rowsPerPage;
//   const currentPageData = tableData.slice(startIndex, endIndex); // Slice table data based on current page and rows per page

//   useEffect(() => {
//     // Reset to the first page when rows per page changes
//     if (currentPage > Math.ceil(tableData.length / rowsPerPage)) {
//       prevPage();
//     }
//   }, [rowsPerPage, tableData.length, currentPage, prevPage]);

//   return (
//     <div>
//       <Card className="table-container">
//         <div className="d-flex justify-content-between p-2">
//           <div>
//             <Form.Select
//               aria-label="Rows per page"
//               value={rowsPerPage} // Set the value of the select dropdown to the rowsPerPage state
//               onChange={handleRowsPerPageChange} // Handle change in rows per page
//               style={{
//                 width: "100px",
//               }}
//             >
//               <option value="10">10</option>
//               <option value="20">20</option>
//               <option value="30">30</option>
//             </Form.Select>
//           </div>
//           <div className="d-flex gap-2">
//             <div>
//               <Input placeholder="Search" />
//             </div>
//           </div>
//         </div>
//         <div className="table-wraper">
//           <table>
//             <thead>
//               <tr className="border p-1">
//                 <th className="table-column">
//                   <span className="headeName">{"SL.No"}</span>
//                 </th>
//                 {tablecolumn &&
//                   tablecolumn.map((item, index) => (
//                     <th key={item?.keyname + index} className="table-column">
//                       <div className="d-flex gap-2 align-items-center w-150">
//                         <span className="headeName">{item?.header}</span>
//                       </div>
//                     </th>
//                   ))}
//                 <th className="table-column">
//                   <span className="headeName">Action</span>
//                 </th>
//               </tr>
//             </thead>
//             <TableBody
//               tableData={currentPageData} // Pass only the data for the current page
//               tablecolumn={tablecolumn}
//               setActiveDocument={setActiveDocument}
//               activitieRow={activitieRow}
//             />
//           </table>
//         </div>
//         <div className="pagination-wrapper">
//           <PaginationWrapper
//             currentPage={currentPage}
//             totalPages={totalPages}
//             prevPage={prevPage}
//             nextPage={nextPage}
//           />
//         </div>
//       </Card>
//     </div>
//   );
// };

// Tablecomponet.propTypes = {
//   tablecolumn: PropTypes.arrayOf(
//     PropTypes.shape({
//       keyname: PropTypes.string.isRequired,
//     })
//   ).isRequired,
//   tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
//   initialRowsPerPage: PropTypes.number,
//   nextPage: PropTypes.func,
//   prevPage: PropTypes.func,
//   currentPage: PropTypes.number,
//   totalPages: PropTypes.number,
//   setActiveDocument: PropTypes.func,
//   activitieRow: PropTypes.func,
// };

// export default Tablecomponet;
