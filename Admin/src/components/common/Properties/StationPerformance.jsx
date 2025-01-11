import React from "react";
import { Link } from "react-router-dom";
import ReactEcharts from "echarts-for-react";

const StationPerformance = ({ performanceData }) => {
  return (
    <div>
      <div className="flex items-center justify-between pb-6">
        <h2 className="text-[1.25vw] font-semibold">{performanceData.title}</h2>
        <Link
          to=""
          className="text-[#8CC63F] text-[0.625vw] font-medium underline"
        >
          {performanceData.link}
        </Link>
      </div>

      <div className="grid grid-cols-2 gap-7">
        {performanceData?.card.map((cards) => (
          <div
            key={cards.id}
            className="border p-[1.25vw] bg-[#F5F6F9] border-none flex w-[12.5vw] "
          >
            {/* w-[14.8125rem] */}
            <div>
              <h4 className="text-[#6B7280] text-[0.625vw] font-semibold">
                {cards.title}
              </h4>
              <h2 className="text-[1.563vw] font-semibold">{cards.price}</h2>
              <p className="text-[0.625vw] font-medium text-[#232D42]">
                {cards.count}
              </p>
            </div>
            <div className="flex items-center">
              <ReactEcharts
                option={{
                  xAxis: {
                    type: "category",
                    data: [],
                    axisLine: { show: false },
                    axisTick: { show: false },
                  },
                  yAxis: {
                    type: "category",
                    data: [],
                    axisLine: { show: false },
                    axisTick: { show: false },
                  },
                  series: [
                    {
                      name: "Email",
                      //   stack: "Ad",
                      data: [
                        10, 2, 15, 10, 2, 15, 10, 2, 15, 10, 2, 15, 10, 2, 15,
                        10,
                      ],
                      type: "bar",
                      barWidth: 3,
                      itemStyle: {
                        borderRadius: [30, 30, 0, 0],
                        color: " #8CC63F",
                      },
                    },
                  ],
                }}
                style={{ width: "4.427vw", height: "3.2vh" }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StationPerformance;
