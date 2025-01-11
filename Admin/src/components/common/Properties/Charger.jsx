import React, { useEffect, useState } from "react";
import Bheem from "../../../assets/Properties/bheem.svg";
import Button from "../Button";
import MessageLog from "./MessageLog";
import ConnectorStatus from "./ConnectorStatus";
import OptionButton from "../OptionButton";
import { Link, useLocation } from "react-router-dom";
import Icondelete from "../../../assets/Customer/trash.png";
import Unlock from "../../../assets/Properties/unlock.svg";
import Barcode from "../../../assets/Properties/barcode.svg";
import { ChargerView } from "../../../api/PropertyApi";
import ChargersAddnew from "../../../pages/admin/chargers/ChargersAddnew";

const Charger = ({ setChargerData }) => {
  const button = [
    {
      id: 1,
      btn: "Connector Status",
    },
    {
      id: 2,
      btn: "Message Log",
    },
  ];

  const charger = [
    {
      id: 1,
      key: "name",
      text: "Charger Name",
    },
    {
      id: 2,
      key: "uuid",
      text: "Charger ID",
    },
    {
      id: 3,
      key: "serial_number",
      text: "Charger SN Number",
    },
    {
      id: 4,
      key: "visibility",
      text: "Public",
    },
    {
      id: 5,
      key: "occp_complaint",
      text: "OCPP Compliant",
    },
    {
      id: 6,
      key: "",
      text: "Firmware",
    },
    {
      id: 7,
      key: "lastHeartbeat",
      text: "Last Heartbeat Timestamp",
    },
  ];

  const [activeButton, setActiveButton] = useState("Connector Status");
  const location = useLocation();
  const chargerData = location?.state?.chargerData;
  const [messageLogData, setMessageLogData] = useState(null);

  // const handleChange = (section) => {
  //   setActiveButton(section);
  // };
  // const handleChange = async (section) => {
  //   setActiveButton(section);
  //   if (section === "Message Log") {
  //     try {
  //       const response = await ChargerView(1);
  //       setMessageLogData(response?.data?.response?.data);
  //     } catch (error) {
  //       console.error("Error fetching message log data:", error);
  //     }
  //   } else if (section === "Connector Status") {
  //     try {
  //       try {
  //         const response = await ChargerView(1);
  //         setMessageLogData(response?.data?.response?.data);
  //       } catch (error) {
  //         console.error("Error fetching message log data:", error);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching connector status data:", error);
  //     }
  //   }
  // };
  const handleChange = async (section) => {
    setActiveButton(section);
    try {
      const response = await ChargerView(1);
      setMessageLogData(response?.data?.response?.data);
    } catch (error) {
      console.error(`Error fetching ${section} data:`, error);
    }
  };

  return (
    <>
      {location.state && location.state.showChargerAddNew ? (
        <ChargersAddnew
          chargerDetailsData={location?.state?.chargerDetailsData}
          editchargerDetails={location?.state?.editchargerDetails}
        />
      ) : (
        <div className="flex gap-12 ">
          <div>
            <h2 className="text-[1.25vw] font-semibold">Charger</h2>
            <div className="flex flex-col gap-6 pt-6">
              <img src={Bheem} alt="bheem" />
              <div className="flex justify-center gap-4">
                <h4 className="text-[1.25vw] font-semibold flex justify-center">
                  Bheem
                </h4>
                <OptionButton
                  option
                  bg
                  options={[
                    <div className="flex flex-col gap-3 justify-start m-auto">
                      <Link className="flex gap-2 items-center">
                        <img
                          src={Barcode}
                          alt="Barcode"
                          className="w-[1.25vw]"
                        />
                        <p className="text-[0.729vw] text-[#111827]">Open QR</p>
                      </Link>
                      <Link className="flex gap-2 items-center">
                        <img src={Unlock} alt="Unlock" className="w-[1.25vw]" />
                        <p className="text-[0.729vw] text-[#111827]">
                          Lock Connector
                        </p>
                      </Link>
                      <Link className="flex gap-2 items-center">
                        <img
                          src={Icondelete}
                          alt="DeleteIcon"
                          className="w-[1.25vw]"
                        />
                        <p className="text-[0.729vw] text-red-500">
                          Remove Connector
                        </p>
                      </Link>
                    </div>,
                  ]}
                />
              </div>
            </div>
            <div className="flex gap-6 justify-center py-6">
              {button.map((buttons) => (
                <div key={buttons.id}>
                  <Button
                    backgroundColor={
                      activeButton === buttons.btn ? "#8CC63F" : "white"
                    }
                    content={buttons.btn}
                    padding="0rem 1rem"
                    font="0.833vw"
                    radius="0.5rem"
                    color={activeButton === buttons.btn ? "white" : " #8CC63F"}
                    border="1px solid #8CC63F"
                    onClick={() => handleChange(buttons.btn)}
                    height="5vh"
                  />
                </div>
              ))}
            </div>

            {charger?.map((chargers) => (
              <ul
                key={chargers.id}
                className="flex flex-col mb-4 customerScrolling"
              >
                <li>
                  <h2 className="text-[0.938vw] font-semibold">
                    {chargers?.text}
                  </h2>
                  {chargerData && (
                    <p className="text-[#6B7280] text-[0.833vw]">
                      {typeof chargerData[chargers?.key] === "boolean"
                        ? chargerData[chargers?.key].toString()
                        : chargerData[chargers?.key]}
                    </p>
                  )}

                  {activeButton === "Connector Status" && messageLogData && (
                    <p className="text-[#6B7280] text-[0.833vw]">
                      {typeof messageLogData[chargers?.key] === "boolean"
                        ? messageLogData[chargers?.key].toString()
                        : messageLogData[chargers?.key]}
                    </p>
                  )}
                  {activeButton === "Message Log" && messageLogData && (
                    <p className="text-[#6B7280] text-[0.833vw]">
                      {typeof messageLogData[chargers?.key] === "boolean"
                        ? messageLogData[chargers?.key].toString()
                        : messageLogData[chargers?.key]}
                    </p>
                  )}
                </li>
              </ul>
            ))}
          </div>

          {activeButton === "Message Log" ? (
            <MessageLog />
          ) : (
            <ConnectorStatus
              chargerData={chargerData}
              messageLogData={messageLogData}
            />
          )}
        </div>
      )}
    </>
  );
};

