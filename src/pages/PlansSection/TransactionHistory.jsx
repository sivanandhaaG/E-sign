import React from "react";
import { Card, Table } from "react-bootstrap";

const TransactionHistory = ({ history }) => {
  return (
    <Card className="p-4 shadow-sm border-0">
      <h5 className="fw-bold">Transaction History</h5>
      <Table striped bordered hover className="mt-3">
        <thead>
          <tr>
            <th>Transaction ID</th>
            <th>Type</th>
            <th>Amount (INR)</th>
            <th>Package</th>
            <th>Status</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(history?.transactionHistory) &&
          history?.transactionHistory?.length > 0 ? (
            history?.transactionHistory.map((trans, index) => (
              <tr key={index}>
                <td>{trans?.transactionId}</td>
                <td>{trans?.type}</td>
                <td>{trans?.amount}</td>
                <td>{trans?.package}</td>
                <td>{trans?.status}</td>
                <td>{new Date(trans?.date).toLocaleDateString()}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No Data Found!!
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </Card>
  );
};

export default TransactionHistory;
