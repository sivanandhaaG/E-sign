import moment from "moment/moment";
import PropTypes from "prop-types";
import { Button } from "react-bootstrap";
import { Tooltip } from "@chakra-ui/react";
import { FaFilePdf } from "react-icons/fa";
import { Menu, MenuButton, MenuList, MenuItem, IconButton } from "@chakra-ui/react";
import { FiMoreVertical } from "react-icons/fi";
const TableBody = ({ tableData, setActiveDocument, activitieRow,currentPage,rowsPerPage }) => {
  const showStatus = (status) => {
    if (status === "COMPLETED") {
      return "Signed";
    } else if (status === "Expired") {
      return "Expired";
    } else if (status === "PENDING") {
      return "Not Yet Signed";
    }
  };
  return (
    <tbody>
      {tableData?.length > 0 ? (
      tableData?.map((data, index) => {
        const emails = data.receivers?.map(receiver => receiver.email) || [];
        const displayEmails = emails.slice(0, 1); 
        const remainingCount = emails.length - 1; 

        return (
          <tr
            key={data?.id}
            className={`table-column ${
              activitieRow?._id === data?._id && "active-column"
            }`}
            onClick={() => {
              setActiveDocument(data);
            }}
            id="DashboardTableRow"
          >
            <td>
            <span className="column-text">{(currentPage - 1) * rowsPerPage + index + 1}</span>
            </td>
            <td style={{textAlign:"center"}}>
              <span className="column-text">
                {data?.documentDetails?.documentName}
              </span>
            </td>
            <td style={{textAlign:"center"}}>
              <span className="column-text">
                {data?.documentDetails?.documentReferenceNumber}
              </span>
            </td>
            <td style={{textAlign:"center"}}>
              <span className="column-text">{data?.receivers?.length} </span>
            </td>
            <td style={{textAlign:"center"}}>
              <span className="column-text">{data?.receivers?.length} </span>
            </td>
            <td style={{textAlign:"center"}}>
              <span className="column-text">
                {data.receivers?.map((receiver, index) => {
                  return <p key={index} style={{textAlign:"center"}}> {receiver?.name},</p>;
                })}
              </span>
            </td>
            <td style={{ textAlign: "center"}}>
              <span className="column-text">
                {displayEmails.map((email, i) => (
                  <span key={i} style={{ display: "block", textAlign: "center", marginBottom: "5px"}}>{email}</span>
                ))}

                {remainingCount > 0 && (
                  <Tooltip 
                  hasArrow
                  aria-label="Email List"
                  placement="top"
                  bg="gray.600"
                  color="white"
                  p={2}
                  borderRadius="5px"
                  label={
                    <div style={{ textAlign: "left" }}>
                      {emails.map((email, i) => (
                        <div key={i}>{email}</div> 
                      ))}
                    </div>
                  }
                >
                    <span style={{ color: "blue", cursor: "pointer" }}>
                      +{remainingCount} more
                    </span>
                  </Tooltip>
                )}
              </span>
            </td>
            <td style={{ textAlign: "center", verticalAlign: "middle" }}>
              {data?.documentDetails?.fileUrl ? (
                <a
                  href={data.documentDetails.fileUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: "red", fontSize: "20px", display: "flex", justifyContent: "center", alignItems: "center" }}
                >
                  <FaFilePdf />
                </a>
              ) : (
                <span style={{ color: "gray" }}>No PDF</span>
              )}
            </td>

            <td style={{ textAlign: "center", verticalAlign: "middle" }}>
  <p
    className={
      data?.status === "COMPLETED"
        ? "signed-css"
        : data.status === "Expired"
        ? "expired-css"
        : data.status === "PENDING"
        ? "not-signed-css"
        : ""
    }
    style={{
      textAlign: "center",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100%", 
    }}
  >
    {showStatus(data?.status)}
  </p>
</td>

            <td style={{textAlign:"center"}}>
              <span className="column-text">
              {moment(data?.updatedAt).format("Do MMM YYYY, hh:mm a")}
              </span>
            </td>


            <td style={{ textAlign: "center", verticalAlign: "middle" }}>
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<FiMoreVertical />}
                  variant="ghost"
                  _hover={{ bg: "gray.100" }}
                  _active={{ bg: "gray.200" }}
                />
                <MenuList>
                  <MenuItem onClick={() => console.log("View Clicked")}>View</MenuItem>
                  <MenuItem onClick={() => console.log("Resend Clicked")}>Resend</MenuItem>
                  <MenuItem onClick={() => console.log("Archive Clicked")}>Archive</MenuItem>
                </MenuList>
              </Menu>
            </td>

            {/* <td style={{textAlign:"center"}}>
              <Button variant="primary" size="sm">
                Resend
              </Button>
            </td> */}
          </tr>
        );
      })
    ):(
      <tr>
      <td colSpan={10} style={{ textAlign: "center", padding: "20px", fontSize: "16px", fontWeight: "bold", color: "gray" }}>
        No data found
      </td>
    </tr>
    )}
    </tbody>
  );
};

TableBody.propTypes = {
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  tablecolumn: PropTypes.arrayOf(PropTypes.object).isRequired,
  setActiveDocument: PropTypes.func,
  activitieRow: PropTypes.func,
};
export default TableBody;
