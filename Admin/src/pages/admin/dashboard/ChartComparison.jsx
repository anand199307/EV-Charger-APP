import React from "react";
import ReactEcharts from "echarts-for-react";
import walletIcon from "../../../assets/Dashboard/Wallet.svg";
import BagIcon from "../../../assets/Dashboard/Bag.svg";
import Button from "../../../components/common/Button";

const ChartComparison = () => {
  const option = {
    tooltip: {
      trigger: "axis",
      axisPointer: {
        type: "shadow",
      },
    },
    legend: false,
    grid: {
      left: "3%",
      right: "4%",
      bottom: "3%",
      containLabel: true,
    },
    xAxis: [
      {
        type: "category",
        data: ["S", "M", "T", "W", "T", "F", "S"],
      },
    ],
    yAxis: [
      {
        type: "value",
      },
    ],
    series: [
      {
        name: "Email",
        type: "bar",
        stack: "Ad",
        data: [35, 60, 50, 60, 50, 90, 50],
        emphasis: {
          focus: "series",
        },
        itemStyle: {
          color: " #8CC63F",
        },
      },
      {
        name: "Video Ads",
        type: "bar",
        stack: "Ad",
        emphasis: {
          focus: "series",
        },
        barWidth: 16,
        itemStyle: {
          borderRadius: [30, 30, 0, 0],
          color: "#3A57E8",
        },
        data: [30, 50, 40, 60, 40, 80, 40],
      },
    ],
  };

  const iconImg = [
    { pic: BagIcon, count: "110", sentence: "Total Charges" },
    { pic: walletIcon, count: "81k", sentence: "Total Charges" },
  ];

  return (
    <div className="border w-[35vw]  h-auto shadow-md rounded-[0.75rem] p-[0.833vw] flex flex-col gap-[30px]">
      <div className="flex justify-between">
        <h1 className="text-[1.458vw] text-[#232D42]">Comparison</h1>
        <div className="flex gap-[10px]">
          <select className="bg-white outline-none text-[0.833vw] text-[#8A92A6]">
            <option value="this week">This Week</option>
            <option value="thismonth">This Month</option>
            <option value="overall">Overall</option>
          </select>
        </div>
      </div>
      <ReactEcharts className="cursor-pointer" option={option}></ReactEcharts>
      <div className="flex gap-[50px] pl-6">
        {iconImg.map((imgicon) => (
          <div key={imgicon.id} className="flex justify-around gap-[10px]">
            <div>
              <img className="w-[1.667vw] h-[2rem]" src={imgicon.pic} alt="" />
            </div>
            <div>
              <div>
                <p className="text-[#8A92A6] text-[0.677vw]">{imgicon.count}</p>

                <h4 className="text-[#8A92A6] text-[0.677vw]">
                  {imgicon.sentence}
                </h4>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex justify-between pl-6">
        <div className="flex flex-col gap-[1.042vw]">
          <h4 className="text-[#232D42] text-[1.458vw] ">1200000</h4>
          <h5 className="text-[1rem] text-[#C03221]">Life time sales</h5>
        </div>
        <button className=" w-[4.479vw] h-[1.302vw] rounded-[1.823vw] bg-[#1AA053] text-[#FFF] text-[0.677vw]">
          YoY 24%
        </button>
      </div>
      <div className="flex justify-around">
        <Button
          backgroundColor="#3A57E8"
          content="Chargers"
          width="9.271vw"
          fontSize="0.833vw"
          height="36px"
        />
        <Button
          backgroundColor="#8CC63F"
          content="Total Revenue"
          width="9.271vw"
          fontSize="0.833vw"
          height="36px"
        />
      </div>
    </div>
  );
};

export default ChartComparison;
