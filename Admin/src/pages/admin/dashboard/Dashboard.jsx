import React from "react";
import ChartComparison from "./ChartComparison";
import DashboardTable from "./DashboardTable";
import HeroSection from "../../../components/common/HeroSection";
import Header from "../../../components/common/Header";

const Dashboard = () => {
  return (
    <>
      <div>
        <Header />

        <HeroSection />
      </div>
      <div className=" w-[100%] h-auto flex gap-5 p-5 py-[8vw]">
        <DashboardTable />
        <ChartComparison />
      </div>
    </>
  );
};

export default Dashboard;
