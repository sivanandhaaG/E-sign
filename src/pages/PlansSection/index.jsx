import React, { useEffect, useState } from "react";
import PlanSummary from "./PlanSummary";
import { TransactionAndPlan } from "../../app/api/userApi";
import TransactionHistory from "./TransactionHistory";

const index = () => {
  const [transactions, setTransactions] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (user?.email) {
      getTransactionDetails(user.email);
    }
  }, []);

  const getTransactionDetails = async (email) => {
    try {
      const response = await TransactionAndPlan(email);
      setTransactions(response.data.data);
      console.log(response.data.data);
    } catch (error) {
      console.error("Error fetching transaction details:", error);
    }
  };

  return (
    <div>
      <PlanSummary plans={transactions} />
      {/* <UpgradePlan /> */}
      <TransactionHistory history={transactions} />
    </div>
  );
};

export default index;
