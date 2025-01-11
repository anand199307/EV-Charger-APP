import React from "react";

const InvoiceBill = () => {
  const invoice = [
    {
      id: 1,
      invoicedata: " Terms and Conditions",
      para: "Please quote invoice number when remitting funds.",
    },
    {
      id: 2,
      invoicedata: "Authourized Signatory",
      className: "sign",
    },
  ];

  const statement = [
    {
      id: 1,
      title: "Sub Total",
      subtitle: "$20.00",
    },
    {
      id: 2,
      title: "Discount(0%)",
      subtitle: "$0",
    },
    {
      id: 3,
      title: "CGST(0%)",
      subtitle: "0",
    },
    {
      id: 4,
      title: "SGST(0%)",
      subtitle: "0",
    },
    {
      id: 5,
      title: "IGST(18%)",
      subtitle: "3.60",
    },
    {
      id: 6,
      title: "CESS",
      subtitle: "0",
    },
    {
      id: 7,
      title: "Total Amount ",
      subtitle: "$23.60",
      className: "amount"
    },
  ];
  return (
    <main className="w-[100%] flex justify-between">
      <section className="w-[70%] flex flex-col gap-4">
        {invoice.map((data) => (
          <div
            key={data?.id}
            className={`w-[80%] rounded-2xl border border-[#EFF2F5] bg-[#FBFCFE] p-6 flex flex-col gap-3 ${
              data?.className && "h-[183px]"
            }`}
          >
            <h4 className="text-[#8CC63F] text-lg font-medium">
              {data?.invoicedata}
            </h4>
            <p className="text-lg text-[#363C45]">{data?.para}</p>
          </div>
        ))}
      </section>

      <div className="w-[30%] flex flex-col gap-4">
        {statement?.map((data) => (
          <div key={data?.id}>
            <div
              className={`flex justify-between ${
                data?.className && "border-[#363C45] border-y-2 py-3"
              }`}
            >
              <p
                className={` text-[#737982] ${
                  data?.className && "text-2xl font-semibold text-[#363C45]"
                }`}
              >
                {data?.title}
              </p>
              <p
                className={`font-semibold text-[#363C45] ${
                  data?.className && "text-2xl font- text-[#363C45]"
                }`}
              >
                {data?.subtitle}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* <div className=" flex justify-between border-[#363C45] border-y-2 py-3">
        <p className="text-2xl font-semibold text-[#363C45]">Sub Total</p>
        <p className="text-2xl font- text-[#363C45]">$20.00</p>
      </div> */}
    </main>
  );
};

export default InvoiceBill;
