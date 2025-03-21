import PropTypes from "prop-types";
import "../../../../components/ReusableTable/table.css";
import { Card, Form } from "react-bootstrap";
import { Input } from "@chakra-ui/react";
import TableBody from "./TableBody";
import PaginationWrapper from "../../../../components/dashboard/dasboardTable/PaginationWrapper";
import Spinner from "react-bootstrap/Spinner";
import { useState, useEffect } from "react";

const Tablecomponet = ({
  tableData,
  edituser,
  deleteUserHandler,
  addAction,
  tablecolumn,
  tableName,
  subheading,
  prevPage,
  nextPage,
  currentPage,
  totalPages,
  user,
}) => {
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
  return (
    <div>
      <div className="header-container">
        <p>
          Welcome to <span>Zerozilla Infotech Pvt. Ltd.</span>
        </p>
      </div>
      <div className="table-title">
        <h3>{tableName}</h3>
        {/* <p className="personal-email-name">{subheading}</p> */}
      </div>
      <Card className="table-container">
        <div className="d-flex justify-content-between p-2">
          <div style={{ marginLeft: "20px" }}>
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
          </div>
          <div className="d-flex gap-2">
            <div>
              <Input placeholder="Search" />
            </div>
            {addAction}
          </div>
        </div>
        <div className="table-wraper">
          <table style={{ width: "100%" }}>
            <thead>
              <tr className="tHead border p-1" style={{ width: "20%" }}>
                <th
                  className=" table-column"
                  style={{
                    width: "7%",
                    textAlign: "center",
                  }}
                >
                  <span
                    className="headeName"
                    style={{ marginBottom: "10px", fontSize: "12px" }}
                  >
                    {"SL.No"}
                  </span>
                </th>
                {tablecolumn &&
                  tablecolumn.map((item, index) => (
                    <th
                      key={item?.keyname + index}
                      className="table-column"
                      style={{ width: "20.5%", paddingLeft: "20px" }}
                    >
                      <div className="d-flex gap-2 align-items-center">
                        <span
                          className="headeName"
                          style={{ fontSize: "12px" }}
                        >
                          {item?.header}
                        </span>
                      </div>
                    </th>
                  ))}
                <th
                  className="table-column"
                  style={{ width: "25%", paddingLeft: "20px" }}
                >
                  <span className="headeName" style={{ fontSize: "12px" }}>
                    Action
                  </span>
                </th>
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
                tableData={tableData}
                tablecolumn={tablecolumn}
                deleteUserHandler={deleteUserHandler}
                edituser={edituser}
                user={user}
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
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  tablecolumn: PropTypes.arrayOf(PropTypes.object).isRequired,
  edituser: PropTypes.func,
  deleteUserHandler: PropTypes.func,
  tableName: PropTypes.string,
  subheading: PropTypes.string,
  addAction: PropTypes.func,
  nextPage: PropTypes.func,
  prevPage: PropTypes.func,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
};
export default Tablecomponet;
