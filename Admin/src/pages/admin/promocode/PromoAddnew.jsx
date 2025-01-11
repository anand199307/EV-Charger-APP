import React, { useState } from "react";
import InputBox from "../../../components/common/InputBox";
import SelectDropdown from "../../../components/common/SelectDropdown";
import Calender from "../../../assets/calendar.svg";
// import DatePicker from "react-datepicker";
import { DatePicker, Popover } from "antd";

const PromoAddnew = () => {
  const [selectedVisibility, setSelectedVisibility] = useState(null);
  const [selectedPromoUser, setSelectedPromoUser] = useState(null);
  const [selectedFrequency, setSelectedFrequency] = useState(null);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [dropdowns, setDropdowns] = useState([]);

 const addNewGroup = () => {
   const newDropdowns = [
     ...dropdowns,
     <SelectDropdown
       key={Date.now()}
       inputPlaceholder="New Group"
       reports={[]}
       promo
     />,
   ];
   setDropdowns(newDropdowns);
 };

  const visibility = [
    {
      id: 1,
      title: "Free Credits",
      para: "Using this promo code users can redeem free credits in their wallet.",
    },
    {
      id: 2,
      title: "Wallet Recharge",
      para: "Using this promo code users can avail discounts on the wallet recharge.",
    },
  ];

  const promo = [
    {
      id: 1,
      name: "credits",
      label: "Credits Offered",
      placeholder: "Enter Credits Offered",
    },
    {
      id: 2,
      name: "promo",
      label: "Promo Code",
      placeholder: "G67HFHX7H",
    },
    {
      id: 3,
      name: "description",
      label: "Short Description",
      placeholder: "Describe the coupon here",
    },
  ];
  const promoUsers = [
    {
      id: 1,
      title: "Users",
    },
    {
      id: 2,
      title: "Groups",
    },
  ];

  const groups = [
    {
      id: 1,
      placeholder: "Select Name of the Group(s)",
      dropdown: [
        {
          id: 1,
          category: "Roaster",
        },
        { id: 2, category: "Roster2" },
      ],
    },
  ];

  const Frequency = [
    {
      id: 1,
      title: "Apply Once",
    },
    {
      id: 2,
      title: "Multiple Times",
    },
    {
      id: 3,
      title: "Unlimited",
    },
  ];

  const handleVisibilityChange = (id) => {
    setSelectedVisibility(id);
    setSelectedPromoUser(null);
  };

  const handlePromoUserChange = (id) => {
    setSelectedPromoUser(id);
    setSelectedVisibility(null);
  };

  const handleFrquencyChange = (id) => {
    setSelectedFrequency(id);
    setSelectedVisibility(null);
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  // const handleCheckInDateChange = (date) => {
  //   setSelectedCheckInDate(date);
  // };

  return (
    <div className="flex justify-center items-center w-[100%] m-auto min-h-[70vh]">
      <div className="w-[50%]">
        <h2 className="text-[1.25vw] font-semibold py-7">Create Promo Code</h2>
        <div>
          <h2 className="text-[1.05vw] font-semibold pb-7">Promo code for</h2>
          <div className="flex gap-5">
            {visibility.map((data) => (
              <div
                key={data?.id}
                className={`w-full border min-h-[8.4vh] rounded-lg ${
                  selectedVisibility === data.id
                    ? "border-2 border-[#8CC63F]"
                    : "border-[#D1D5DB]"
                }`}
              >
                <div className="flex gap-2 px-[1.042vw] py-[0.833vw]">
                  <input
                    type="radio"
                    checked={selectedVisibility === data.id}
                    onChange={() => handleVisibilityChange(data.id)}
                    className={`radio-input ${
                      selectedVisibility === data.id ? "checked" : ""
                    }`}
                  />
                  <div>
                    <p className="text-[0.729vw] font-semibold">
                      {data?.title}
                    </p>
                    <p className="text-[0.729vw] text-[#6B7280] pt-2">
                      {data?.para}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div>
            <h2 className="text-[1.05vw] font-semibold pb-7 pt-5">
              Basic Details <span className="text-[#F43F5E]">*</span>
            </h2>
            <div className="grid grid-cols-2 gap-x-2 gap-y-[1.667vw]">
              {promo?.map((form) => (
                <div key={form?.id} className="flex flex-col gap-2">
                  <div className="w-[41.7vw] flex justify-between">
                    <label className="text-[0.729vw] text-[#6B7280]">
                      {form.label} <span className="text-[#F43F5E]">*</span>
                    </label>
                    {form?.name === "description" && (
                      <p className="text-[0.625vw] text-[#8A92A6] italic">
                        Max 100 Characters
                      </p>
                    )}
                  </div>
                  {form?.name === "description" ? (
                    <textarea
                      className="resize-none w-[42.188vw] border pl-5 pt-[0.625vw] rounded-lg h-[8.4vh] text-[0.729vw]"
                      placeholder={form?.placeholder}
                    />
                  ) : (
                    <InputBox
                      type="text"
                      name={form?.name}
                      placeholder={form?.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-[1.05vw] font-semibold pb-7 pt-5">
              Limitations
            </h2>
            <div className="flex gap-7">
              <div className="flex flex-col relative top-3">
                <p className="absolute bottom-16 left-5 bg-white text-[0.721vw] text-[#667085] z-50">
                  Start Date
                </p>
                <DatePicker
                  onChange={() => {}}
                  placeholder="dd-mm-yyyy"
                  format="DD-MM-YYYY"
                  className="py-3 cursor-pointer"
                />
              </div>

              <div className="flex flex-col relative top-3">
                <p className="absolute bottom-16 left-5 bg-white text-[0.721vw] text-[#667085] z-50">
                  End Date
                </p>
                <DatePicker
                  onChange={() => {}}
                  placeholder="dd-mm-yyyy"
                  format="DD-MM-YYYY"
                  className="outline-none py-3 cursor-pointer"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[0.729vw] text-[#6B7280]">
                  Use Frequency<span className="text-[#F43F5E]">*</span>
                </label>
                <div className="flex gap-5">
                  {Frequency.map((data) => (
                    <div key={data?.id}>
                      <div className="flex gap-2 pb-6">
                        <input
                          type="radio"
                          checked={selectedFrequency === data.id}
                          onChange={() => handleFrquencyChange(data.id)}
                          className={`radio-input ${
                            selectedFrequency === data.id ? "checked" : ""
                          }`}
                        />
                        <p
                          className={`text-[0.729vw] ${
                            selectedFrequency === data.id ? "font-semibold" : ""
                          }`}
                        >
                          {data?.title}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-[1.05vw] font-semibold pb-5 pt-5">
              Promo users
            </h2>
            <div className="flex gap-5">
              {promoUsers.map((data) => (
                <div key={data?.id}>
                  <div className="flex gap-2 pb-6">
                    <input
                      type="radio"
                      checked={selectedPromoUser === data.id}
                      onChange={() => handlePromoUserChange(data.id)}
                      className={`radio-input ${
                        selectedPromoUser === data.id ? "checked" : ""
                      }`}
                    />
                    <p className="text-[0.729vw] font-semibold">
                      {data?.title}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <div className="flex flex-col gap-2">
              <div className="flex justify-between items-center">
                <label className="text-[0.729vw] text-[#6B7280]">
                  Name of the Group(S)<span className="text-[#F43F5E]">*</span>
                </label>
                <p
                  className="text-[#8CC63F] text-[0.729vw] font-bold cursor-pointer"
                  onClick={addNewGroup}
                >
                  Add New Group
                </p>
              </div>
              {dropdowns.map((dropdown) => (
                <div key={dropdown.key}>{dropdown}</div>
              ))}
              <label className="checkBoxContainer1 checkBoxContainer2 flex items-center mt-5">
                <input type="checkbox" name="checkbox" />
                <p className="text-[#8CC63F] text-[0.729vw] pl-4">
                  Please Activate this coupon code
                </p>
              </label>
            </div>
            {/* <div className="flex flex-col gap-2">
              <div className="flex justify-between">
                <label className="text-[0.729vw] text-[#6B7280]">
                  Name of the Group(S)<span className="text-[#F43F5E]">*</span>
                </label>
                <p className="text-[#8CC63F] text-[0.729vw] font-bold">
                  Add New Group
                </p>
              </div>
              {groups?.map((data) => (
                <div key={data?.id}>
                  <SelectDropdown
                    inputPlaceholder={data?.placeholder}
                    reports={data?.dropdown}
                    promo
                  />
                </div>
              ))}
              <label class="checkBoxContainer1 checkBoxContainer2 flex items-center mt-5">
                <input type="checkbox" name="checkbox" />
                <p className="text-[#8CC63F] text-[0.729vw] pl-4">
                  Please Activate this coupon code
                </p>
              </label>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoAddnew;
