import React, { useState } from "react";
import { Table, Switch } from "antd";
import { createStyles } from "antd-style";
import { Button, Col, Spinner } from "react-bootstrap";
import { GiTakeMyMoney } from "react-icons/gi";
import { useDisclosure } from "@chakra-ui/react";
import { Link } from "react-router-dom";
import PlusIcon from "../../../assets/images/general/plus.png";
import RazorpayModal from "../RazorPay/RazorpayModal";
import "./antDesignTable.css";
import Loader from "../Loader/Loader";

const AntTable = ({
  columns,
  dataSource,
  title,
  loading,
  limitReached,
  addNewUser,
}) => {
  const [billingCycle, setBillingCycle] = useState("monthly");
  const { isOpen, onOpen, onClose } = useDisclosure();
  const role = JSON.parse(localStorage.getItem("user")).role;
  const paymentType = JSON.parse(localStorage.getItem("user")).paymentType;
  return (
    <div className="ant-table-div" style={{ width: "100%" }}>
      <div className="common-table-top">
        <h3>{title}</h3>
        {title === "All Documents" && (
          <Col className="text-end">
            {limitReached === true ? (
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
        {addNewUser ? addNewUser : ""}
      </div>

      <div style={{ paddingTop: "10px", width: "100%" }}>
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
            {/* <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner> */}
            <Loader/>
          </div>
        ) : (
          <Table
            bordered
            className="custom-table"
            columns={columns}
            dataSource={dataSource}
            scroll={{ x: 1500, y: 500 }}
            sticky={{ offsetHeader: 64 }}
          />
        )}
      </div>
      <RazorpayModal
        isOpen={isOpen}
        onClose={onClose}
        billingCycle={billingCycle}
        setBillingCycle={setBillingCycle}
        role={role}
        type={paymentType}
      />
    </div>
  );
};

export default AntTable;
