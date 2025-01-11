import React, { useState } from "react";
import { Link } from "react-router-dom";
import EyeIcon from "../../assets/Customer/eye.svg";
import DownloadIcon from "../../assets/Customer/download.svg";
import OptionButton from "../../components/common/OptionButton";
import { useSelector } from "react-redux";
import PaginationButtons from "../../components/common/PaginationButtons";
import { filterDataByDateRange } from "../../components/common/Functions/dateRangeFunctions";
import {
  filterDataBySearch,
} from "../../components/common/Functions/searchFunctions";

const WalletTable = ({ searchTerm, selectedDateRange }) => {
  const data = useSelector((state) => state.tableCart.dataTable);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 6;

  const filteredBySearch = filterDataBySearch(data, searchTerm);
  const filteredByDateRange = filterDataByDateRange(
    filteredBySearch,
    selectedDateRange
  );

  const totalPages = Math.ceil(filteredByDateRange.length / rowsPerPage);

  const currentData = filteredByDateRange.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );

  const handleViewInvoiceClick = (itemId) => {
    const selectedItem = filteredByDateRange.find((item) => item.id === itemId);
    // console.log(`View Invoice clicked for item with ID: ${itemId}`);
    // console.log(selectedItem, "selectedItem");
    setSelectedItem(selectedItem);
  };
  const downloadInvoice = (invoiceData) => {
    const pdfContent = `
      Name: ${invoiceData.name}
      Credits Added: ${invoiceData.credit}
      Recharge Amount: ${invoiceData.credit}
      Available Credits: ${invoiceData.credit}
      Date: ${invoiceData.date_day}
    `;

    const blob = new Blob([pdfContent], { type: "application/pdf" });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `invoice_${invoiceData.id}.pdf`;

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleDownloadInvoiceClick = (itemId) => {
    const selectedItem = filteredByDateRange.find((item) => item.id === itemId);
    // console.log(`Download Invoice clicked for item with ID: ${itemId}`);
    // console.log(selectedItem, "selectedItem");

    downloadInvoice(selectedItem);
  };

  const handlePreviousPage = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleNextPage = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div>
      <table className="w-[100%] border rounded-lg">
        <thead className="border-b">
          <tr className="bg-gray-50 h-[8vh]  gap-2">
            <th className="w-2/12 text-center text-[0.833vw] text leading-4 font-medium text-gray-500 uppercase tracking-wide">
              NAME
            </th>
            <th className="w-2/12 text-center text-[0.833vw] text leading-4 font-medium text-gray-500 uppercase tracking-wide">
              CREDITS ADDED
            </th>
            <th className=" w-2/12 text-center text-[0.833vw] text leading-4 font-medium text-gray-500 uppercase tracking-wide">
              RECHARGE AMOUNT
            </th>
            <th className=" w-2/12 text-center text-[0.833vw] text leading-4 font-medium text-gray-500 uppercase tracking-wide">
              AVAILABLE CREDITS
            </th>
            <th className="w-2/12 text-center text-[0.833vw] text leading-4 font-medium text-gray-500 uppercase tracking-wide">
              DATE
            </th>
            <th className=" w-2/12 text-center text-[0.833vw] text leading-4 font-medium text-gray-500 uppercase tracking-wide">
              ACTIONS
            </th>
          </tr>
        </thead>

        <tbody className="w-full">
          {currentData?.map((item) => (
            <tr key={item.id}>
              <td className="w-2/12 whitespace-no-wrap border-b border-gray-200 text-center">
                <div>
                  <h2 className="text-[1.042vw] font-semibold text-[#292D32]">
                    {item.name}
                  </h2>
                  <h2 className="text-[#8A92A6] text-[0.833vw] ">
                    {item.wallet_id}
                  </h2>
                  <h2 className="text-[#8A92A6] text-[0.833vw] ">
                    {item.wallet_id}
                  </h2>
                </div>
              </td>
              <td className="w-2/12 whitespace-no-wrap border-b border-gray-200 text-center">
                <h1 className="text-[#8A92A6] text-center text-[0.833vw]">
                  {item.credit}
                </h1>
              </td>
              <td className="w-2/12 whitespace-no-wrap border-b border-gray-200 text-center">
                <h1 className="text-[#8A92A6] text-center text-[0.833vw]">
                  {item.credit}
                </h1>
              </td>
              <td className="w-2/12 whitespace-no-wrap border-b border-gray-200 text-center">
                <h1 className="text-[#8A92A6] text-[0.833vw] text-center">
                  {item.credit}
                </h1>
              </td>
              <td className="w-2/12 whitespace-no-wrap border-b border-gray-200 text-center">
                <h1 className="text-[#8A92A6] text-[0.833vw] text-center uppercase">
                  {item.date_day}
                </h1>
              </td>

              <td
                className={
                  "w-2/12 whitespace-no-wrap border-b border-gray-200 text-center"
                }
              >
                <td className=" py-[1.5vw] flex justify-center whitespace-no-wrap  border-gray-200">
                  <OptionButton
                    option
                    table
                    opt
                    options={[
                      <div className="flex flex-col gap-3 justify-start m-auto">
                        <Link
                          to={`/wallet/${item.id}`}
                          className="flex gap-2"
                          onClick={() => handleViewInvoiceClick(item?.id)}
                        >
                          <img
                            src={EyeIcon}
                            alt="EyeIcon"
                            className="w-[1.25vw]"
                          />
                          <p className="text-[0.833vw] font-medium">
                            View Invoice
                          </p>
                        </Link>

                        <Link
                          className="flex gap-2"
                          onClick={() => handleDownloadInvoiceClick(item?.id)}
                        >
                          <img
                            src={DownloadIcon}
                            alt="DeleteIcon"
                            className="w-[1.25vw]"
                          />
                          <p className="text-[0.8vw]">Download Invoice</p>
                        </Link>
                      </div>,
                    ]}
                  />
                </td>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="w-full px-[2vw] border py-[1.25vw]">
        <PaginationButtons
          currentPage={currentPage}
          totalPages={totalPages}
          onPreviousClick={handlePreviousPage}
          onNextClick={handleNextPage}
        />
      </div>
    </div>
  );
};

export default WalletTable;
