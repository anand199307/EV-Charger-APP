export const Step = ({ title, label, isActive, isDone }) => {
  return (
    <li className={`${isActive ? "active" : ""} ${isDone ? "done" : ""}`}>
      <div className="flex flex-col">
        <p className="text-[0.729vw] font-medium text-[#424242]">{title}</p>
        <span className="text-[#757575] text-[0.625vw]">{label}</span>
      </div>
    </li>
  );
};

