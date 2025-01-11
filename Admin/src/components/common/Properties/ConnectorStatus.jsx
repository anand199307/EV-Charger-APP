import React from "react";

const ConnectorStatus = ({ chargerData, messageLogData }) => {
  const message = [
    { id: 1, key: "status", text: "Status" },
    { id: 2, key: "connectorId", text: "Connector ID" },
    { id: 3, key: "powerOutputType", text: "Power Output Type" },
    { id: 4, key: "connector_type", text: "Connector Type" },
    { id: 5, key: "capacity", text: "Connector Capacity" },
    { id: 6, key: "tariff_rate", text: "Tariff Rate" },
  ];

  const renderConnectorStatus = (connector) => (
    <>
      <h2 className="text-[1.25vw] font-semibold mb-4">
        Connector Status {connector.id}
      </h2>
      {message.map((msg) => (
        <div
          key={msg.id}
          className="flex justify-between w-full border rounded-xl bg-slate-100 border-none px-[1.667vw] py-[0.625vw] mb-4"
        >
          <h3 className="text-[0.833vw] font-semibold">{msg.text}</h3>
          <p className="text-[0.729vw] text-[rgb(138,146,166)]">
            {connector[msg.key]}
          </p>
        </div>
      ))}
    </>
  );

  return (
    <div className="w-[27vw]">
      <div className="flex flex-col gap-[2.083vw]">
        {chargerData?.Connectors?.map((connector) => (
          <div key={connector.id}>{renderConnectorStatus(connector)}</div>
        ))}

        {messageLogData?.Connectors?.map((connector) => (
          <div key={connector.id}>{renderConnectorStatus(connector)}</div>
        ))}
      </div>
    </div>
  );
};

export default ConnectorStatus;
