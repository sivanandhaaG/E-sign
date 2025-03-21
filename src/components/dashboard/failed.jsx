import { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Form,
  InputGroup,
  Card,
  Table,
} from "react-bootstrap";

// Images
import DeleteGrayIcon from "../../assets/images/general/deletegray.png";
import EditGrayIcon from "../../assets/images/general/editgray.png";
import PlusIcon2 from "../../assets/images/general/plus2.png";
import FilterIcon from "../../assets/images/general/filter.png";

const data1 = [
  {
    id: 1,
    remark: "Rental Agreement",
    status: "Signed",
    date: "Jan 6, 2022 16:50:13",
  },
  {
    id: 2,
    remark: "Rental Agreement",
    status: "Expired",
    date: "Jan 6, 2022 16:50:13",
  },
  {
    id: 3,
    remark: "Rental Agreement",
    status: "Signed",
    date: "Jan 6, 2022 16:50:13",
  },
  {
    id: 4,
    remark: "Loan Application",
    status: "Not Yet Signed",
    date: "Jan 6, 2022 16:50:13",
  },
  {
    id: 5,
    remark: "Rental Agreement",
    status: "Signed",
    date: "Jan 6, 2022 16:50:13",
  },
  {
    id: 6,
    remark: "Rental Agreement",
    status: "Expired",
    date: "Jan 6, 2022 16:50:13",
  },
  {
    id: 7,
    remark: "Loan Application",
    status: "Not Yet Signed",
    date: "Jan 6, 2022 16:50:13",
  },
  {
    id: 8,
    remark: "Rental Agreement",
    status: "Not Yet Signed",
    date: "Jan 6, 2022 16:50:13",
  },
  {
    id: 9,
    remark: "Rental Agreement",
    status: "Signed",
    date: "Jan 6, 2022 16:50:13",
  },
  {
    id: 10,
    remark: "Loan Application",
    status: "Signed",
    date: "Jan 6, 2022 16:50:13",
  },
  {
    id: 11,
    remark: "Rental Agreement",
    status: "Signed",
    date: "Jan 6, 2022 16:50:13",
  },
  {
    id: 12,
    remark: "Rental Agreement",
    status: "Expired",
    date: "Jan 6, 2022 16:50:13",
  },
  {
    id: 13,
    remark: "Loan Application",
    status: "Not Yet Signed",
    date: "Jan 6, 2022 16:50:13",
  },
  {
    id: 14,
    remark: "Rental Agreement",
    status: "Expired",
    date: "Jan 6, 2022 16:50:13",
  },
  {
    id: 15,
    remark: "Rental Agreement",
    status: "Signed",
    date: "Jan 6, 2022 16:50:13",
  },
  {
    id: 16,
    remark: "Rental Agreement",
    status: "Expired",
    date: "Jan 6, 2022 16:50:13",
  },
  {
    id: 17,
    remark: "Loan Application",
    status: "Signed",
    date: "Jan 6, 2022 16:50:13",
  },
  {
    id: 18,
    remark: "Rental Agreement",
    status: "Not Yet Signed",
    date: "Jan 6, 2022 16:50:13",
  },
  {
    id: 19,
    remark: "Rental Agreement",
    status: "Signed",
    date: "Jan 6, 2022 16:50:13",
  },
  {
    id: 20,
    remark: "Rental Agreement",
    status: "Signed",
    date: "Jan 6, 2022 16:50:13",
  },
  {
    id: 21,
    remark: "Rental Agreement",
    status: "Not Yet Signed",
    date: "Jan 6, 2022 16:50:13",
  },
  {
    id: 22,
    remark: "Loan Application",
    status: "Expired",
    date: "Jan 6, 2022 16:50:13",
  },
  {
    id: 23,
    remark: "Rental Agreement",
    status: "Signed",
    date: "Jan 6, 2022 16:50:13",
  },
  {
    id: 24,
    remark: "Rental Agreement",
    status: "Expired",
    date: "Jan 6, 2022 16:50:13",
  },
  {
    id: 25,
    remark: "Rental Agreement",
    status: "Signed",
    date: "Jan 6, 2022 16:50:13",
  },
  {
    id: 26,
    remark: "Loan Application",
    status: "Expired",
    date: "Jan 6, 2022 16:50:13",
  },
  {
    id: 27,
    remark: "Rental Agreement",
    status: "Signed",
    date: "Jan 6, 2022 16:50:13",
  },
  {
    id: 28,
    remark: "Rental Agreement",
    status: "Not Yet Signed",
    date: "Jan 6, 2022 16:50:13",
  },
];

