import React from "react";

const MessageLog = () => {
  const message = [
    {
      id: 1,
      text: "Charger Unplugged",
      time: "16:30, 2 June",
    },
    {
      id: 2,
      text: "Charger plugged",
      time: "16:30, 2 June",
    },
    {
      id: 3,
      text: "Charger Unplugged",
      time: "16:30, 2 June",
    },
    {
      id: 4,
      text: "Charger plugged",
      time: "16:30, 2 June",
    },
  ];
  return (
    <div className="w-[27vw]">
      <h2 className="text-[1.25vw] font-semibold">Message Log</h2>
      <div className="flex flex-col gap-[2.083vw] pt-7">
        {message.map((messages) => (
          <div
            key={messages.id}
            className="w-full py-[0.625vw] flex justify-between px-[1.667vw] border rounded-xl bg-slate-100 border-none"
          >
            <h2 className="text-[0.833vw] font-semibold">{messages.text}</h2>
            <p className="text-[0.729vw] text-[#8A92A6]">{messages.time}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageLog;