export default Charger;

// import React, { useEffect, useState } from "react";
// import Bheem from "../../../assets/Properties/bheem.svg";
// import Button from "../Button";
// import MessageLog from "./MessageLog";
// import ConnectorStatus from "./ConnectorStatus";
// import OptionButton from "../OptionButton";
// import { Link, useLocation } from "react-router-dom";
// import Icondelete from "../../../assets/Customer/trash.png";
// import Unlock from "../../../assets/Properties/unlock.svg";
// import Barcode from "../../../assets/Properties/barcode.svg";
// import { ChargerView } from "../../../api/PropertyApi";

// const Charger = (props) => {
//   const button = [
//     {
//       id: 1,
//       btn: "Connector Status",
//     },
//     {
//       id: 2,
//       btn: "Message Log",
//     },
//   ];

//   const charger = [
//     {
//       id: 1,
//       text: "Charger Name",
//       num: "556466629165",
//     },
//     {
//       id: 2,
//       text: "Charger ID",
//       num: "Ver. 2.0",
//     },
//     {
//       id: 3,
//       text: "Charger SN Number",
//       num: "556466629165",
//     },
//     {
//       id: 4,
//       text: "Public",
//       num: "True",
//     },
//     {
//       id: 5,
//       text: "OCPP Compliant",
//       num: "True",
//     },
//     {
//       id: 6,
//       text: "Firmware",
//       num: "Ver. 2.0",
//     },
//     {
//       id: 7,
//       text: "Last Heartbeat Timestamp",
//       num: "Ver. 2.0",
//     },
//   ];

//   const [activeButton, setActiveButton] = useState("Connector Status");
//   const location = useLocation();
//   console.log(location?.state?.chargerData);

//   const handleChange = (section) => {
//     setActiveButton(section);
//   };

