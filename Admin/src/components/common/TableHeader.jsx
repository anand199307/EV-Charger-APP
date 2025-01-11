import React, { useState } from "react";
import InputBox from "./InputBox";
import Button from "./Button";
import { useParams } from "react-router-dom";
import RfidForm from "../rfid/RfidForm";
import DateRange from "./DateRange";
import "../common/modal/Modal.css";
import Modal from "./modal/Modal";
import { useDispatch } from "react-redux";

const TableHeader = (props) => {
  const routePath = window.location.pathname;
  const dispatch = useDispatch();
  const [modalshow, setModalShow] = useState(false);
  
  const params = useParams();

  const rfidhandle = () => {
    setModalShow(true);
  };

  let buttonsToRender;
  let shouldRenderInputBox = true;

  switch (routePath) {
    case "/properties":
      buttonsToRender = (
        <Button
          backgroundColor="#8CC63F"
          content="Add new"
          width="7.563vw"
          searchicon={true}
          radius="0.5rem"
          color="white"
          font="0.833vw"
          onClick={props.propertiesactives}
          height="5vh"
        />
      );
      break;

    case "/host":
      buttonsToRender = (
        <div className="flex flex-col">
          <Button
            backgroundColor="#8CC63F"
            content="Add new"
            width="7.563vw"
            searchicon={true}
            radius="0.5rem"
            color="white"
            font="0.833vw"
            onClick={props.act}
            height="5vh"
          />
        </div>
      );
      break;

    case "/promocode":
      shouldRenderInputBox = false;
      buttonsToRender = (
        <div className="flex flex-col">
          <Button
            backgroundColor="#8CC63F"
            content="Add Promo Code"
            width="10.563vw"
            searchicon={true}
            radius="0.5rem"
            color="white"
            font="0.833vw"
            onClick={props.activePromo}
            height="5vh"
          />
        </div>
      );
      break;

    case "/chargers":
      buttonsToRender = (
        <Button
          backgroundColor="#8CC63F"
          content="Add new"
          width="7.563vw"
          // width="126px"
          searchicon={true}
          radius="0.5rem"
          color="white"
          font="0.833vw"
          height="5vh"
          onClick={props.actives}
        />
      );
      break;

    case "/rfid":
      buttonsToRender = (
        <Button
          backgroundColor="#8CC63F"
          content="Add new"
          width="7.563vw"
          // width="126px"
          searchicon={true}
          radius="0.5rem"
          color="white"
          font="0.833vw"
          height="5vh"
          onClick={rfidhandle}
        />
      );
      break;
    case "/transactions":
      buttonsToRender = (
        <>
          <Button
            backgroundColor="#fff"
            content="Filter"
            width="7.563vw"
            // width="126px"
            FilterIcon={true}
            radius="0.5rem"
            color="#667085"
            font="0.833vw"
            height="5vh"
            border="1px solid #D0D5DD"
            // onClick={rfidhandle}
          />
          <Button
            backgroundColor="#8CC63F"
            content="Export"
            width="7.563vw"
            ExportIcon={true}
            radius="0.5rem"
            color="white"
            font="0.833vw"
            height="5vh"
            // onClick={rfidhandle}
          />
        </>
      );
    default:
      buttonsToRender = null;
      break;
  }

  return (
    <div className="flex gap-4">
      {props.isDeleteButtonVisible && (
        <Button
          backgroundColor="#8CC63F"
          content="Delete"
          font="0.729vw"
          radius="0.5rem"
          onClick={props.handleDeleteRow}
        />
      )}
      {shouldRenderInputBox && (
        <InputBox
          type="text"
          name="text"
          placeholder={props.placeholder || "Search"}
          value={props.searchTerm}
          onChange={props.handleSearchChange}
          searches
          {...props}
        />
      )}

      {props.date && (
        <DateRange onDateRangeSelect={props.handleDateRangeSelect} />
      )}

      {buttonsToRender}
      <div>
        {modalshow && (
          <Modal modalshow={modalshow} setModalShow={setModalShow}>
            <RfidForm setModalShow={setModalShow} />
          </Modal>
        )}
      </div>
    </div>
  );
};

export default TableHeader;
