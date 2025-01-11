import React, { useEffect, useState } from "react";
import InputBox from "../../../components/common/InputBox";
import Button from "../../../components/common/Button";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../../store/slices/TableSlice";
import Modal from "../../../components/common/modal/Modal";
import PropertyAddForm from "./PropertyAddForm";
import Underraw from "../../../assets/host/undraw.svg";
import { updatePropertySave } from "../../../store/slices/HostSlice";

const PropertiesInfo = () => {
  const params = useParams();
  const dispatch = useDispatch();
  const [modalshow, setModalShow] = useState(false);
  const [modalInfo, setModalInfo] = useState("Add");

  const data = useSelector((state) => state.tableCart.dataTable);
  const propertySave = useSelector((state) => state.host.propertySave);

  const selectedData = data?.find((item) => item.id === params.id);

  const rfidhandle = () => {
    setModalShow(true);
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

  return (
    <div className="w-full flex justify-center mt-[3.333vw]">
      <div className="">
        <h4 className="text-[0.729vw] text-[#6B7280]">Properties Details</h4>
        <div className="h-[35vh] flex">
          <img src={Underraw} alt="Underraw" className="w-[13.333vw]" />
        </div>
        <Button
          backgroundColor="#8CC63F"
          content="Add Property"
          width="9.01vw"
          searchicon={true}
          radius="0.25rem"
          color="white"
          font="0.833vw"
          onClick={() => {
            setModalInfo("Add");
            rfidhandle();
          }}
        />
      </div>

      <>
        {/* <Modal modalshow={modalshow} setModalShow={setModalShow}>
          {modalInfo === "Add" ? (
            <PropertyAddForm
              propertySave={propertySave}
              onChange={onInputChanges}
            />
          ) : (
            modalInfo === "edit" && <PropertyAddForm editfform />
          )}
        </Modal> */}

        <Modal modalshow={modalshow} setModalShow={setModalShow}>
          <PropertyAddForm
            propertySave={propertySave}
            onChange={onInputChanges}
            host
            setModalShow={setModalShow}
          />
        </Modal>
      </>
    </div>
  );
};

export default PropertiesInfo;
