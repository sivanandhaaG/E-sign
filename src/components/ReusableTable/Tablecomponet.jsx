import PropTypes from "prop-types";
import "./table.css";
import { Button, Card, Col, Form } from "react-bootstrap";
import { Input, useDisclosure, useQuery } from "@chakra-ui/react";
import Chevrondown from "../../assets/images/users/chevron-down1.svg";
import ChevronUp from "../../assets/images/users/ChevronUp.svg";
import TableBody from "./TableBody";
import PaginationWrapper from "../dashboard//dasboardTable/PaginationWrapper";
import { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import { Link } from "react-router-dom";
import PlusIcon from "../../assets/images/general/plus.png";
import RazorpayModal from "../common/RazorPay/RazorpayModal";
import { getAllEsignRequest } from "../../app/api/userApi";
import { GiTakeMyMoney } from "react-icons/gi";

const Tablecomponet = ({
  tablecolumn,
  tableName,
  addAction,
  tableData,
  prevPage,
  nextPage,
  currentPage,
  totalPages,
  setActiveDocument,
  activitieRow,
  data,
  addRecipient,
  download,
  AddToFolder,
  addToFolder,
}) => {
  const {
    data: eSignRequests,
    isLoading,
    isError,
    error,
  } = useQuery("eSignRequests", async () => await getAllEsignRequest(), {
    staleTime: 1000 * 60 * 5,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [billingCycle, setBillingCycle] = useState("monthly");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const role = JSON.parse(localStorage.getItem("user")).role;
  const datas = eSignRequests?.data;

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
    ? (data || []).filter((row) => {
        const documentName =
          row.documentDetails?.documentName?.toLowerCase() ||
          row.documentName?.toLowerCase() ||
          "";

        const referenceNumber =
          row.documentDetails?.documentReferenceNumber?.toLowerCase() ||
          row.documentReferenceNumber?.toLowerCase() ||
          "";

        return (
          documentName.includes(searchQuery.toLowerCase()) ||
          referenceNumber.includes(searchQuery.toLowerCase())
        );
      })
    : tableData || [];

  console.log(filteredData, "filteredData", tableData);

  return (
    <div>
      {/* <div className="header-container">
        <p>
          Welcome to <span>Zerozilla Infotech Pvt. Ltd.</span>
        </p>
      </div> */}
      <div className="table-title">
        <h3>{tableName}</h3>
        {/* <p className="personal-email-name">{subheading}</p> */}
      </div>
      <div className=" my-4">
        <div className="d-flex justify-content-between">
          {/* <div style={{marginLeft:"20px"}}>
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
          <div className="d-flex gap-2">
            <div>
              <Input
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />{" "}
            </div>
            {addAction}
          </div>
          {tableName === "All Documents" && (
            <Col className="text-end" style={{ border: "1x solid black" }}>
              {tableData?.[0]?.limitReached === true ? (
                <Button
                  size="md"
                  className="btn-bg-indigo mx-1 my-1"
                  onClick={onOpen}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      gap: "5px",
                    }}
                  >
                    <GiTakeMyMoney /> Upgrade Plan
                  </div>
                </Button>
              ) : (
                <Link to="/sender">
                  <Button size="md" className="btn-bg-indigo mx-1 my-1 ">
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img style={{ width: 14 }} src={PlusIcon} alt="" /> New
                      Document
                    </div>
                  </Button>
                </Link>
              )}
            </Col>
          )}
        </div>
        <div
          className="table-wraper my-4"
          // style={{ padding: "0px 30px 0px 30px" }}
        >
          <table style={{ width: "100%" }}>
            <thead>
              <tr className="tHead border p-1" style={{ fontSize: "5px" }}>
                {/* <th className="table-column ">
                  <span className="headeName" style={{ fontSize: "11px" }}>
                    {"SL.No"}
                  </span>
                </th> */}
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
                <th className="table-column">
                  <span className="headeName" style={{ fontSize: "11px" }}>
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
                tableData={filteredData}
                tablecolumn={tablecolumn}
                setActiveDocument={setActiveDocument}
                activitieRow={activitieRow}
                currentPage={currentPage}
                rowsPerPage={4}
                addRecipient={addRecipient}
                download={download}
                AddToFolder={AddToFolder}
                addToFolder={addToFolder}
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
      </div>
      <RazorpayModal
        isOpen={isOpen}
        onClose={onClose}
        billingCycle={billingCycle}
        setBillingCycle={setBillingCycle}
        role={role}
      />
    </div>
  );
};

Tablecomponet.propTypes = {
  tablecolumn: PropTypes.arrayOf(
    PropTypes.shape({
      keyname: PropTypes.string.isRequired,
    })
  ).isRequired,
  tableName: PropTypes.string,
  addAction: PropTypes.func,
  tableData: PropTypes.arrayOf(PropTypes.object).isRequired,
  initialRowsPerPage: PropTypes.number,
  nextPage: PropTypes.func,
  prevPage: PropTypes.func,
  currentPage: PropTypes.number,
  totalPages: PropTypes.number,
  subheading: PropTypes.string,
};

export default Tablecomponet;
