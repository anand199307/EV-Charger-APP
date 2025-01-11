import React from "react";
import Header from "../../../components/common/Header";
import ReportsForm from "./ReportsForm";

const Reports = () => {
  return (
    <>
      <div>
        <Header
          title="Reports"
          para="Manage the Reports of your HELIOS App"
          isReport
        />
      </div>
      <div className="mt-8">
        <ReportsForm />
      </div>
    </>
  );
};

export default Reports;
