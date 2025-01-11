import React from "react";

const WalletAddress = ({ selectedItem }) => {
  // const bill = [
  //   {
  //     id: 1,
  //     bill: "Billed By",
  //     title: "HELIOS EVC SOLUTIONS PRIVATE LIMITED",
  //     address:
  //       "Olympia Platina 9th Floor,Plot No:338,South Phase, Guindy Industrial Estate,Chennai, TN.India-600 032",
  //     mail: "client@heliosevc.in",
  //     phone: "+91 98765 43210",
  //   },

  return (
    <>
      <section className="flex gap-20">
        <div className="w-[50%] rounded-2xl border border-[#EFF2F5] bg-[#FBFCFE] p-6 flex flex-col gap-3">
          <h4 className="text-[#8CC63F] text-lg font-medium">Billed By</h4>
          <h2 className="text-xl font-bold">
            HELIOS EVC SOLUTIONS PRIVATE LIMITED
          </h2>
          <p className="text-lg text-[#363C45]">
            Olympia Platina 9th Floor,Plot No:338,South Phase, Guindy Industrial
            Estate,Chennai, TN.India-600 032
          </p>
          <div className="text-base flex gap-12">
            <p className="text-[#737982]">Email</p>
            <p className="text-[#363C45]">client@heliosevc.in</p>
          </div>
          <div className="text-base flex gap-10">
            <p className="text-[#737982]">Phone</p>
            <p className="text-[#363C45]">+91 98765 43210</p>
          </div>
        </div>
       
        <div
          key={selectedItem?.id}
          className="w-[50%] rounded-2xl border border-[#EFF2F5] bg-[#FBFCFE] p-6 flex flex-col gap-3"
        >
          <h4 className="text-[#8CC63F] text-lg font-medium">Billed To</h4>
          <h2 className="text-xl font-bold">{selectedItem?.name}</h2>
          <p className="text-lg text-[#363C45]">{selectedItem?.address}</p>
          <div className="text-base flex gap-12">
            <p className="text-[#737982]">Email</p>
            <p className="text-[#363C45]">{selectedItem?.mail}</p>
          </div>
          <div className="text-base flex gap-10">
            <p className="text-[#737982]">Phone</p>
            <p className="text-[#363C45]">{selectedItem?.phone}</p>
          </div>
        </div>
       
      </section>
    </>
  );
};

export default WalletAddress;

// import React from "react";

// const WalletAddress = ({ selectedItem }) => {
//   return (
//     <section className="flex gap-20">
//       <div className="w-[50%] rounded-2xl border border-[#EFF2F5] bg-[#FBFCFE] p-6 flex flex-col gap-3">
//         <h4 className="text-[#8CC63F] text-lg font-medium">
//           {selectedItem.name}
//         </h4>
//         <h2 className="text-xl font-bold">{selectedItem.name}</h2>
//         <p className="text-lg text-[#363C45]">{selectedItem.name}</p>
//       </div>
//     </section>
//   );
// };

// export default WalletAddress;
