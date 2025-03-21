import PropTypes from "prop-types";
import "../../ReusableTable/table.css";
import { Card, Form } from "react-bootstrap";
import { Input } from "@chakra-ui/react";
import TableBody from "./TableBody";
import PaginationWrapper from "../../dashboard/dasboardTable/PaginationWrapper";

const Tablecomponet = ({
  tablecolumn,
  tableData,
  prevPage,
  nextPage,
  currentPage,
  totalPages,
  tableName,
  subheading,
}) => {
  return (
    <div>
      <div className="header-container">
        <p>
          Welcome to <span>Zerozilla Infotech Pvt. Ltd.</span>
        </p>
      </div>
      <div className="table-title">
        <h3>{tableName}</h3>
        <p className="personal-email-name">{subheading}</p>
      </div>
      <Card className="table-container">
        <div className="d-flex justify-content-between p-2">
          <div>
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
          </div>
        </div>
        <div className="table-wraper">
          <table>
            <thead>
              <tr className="border p-1">
                <th className="table-column">
                  <span className="headeName">{"SL.No"}</span>
                </th>
                {tablecolumn &&
                  tablecolumn.map((item, index) => (
                    <th key={item?.keyname + index} className="table-column">
                      <div className="d-flex gap-2 align-items-center w-150">
                        <span className="headeName">{item?.header}</span>
                      </div>
                    </th>
                  ))}
                <th className="table-column">
                  <span className="headeName">Action</span>
                </th>
              </tr>
            </thead>
            <TableBody tableData={tableData} tablecolumn={tablecolumn} />
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
  tableName: PropTypes.string,
  subheading: PropTypes.string,
};

export default Tablecomponet;
