import { useEffect, useState } from "react";
import { Container, Row, Col, Button, Card, Table } from "react-bootstrap";

// Images
import PlusIcon from "../../assets/images/general/plus.png";
import DropDownIcon from "../../assets/images/general/dropdown.png";
import Avatar from "../../assets/images/general/Avatar.png";
import noActivity from "../../assets/images/general/no-activity.jpg";
import ActiveDot from "../../assets/images/general/activedot.png";
import { useMutation, useQuery } from "react-query";
import { getAllEsignRequest, resendESignRequest } from "../../app/api/userApi";
import {
  Box,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useDisclosure,
} from "@chakra-ui/react";
import moment from "moment/moment";
import Tablecomponet from "./dasboardTable/Tablecomponet";
// import moment from "moment/moment";
// import moment from "moment/moment";
import { FaRegTrashAlt } from "react-icons/fa";
import { FaRegEdit } from "react-icons/fa";
import toast, { Toaster } from "react-hot-toast";
import { Link } from "react-router-dom";
import { GiTakeMyMoney } from "react-icons/gi";
import { loginWithPassword, forgetverifytoken } from "../../app/api/userApi";
// import RazorpayModal from "../common/RazorPay/RazorpayModal";

const itemsPerPage = 4;

const DashboardContent = () => {
  const {
    data: eSignRequests,
    isLoading,
    isError,
    error,
  } = useQuery("eSignRequests", async () => await getAllEsignRequest(), {
    staleTime: 1000 * 60 * 5,
  });
  const [billingCycle, setBillingCycle] = useState("monthly");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const role = JSON.parse(localStorage.getItem("user")).role;
  console.log(role, "roleeeee");
  useEffect(() => {
    if (localStorage.getItem("showPaymentModal") === "true") {
      localStorage.removeItem("showPaymentModal");
      onOpen();
    }
  }, []);

  const cardData = [
    {
      id: 1,
      title: "Total Invities",
      count: eSignRequests?.data?.eSignRequests?.length,
      moreicon: DropDownIcon,
    },
    { id: 2, title: "e - Sign Completed", count: 13, moreicon: DropDownIcon },
    {
      id: 3,
      title: "Completed Documents",
      count: eSignRequests?.data?.eSignRequests?.filter(
        (item) => item.status === "COMPLETED"
      ).length,
      moreicon: DropDownIcon,
    },
  ];

  const [currentPage, setCurrentPage] = useState(1);
  const [activeDocument, setActiveDocument] = useState([]);
  const data = eSignRequests?.data;
  console.log(data, "dataass");
  const [activitieRow, setActivitieRow] = useState("");
  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const resendHandler = async (id, documentName) => {
    try {
      const res = await resendESignRequest({
        eSignRequestId: id,
        documentName: documentName,
      });
      if (res.status === true) {
        toast.success(res.message);
      } else {
        toast.error(res.message);
      }
    } catch (error) {
      toast.error(
        error?.response?.data?.message || "Error in resending the document"
      );
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = data?.eSignRequests?.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data?.length / itemsPerPage);
  console.log(totalPages);

  const handleActive = (item) => {
    setActiveDocument(item?.activities);
    setActivitieRow(item);
  };
  return (
    <Container fluid>
      <Row className="mb-md-0 mb-1 pt-5">
        <Col md={12} sm={12}>
          <p className="dashboard-p-title mb-0"> Overview </p>
          <p className="personal-email-name">
            {" "}
            Your Current Summary and Activity{" "}
          </p>
        </Col>
        <Col md={12} sm={12} className="text-end">
          {data?.limitReached === true ? (
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
      </Row>
      <Row className="">
        <Col sm={12} md={12}>
          <Row>
            <Col md={12} sm={12} className="mt-3">
              <div className="DashBoardCards">
                {cardData.map((item) => {
                  const { id, title, count, moreicon } = item;
                  return (
                    <Col key={id} className="my-2">
                      <Card className="rounded-2 p-3 dashboard-card">
                        <span>
                          <p>
                            <span className="dashboard-card-title">
                              {" "}
                              {title}{" "}
                            </span>
                          </p>
                          <p className="dashboard-p-title mb-0"> {count} </p>
                        </span>
                      </Card>
                    </Col>
                  );
                })}
              </div>
              <Tablecomponet
                tablecolumn={column}
                tableData={currentData}
                currentPage={currentPage}
                totalPages={totalPages}
                nextPage={nextPage}
                prevPage={prevPage}
                setActiveDocument={handleActive}
                activitieRow={activitieRow}
                data={data}
              />
            </Col>
          </Row>
        </Col>
      </Row>
      {/* <RazorpayModal
        isOpen={isOpen}
        onClose={onClose}
        billingCycle={billingCycle}
        setBillingCycle={setBillingCycle}
        role={role}
      /> */}
    </Container>
  );
};

export default DashboardContent;

const column = [
  {
    header: "Document Name",
    filter: true,
  },
  {
    header: "Reference Number",
    filter: true,
  },
  {
    header: "No. of receivers",
    content: <></>,
    filter: false,
  },
  {
    header: "Pending signature",
    content: <></>,
    filter: false,
  },
  {
    header: "Receivers Name",
    content: <></>,
    filter: false,
  },

  {
    header: "Email id",
    content: <></>,
    filter: false,
  },
  {
    header: "Document Link ",
    content: <></>,
    filter: false,
  },
  { header: "Status", filter: false },
  {
    header: "Date",
    content: <></>,
    filter: false,
  },
  {
    header: "Action",
    content: <></>,
    filter: false,
  },
];
