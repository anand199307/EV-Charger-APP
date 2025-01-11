import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import OptionButton from "../common/OptionButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import EyeIcon from "../../assets/Customer/eye.svg";
import Icondelete from "../../assets/Customer/trash.png";
import { faPenSquare } from "@fortawesome/free-solid-svg-icons";
import Add from "../../assets/host/add.svg";
import propertiesIcon from "../../assets/sidebar/home.svg";
import { useDispatch, useSelector } from "react-redux";
import { PropertyByHost } from "../../api/HostApi";
import Modal from "../common/modal/Modal";
import PropertyAddForm from "../../pages/admin/host/PropertyAddForm";
import { updatePropertySave } from "../../store/slices/HostSlice";

const HostView = ({ selectCostomer, onChange }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [view, setView] = useState(true);
  const [property, SetProperty] = useState(null);
  const [modalshow, setModalShow] = useState(false);
  const propertySave = useSelector((state) => state.host.propertySave);

  const rfidhandle = () => {
    setModalShow(true);
  };

  const handleViewClick = () => {
    setView(true);
    navigate(`/host/${selectCostomer.id}`, {
      state: { selectCostomer, view },
    });
  };

  const handleEditClick = () => {
    setView(false);
    navigate(`/host/${selectCostomer.id}`);
  };

  const onInputChanges = (key, value, nestedKey = null) => {
    if (
      key === "address_line1" ||
      key === "address_line2" ||
      key === "postal_index_code"
    ) {
      dispatch(
        updatePropertySave({
          key: key,
          value: value,
          nestedKey: "location_details",
        })
      );
    } else {
      dispatch(updatePropertySave({ key, value }));
    }
  };

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const propertyResponse = await PropertyByHost(selectCostomer?.id);
        SetProperty(propertyResponse);
      } catch (error) {
        console.error("error");
      }
    };
    fetchProperty();
  }, [selectCostomer]);

  const propertyNames = property?.data?.data?.map((item) => item.name);

  return (
    <div key={selectCostomer?.id}>
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          {selectCostomer?.img && (
            <img src={selectCostomer?.img} alt={selectCostomer?.subtitle} />
          )}
          <h2 className="text-[0.938vw] font-semibold">
            {selectCostomer?.host_name}
          </h2>
        </div>

        {selectCostomer && (
          <OptionButton
            key={selectCostomer?.id}
            isActive={selectCostomer?.status}
            option
            active
            options={[
              <div className="flex flex-col gap-3 justify-start m-auto">
                <div
                  className="flex gap-2 items-center"
                  onClick={handleViewClick}
                >
                  <img src={EyeIcon} alt="EyeIcon" className="w-[1.25vw]" />
                  <p className="text-[0.833vw]">View</p>
                </div>
                <div
                  className="flex gap-2 items-center"
                  onClick={handleEditClick}
                >
                  <FontAwesomeIcon icon={faPenSquare} className="w-[1.25vw]" />
                  <p className="text-[0.833vw]">Edit info</p>
                </div>
                <Link className="flex gap-2 items-center">
                  <img
                    src={Icondelete}
                    alt="DeleteIcon"
                    className="w-[1.25vw]"
                  />
                  <p className="text-[0.833vw] text-red-700">Delete Host</p>
                </Link>
              </div>,
            ]}
          />
        )}
      </div>

      {/* <p className="text-[0.729vw] leading-6 py-4 text-[#6B7280]">
        {selectCostomer?.text}
      </p> */}

      <div className="py-5">
        <h2 className="text-[0.729vw] font-semibold">Details</h2>
        <ul className="flex flex-col gap-5 justify-between text-[0.729vw] text-[#6B7280] py-2">
          <li className="flex justify-between">
            Tax Identification Number <span> {selectCostomer?.taxNumber}</span>
          </li>
          <li className="flex justify-between">
            GST/VAT Number <span> {selectCostomer?.gstNumber}</span>
          </li>
          <li className="flex justify-between">
            Admin Info <span> {selectCostomer?.email}</span>
          </li>
          <li className="flex justify-between">
            Bank Details <span> {selectCostomer?.bank_account}</span>
          </li>
        </ul>
      </div>

      <div className="">
        <div className="flex justify-between items-center">
          <h2 className="text-[0.729vw] font-semibold">Properties</h2>
          <div className="flex gap-2">
            <img src={Add} alt="add-square" className="w-[1.25vw] h-6" />
            <p
              className="text-[#8CC63F] text-[0.729vw] font-medium cursor-pointer flex items-center"
              onClick={rfidhandle}
            >
              Add New Property
            </p>
          </div>
        </div>
        <ul className="flex flex-col gap-5 text-[0.729vw] text-[#6B7280] py-2">
          {propertyNames?.map((name) => (
            <li key={name?.id} className="flex gap-5">
              <div className="border rounded-lg p-0.5">
                <img
                  src={propertiesIcon}
                  alt="contents"
                  className="rounded-lg bg-[#F3F4F6] p-1.5 border w-[1.975vw]"
                />
              </div>
              <h4 className="flex items-center">{name}</h4>
            </li>
          ))}
        </ul>
      </div>

      {modalshow && (
        <Modal modalshow={modalshow} setModalShow={setModalShow}>
          <PropertyAddForm
            propertySave={propertySave}
            onChange={onInputChanges}
            setModalShow={setModalShow}
            selectCostomer={selectCostomer}
            host
          />
        </Modal>
      )}
    </div>
  );
};

export default HostView;