//   return (
//     <div className="flex gap-12 ">
//       <div>
//         <h2 className="text-[1.25vw] font-semibold">Charger</h2>

//         <div className="flex flex-col gap-6 pt-6">
//           <img src={Bheem} alt="bheem" />
//           <div className="flex justify-center gap-4">
//             <h4 className="text-[1.25vw] font-semibold flex justify-center">
//               Bheem
//             </h4>
//             <OptionButton
//               option
//               bg
//               options={[
//                 <div className="flex flex-col gap-3 justify-start m-auto">
//                   <Link className="flex gap-2 items-center">
//                     <img src={Barcode} alt="Barcode" className="w-[1.25vw]" />
//                     <p className="text-[0.729vw] text-[#111827]">Open QR</p>
//                   </Link>
//                   <Link className="flex gap-2 items-center">
//                     <img src={Unlock} alt="Unlock" className="w-[1.25vw]" />
//                     <p className="text-[0.729vw] text-[#111827]">
//                       Lock Connector
//                     </p>
//                   </Link>
//                   <Link className="flex gap-2 items-center">
//                     <img
//                       src={Icondelete}
//                       alt="DeleteIcon"
//                       className="w-[1.25vw]"
//                     />
//                     <p className="text-[0.729vw] text-red-500">
//                       Remove Connector
//                     </p>
//                   </Link>
//                 </div>,
//               ]}
//             />
//           </div>
//         </div>
//         <div className="flex gap-6 justify-center py-6">
//           {button.map((buttons) => (
//             <div key={buttons.id}>
//               <Button
//                 backgroundColor={
//                   activeButton === buttons.btn ? "#8CC63F" : "white"
//                 }
//                 content={buttons.btn}
//                 padding="0rem 1rem"
//                 font="0.833vw"
//                 radius="0.5rem"
//                 color={activeButton === buttons.btn ? "white" : " #8CC63F"}
//                 border="1px solid #8CC63F"
//                 onClick={() => handleChange(buttons.btn)}
//                 height="5vh"
//               />
//             </div>
//           ))}
//         </div>

//         <ul className="flex flex-col gap-6 h-[40vh] customerScrolling">
//           <li>
//             <h2 className="text-[0.938vw] font-semibold">Charger Name</h2>
//             <p className="text-[#6B7280] text-[0.833vw]">
//               {location?.state?.chargerData.name}
//             </p>
//           </li>
//           <li>
//             <h2 className="text-[0.938vw] font-semibold">Charger ID</h2>
//             <p className="text-[#6B7280] text-[0.833vw]">
//               {location?.state?.chargerData?.uuid}
//             </p>
//           </li>
//           <li>
//             <h2 className="text-[0.938vw] font-semibold">Charger SN Number</h2>
//             <p className="text-[#6B7280] text-[0.833vw]">
//               {location?.state?.chargerData?.serial_number}
//             </p>
//           </li>
//           <li>
//             <h2 className="text-[0.938vw] font-semibold">Public</h2>
//             <p className="text-[#6B7280] text-[0.833vw]">{charger.num}</p>
//           </li>
//           <li>
//             <h2 className="text-[0.938vw] font-semibold">OCPP Compliant</h2>
//             <p className="text-[#6B7280] text-[0.833vw]">{charger.num}</p>
//           </li>
//           <li>
//             <h2 className="text-[0.938vw] font-semibold">Firmware</h2>
//             <p className="text-[#6B7280] text-[0.833vw]">{charger.num}</p>
//           </li>
//           <li>
//             <h2 className="text-[0.938vw] font-semibold">
//               Last Heartbeat Timestamp
//             </h2>
//             <p className="text-[#6B7280] text-[0.833vw]">
//               {location?.state?.chargerData?.lastHeartbeat}
//             </p>
//           </li>
//         </ul>
//       </div>

//       {activeButton === "Message Log" ? (
//         <MessageLog />
//       ) : (
//         <ConnectorStatus chargerData={location?.state?.chargerData} />
//       )}
//     </div>
//   );
// };

// export default Charger;
