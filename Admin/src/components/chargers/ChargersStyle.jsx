import React, { useState } from "react";
import InputBox from "../common/InputBox";
import Plus from "../../assets/plus.svg";
import Ghost from "../../assets/Ghost.svg";

const NewComponent = ({
  isVisible,
  toggleVisibility,
  title,
  description,
  form,
}) => {
  const initialInputValue = {};
  form.forEach((item) => (initialInputValue[item.name] = ""));
  const [inputValue, setInputValue] = useState(initialInputValue);

  const handleChange = (e) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  return (
    <div className="border-b-2 transition duration-300">
      <div className="w-full flex justify-between py-3">
        <h2 className="text-xl font-semibold">
          {title}
          <span className="text-[#F43F5E]">*</span>
        </h2>
        <img
          src={isVisible ? Ghost : Plus}
          onClick={toggleVisibility}
          className="cursor-pointer  hover:border hover:rounded-lg hover:bg-slate-100"
        />
      </div>

      {isVisible && (
        <div>
          <p className="text-sm text-[#6B7280]">{description}</p>

          <form className="grid grid-cols-2 gap-x-6 gap-y-7 pt-7 pb-6">
            {form.map((forms) => (
              <div key={forms?.id} className="flex flex-col gap-2">
                <label className="text-sm text-[#6B7280]">
                  {forms.label} <span className="text-[#F43F5E]">*</span>
                </label>
                {forms.class === "dropdown" ? (
                  <select
                    name={forms.name}
                    onChange={handleChange}
                    className="w-full border outline-none placeholder-[#9CA3AF] text-gray-700 pl-4 py-2 text-sm bg-[#F9FAFB] rounded-lg"
                  >
                    <option value="default" hidden>
                      Choose an option
                    </option>
                    {forms.options.map((option) => (
                      <option key={option.id} value={option.value}>
                        {option.value}
                      </option>
                    ))}
                  </select>
                ) : (
                  <InputBox
                    type="text"
                    name={forms.name}
                    onChange={handleChange}
                    placeholder={forms.placeholder}
                  />
                )}
              </div>
            ))}
          </form>
        </div>
      )}
    </div>
  );
};

export default NewComponent;