const itemsPerPage = 10;

const Failed = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const data = data1;

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

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;

  const currentData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(data.length / itemsPerPage);

  return (
    <Container fluid className="mt-5">
      <Row className="mb-md-0 mb-1">
        <Col md={6} sm={12}>
          <p className="dashboard-p-title mb-0"> Failed </p>
          <p className="personal-email-name"> Failed Documents </p>
        </Col>
      </Row>
      <Row className="px-2">
        <hr style={{ color: "#E2E8F0", height: "1px" }} />
      </Row>
      <Row>
        <Col md={6} sm={12} className="mb-md-0 mb-2">
          <div class="btn-group" role="group" aria-label="Basic example">
            <Button size="md" className="btn-bg-white my-1">
              {" "}
              Individual{" "}
            </Button>
            <Button size="md" className="btn-bg-white my-1">
              {" "}
              Organization{" "}
            </Button>
            <Button size="md" className="btn-bg-white my-1">
              {" "}
              Custom{" "}
            </Button>
            <Button size="md" className="btn-bg-white my-1">
              {" "}
              +{" "}
            </Button>
          </div>
        </Col>
        <Col md={4} sm={12} className="mb-md-0 mt-1">
          <InputGroup size="sm" className="">
            <Form.Control
              type="date"
              className="input-text"
              placeholder="Start Date"
            />
            <Form.Control
              type="date"
              className="input-text"
              placeholder="End Date"
            />
          </InputGroup>
        </Col>
        <Col md={2} sm={12} className="text-end mt-md-0 mt-2">
          <Button size="md" className="btn-bg-white mx-1">
            {" "}
            <img style={{ width: 14 }} src={FilterIcon} alt="" /> Filters{" "}
          </Button>
        </Col>
      </Row>
      <Row className="mt-3">
        <Col sm={12} md={12}>
          <Row className="">
            <Col md={12} className="mt-3">
              <div className="border border-2" style={{ borderRadius: 5 }}>
                <Table className="" bordered hover responsive>
                  <thead className="dash-table-header">
                    <tr>
                      <th style={{ width: "40%" }}>Remarks</th>
                      <th style={{ width: "20%" }}> Status </th>
                      <th style={{ width: "20%" }}>Date</th>
                      <th className="text-center" style={{ width: "20%" }}>
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody style={{ height: 370 }}>
                    {currentData.map((item) => (
                      <tr key={item.id} className="dash-table-body">
                        <td style={{ width: "40%" }}>{item.remark}</td>
                        <td
                          style={{ width: "20%" }}
                          className="page-subtitle-content"
                        >
                          <span
                            className={
                              item.status === "Signed"
                                ? "signed-css"
                                : item.status === "Expired"
                                ? "expired-css"
                                : item.status === "Not Yet Signed"
                                ? "not-signed-css"
                                : ""
                            }
                          >
                            {" "}
                            {item.status}{" "}
                          </span>
                        </td>
                        <td
                          style={{ width: "20%" }}
                          className="page-subtitle-content"
                        >
                          {item.date}
                        </td>
                        <td className="text-center" style={{ width: "20%" }}>
                          <span className="page-subtitle-content">
                            {" "}
                            Delete{" "}
                          </span>
                          <span className="page-subtitle-content"> Edit </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                <Row>
                  <Col xs={6}>
                    <p className="page-subtitle-content mx-2 mt-1">
                      {" "}
                      Page <b>{currentPage}</b> of <b> {totalPages} </b>
                    </p>
                  </Col>
                  <Col xs={6}>
                    <div className="d-flex justify-content-end align-items-center px-3 mb-3">
                      <Button
                        className="btn-bg-white mx-1"
                        onClick={prevPage}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      <Button
                        className="btn-bg-white mx-1"
                        onClick={nextPage}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Failed;
