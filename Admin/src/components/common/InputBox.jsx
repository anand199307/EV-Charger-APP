import React from "react";
import search from "../../assets/header/Search.svg";

const InputBox = ({
  type,
  name,
  placeholder,
  onChange,
  login,
  value,
  searches,
  validator,
  error,
  required,
  backgroundColor,
  width,
  inputhost,
  borderBottom,
  onBlur,
  ...props
}) => {
  return (
    <div>
      <div
        className={` ${
          !login && searches
            ? "rounded-lg border-2 flex items-center px-4 gap-4"
            : "border rounded-lg"
        }`}
      >
        {!login && searches && (
          <img src={search} alt="search" className="w-[1.25vw]" />
        )}
        <input
          style={{
            borderRadius: "4px",
            backgroundColor: { backgroundColor },
            width: { width },
            borderBottom: { borderBottom },
          }}
          className={`px-2 border outline-none  ${
            login
              ? "w-[100%] h-[4.6vh] border-[#8CC63F] rounded-none"
              : searches
              ? " w-[50%] h-[4.6vh] border-none rounded-[0.25rem] font-medium placeholder-[#667085] text-[0.833vw]"
              : inputhost
              ? "w-full placeholder-[#9CA3AF] h-[4.6vh] text-gray-700 px-4 py-2 text-[0.729vw] bg-white rounded-lg"
              : "w-full placeholder-[#9CA3AF] text-gray-700 px-4 py-2 text-[0.729vw] bg-[#F9FAFB] rounded-lg"
          }`}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
          validator={validator}
          required
          {...props}
        />
      </div>
      {error && <p className="text-red-500 text-[0.729vw]">{error}</p>}
    </div>
  );
};

export default InputBox;
