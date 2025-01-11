import React, { useState } from "react";
import SelectDropdown from "../../../components/common/SelectDropdown";
import { Link } from "react-router-dom";
import "./ReportsForm.css";
import Button from "../../../components/common/Button";

const ReportsForm = () => {
  const [selectedDateRange, setSelectedDateRange] = useState(false);
  const reportsList = [
    {
      id: 1,
      label: "Create",
      placeholder: "Select Report",
      dropdown: [
        {
          id: 1,
          category: "Charging Point Transactions Report",
        },
        { id: 2, category: "Customer Report" },
      ],
    },
    {
      id: 2,
      label: "Date Range",
      placeholder: "Select Date Range",
      dropdown: [
        {
          id: 1,
          category: "Today",
        },
        { id: 2, category: "Yesterday" },
        { id: 3, category: "Current Week" },
        { id: 4, category: "Current Month" },
        { id: 5, category: "Current Quarter" },
        { id: 6, category: "Current Year" },
        { id: 7, category: "Custom Date" },
      ],
    },
  ];

  const dateFields = [
    {
      id: 1,
      label: "Host",
      placeholder: "All",
      dropdown: [
        {
          id: 1,
          category: "Today",
        },
        { id: 2, category: "Yesterday" },
        { id: 3, category: "Current Week" },
        { id: 4, category: "Current Month" },
        { id: 5, category: "Current Quarter" },
        { id: 6, category: "Current Year" },
        { id: 7, category: "Custom Date" },
      ],
    },
  ];

  const dataFields = [
    {
      id: 1,
      label: "Property",
      placeholder: "All",
      dropdown: [
        {
          id: 1,
          category: "Today",
        },
        { id: 2, category: "Yesterday" },
        { id: 3, category: "Current Week" },
        { id: 4, category: "Current Month" },
        { id: 5, category: "Current Quarter" },
        { id: 6, category: "Current Year" },
        { id: 7, category: "Custom Date" },
      ],
    },
    {
      id: 2,
      label: "Charger",
      placeholder: "All",
      dropdown: [
        {
          id: 1,
          category: "Today",
        },
        { id: 2, category: "Yesterday" },
        { id: 3, category: "Current Week" },
        { id: 4, category: "Current Month" },
        { id: 5, category: "Current Quarter" },
        { id: 6, category: "Current Year" },
        { id: 7, category: "Custom Date" },
      ],
    },
  ];

  const emailAddress = "client@heliosevc.in";

  return (
    <div className="flex flex-col gap-6 px-6">
      {reportsList?.map((report) => (
        <div className="w-[25%] flex flex-col gap-3" key={report?.id}>
          <label className="text-[#111827] text-[0.729vw] font-semibold">
            {report.label}
            <span className=" text-red-500">*</span>
          </label>
          <SelectDropdown
            inputPlaceholder={report.placeholder}
            reports={report.dropdown}
            onSelect={(selectedReport) => {
              if (
                selectedReport.category === "Charging Point Transactions Report"
              ) {
                setSelectedDateRange(selectedReport);
              } else {
                setSelectedDateRange(null);
              }
            }}
          />
        </div>
      ))}

      {selectedDateRange && (
        <div>
          <div className="mb-5">
            {dateFields?.map((date) => (
              <div className="w-[25%] flex flex-col gap-3" key={date?.id}>
                <label className="text-[#111827] text-[0.729vw] font-semibold">
                  {date.label}
                  <span className=" text-red-500">*</span>
                </label>
                <SelectDropdown
                  inputPlaceholder={date.placeholder}
                  reports={date.dropdown}
                />
              </div>
            ))}
          </div>
          <div className="flex gap-6">
            {dataFields?.map((date) => (
              <div className="w-[25%] flex flex-col gap-3" key={date?.id}>
                <label className="text-[#111827] text-[0.729vw] font-semibold">
                  {date.label}
                  <span className=" text-red-500">*</span>
                </label>
                <SelectDropdown
                  inputPlaceholder={date.placeholder}
                  reports={date.dropdown}
                />
              </div>
            ))}
          </div>
        </div>
      )}

      <div>
        <label class="checkBoxContainer1 flex items-center mb-5">
          <input type="checkbox" name="checkbox" />
          <p className="text-[#6B7280] text-[0.729vw] pl-2">
            Email Report to
            <Link
              to={`mailto:${emailAddress}`}
              className="font-bold tracking-wide pl-1"
            >
              {emailAddress}
            </Link>
          </p>
        </label>

        <Button
          backgroundColor="#8CC63F"
          content="Download Report"
          type="submit"
          color="white"
          font="0.729vw"
          padding="0.521vw"
          radius="8px"
        />
      </div>
    </div>
  );
};

export default ReportsForm;
