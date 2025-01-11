import React, { useEffect, useState } from "react";
import hostIcon from "../../../assets/sidebar/Location.svg";
import HostIndex from "../../../components/host/hostIndex";
import { useDispatch, useSelector } from "react-redux";
import Header from "../../../components/common/Header";
import { HostList } from "../../../api/HostApi";
import {
  getUrl,
  updatePropertySave,
  updateSave,
} from "../../../store/slices/HostSlice";
import { createHost } from "../../../store/slices/HostSlice";

import Form from "../../../components/common/Form";
import BankInfo from "./BankInfo";
import PropertiesInfo from "./PropertiesInfo";
import { readUser } from "../../../services/localStorage.service";

export const columns = [
  { key: "selected", checkbox: true },
  { key: "name", label: "Name" },
  { key: "Properties", label: "Properties" },
  { key: "delete" },
];

const Host = (props) => {
  const dispatch = useDispatch();
  const save = useSelector((state) => state.host.save);
  const propertySave = useSelector((state) => state.host.propertySave);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [errorMessage, setErrorMessage] = useState("");
  const [tableData, setTableData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [limit, setLimit] = useState(10);
  const [totalPages, setTotalPages] = useState(1);

  const onInputChange = (e) => {
    const { name, value } = e.target;
    if (
      name === "address_line1" ||
      name === "address_line2" ||
      name === "postal_index_code"
    ) {
      dispatch(
        updateSave({ key: name, value: value, nestedKey: "location_details" })
      );
    } else {
      dispatch(updateSave({ key: name, value }));
    }
  };
  const user = readUser();

  const [steps] = useState([
    {
      key: "firstStep",
      title: "Company Info",
      label: "Short step description",
      component: <Form showOptions={true} onChange={onInputChange} />,
    },
    {
      key: "secondStep",
      title: "Bank Info",
      label: "Short step description",
      component: (
        <BankInfo
          onChange={onInputChange}
          save={save}
          selectCostomer={props.selectCostomer}
        />
      ),
    },
    {
      key: "finalStep",
      title: "Properties Info",
      label: "Short step description",
      component: <PropertiesInfo propertySave={propertySave} />,
    },
  ]);

  const handleSave = () => {
    // dispatch(createHost(save));
  };

  const handleNext = async () => {
    const currentStep = steps[activeStepIndex];

    if (currentStep?.key === "firstStep") {
      const requiredFields = [
        "host_name",
        "phone_number",
        "email",
        "address_line1",
        "country",
        "state",
        "City",
        "taxNumber",
        "gstNumber",
      ];

      const isFieldsFilled = requiredFields?.every(
        (field) => save?.[field] !== ""
      );

      if (!isFieldsFilled) {
        alert("Please fill in all required fields before proceeding.");
        return;
      }

      if (isFieldsFilled) {
        setActiveStepIndex(activeStepIndex + 1);
      }
    }

    if (currentStep.key === "secondStep") {
      const requiredFields = ["bank_account", "bank_name", "ifsc_code"];
      const isFieldsFilled = requiredFields?.every(
        (field) => save[field] !== ""
      );

      if (!isFieldsFilled) {
        alert("Please fill in all required fields before proceeding.");
        return;
      }

      if (isFieldsFilled) {
        setActiveStepIndex(activeStepIndex + 1);
        const response = await dispatch(createHost({ ...save }));
        const createdHostId = response?.payload?.response?.data?.id;

        dispatch(updatePropertySave({ key: "host_id", value: createdHostId }));
        dispatch(getUrl({ key: "uuid", value: createdHostId }));
      }
    }
  };

  // console.log(save);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hostResponse = await HostList(
          user.account_id,
          currentPage,
          limit
        );
        // console.log("Fetched data for page", currentPage);
        // console.log(
        //   "Data for page",
        //   currentPage,
        //   hostResponse?.data?.hostsWithPropertiesCount
        // );
        setTableData(hostResponse?.data?.hostsWithPropertiesCount);
        const totalCount = hostResponse?.data?.total;
        const totalPagesCount = Math.ceil(totalCount / limit);
        setTotalPages(totalPagesCount);
      } catch (error) {
        console.error("error in list", error);
      }
    };

    fetchData();
  }, [currentPage, limit]);

  return (
    <>
      <div>
        <Header title="Host" icon={hostIcon} />
      </div>

      <div className="py-7 px-7">
        <HostIndex
          columns={columns}
          onChange={onInputChange}
          save={save}
          onSave={handleSave}
          activeStepIndex={activeStepIndex}
          setActiveStepIndex={setActiveStepIndex}
          handleNext={handleNext}
          steps={steps}
          tableData={tableData}
          setTableData={setTableData}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          limit={limit}
          totalPages={totalPages}
        />
      </div>

      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
    </>
  );
};

export default Host;
