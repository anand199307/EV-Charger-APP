import React, { useEffect, useState } from "react";
import propertiesIcon from "../../../assets/sidebar/home.svg";
import { useDispatch, useSelector } from "react-redux";
import PropertiesIndex from "../../../components/properties/PropertiesIndex";
import Header from "../../../components/common/Header";
import X from "../../../assets/x.svg";
import { PropertyList } from "../../../api/PropertyApi";
import { filterDataBySearch } from "../../../components/common/Functions/searchFunctions";

export const columns = [
  { key: "selected", checkbox: true },
  { key: "name", label: "Properties" },
  { key: "City", label: "City" },
  { key: "Chargers", label: "Chargers" },
  { key: "delete", label: "" },
];

const Properties = () => {
  const [ispropertyActive, setpropertyActive] = useState(false);

  const dispatch = useDispatch();
  // const data = useSelector((state) => state.tableCart.dataTable);
  const [tableData, setTableData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const propertyResponse = await PropertyList(currentPage, limit);
        // console.log("Fetched data for page", currentPage);
        // console.log("Data for page", currentPage, propertyResponse.data.data);
        setTableData(propertyResponse?.data?.data);
        const totalCount = propertyResponse?.data?.count;
        const totalPagesCount = Math.ceil(totalCount / limit);
        setTotalPages(totalPagesCount);
      } catch (error) {
        console.error("error in list", error);
      }
    };
    fetchData();
  }, [currentPage, limit]);
  // console.log(tableData);

  return (
    <>
      {!ispropertyActive ? (
        <div>
          <Header title="Properties" icon={propertiesIcon} />
        </div>
      ) : (
        <div className="py-4 px-5 border-b-2">
          <img
            src={X}
            onClick={() => setpropertyActive(false)}
            className="cursor-pointer border rounded-lg p-1"
          />
        </div>
      )}

      <div className="py-12 px-7">
        <PropertiesIndex
          // data={data}
          columns={columns}
          ispropertyActive={ispropertyActive}
          setpropertyActive={setpropertyActive}
          tableData={tableData}
          setTableData={setTableData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limit={limit}
          totalPages={totalPages}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />
      </div>
    </>
  );
};

export default Properties;
