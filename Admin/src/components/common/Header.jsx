import React, { useEffect, useState } from "react";
import notification from "../../assets/header/Notification.svg";
import message from "../../assets/header/Message.svg";
import InputBox from "./InputBox";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import OptionButton from "./OptionButton";
import Button from "./Button";
import {
  doLogout,
  setToastState,
  setToastmsg,
} from "../../store/slices/AuthSlice";
import storage from "redux-persist/lib/storage";
import { persistor } from "../../store/Store";
import { readUser } from "../../services/localStorage.service";
import { userAdmin } from "../routes/UserFunction";
import Modal from "./modal/Modal";

const Header = ({ title, overview, para }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [shouldRenderInputBox, setShouldRenderInputBox] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [typingTimeout, setTypingTimeout] = useState(null);
  const [modalshow, setModalShow] = useState(false);

  const data = useSelector((state) => state.tableCart);

  const rfidhandle = () => {
    setModalShow(true);
  };

  const handleModal = () => {
    setModalShow(true);
  };

  const params = useParams();
  const customerId = params.id;
  const [customerData, setCustomerData] = useState([]);

  const filterCustomer = (id) => {
    const customer = data.dataTable?.find((customer) => customer.id === id);
    if (customer) {
      setCustomerData(customer);
    }
  };

  useEffect(() => {
    filterCustomer(+customerId);
  }, [customerId, filterCustomer]);

  const yourDataArray = [
    { name: "John Doe", id: 1 },
    { name: "Jane Smith", id: 2 },
    { name: "Alice Johnson", id: 3 },
  ];

  const handleSearchInputChange = (event) => {
    const query = event.target.value;
    setSearchQuery(query);

    if (typingTimeout) {
      clearTimeout(typingTimeout);
    }

    const timeoutId = setTimeout(() => {
      const filteredResults = yourDataArray.filter((item) =>
        item?.name?.toLowerCase().includes(query?.toLowerCase())
      );

      // console.log("Search Query:", query);
      // console.log("Filtered Results:", filteredResults);

      setSearchResults(filteredResults);
    }, 500);

    setTypingTimeout(timeoutId);
  };

  const user = readUser();

  const handleLogout = async () => {
    const result = dispatch(doLogout());
    // console.log(result);
    if (doLogout.fulfilled.match(result)) {
      storage.removeItem("persist:root");
      handleModal();
      persistor.purge();
      dispatch(setToastState(true));
      dispatch(setToastmsg("Logout in successfully"));
      navigate("/login");
    }
  };

  // const handleLogout = async () => {
  //   const result = await dispatch(doLogout());
  //   console.log(result);
  //   if (doLogout.fulfilled.match(result)) {
  //     storage.removeItem("persist:root");
  //     dispatch(setToastState(true));
  //     dispatch(setToastMessage("Logout in successfully"));
  //     navigate("/login");
  //   }
  // };

  const location = useLocation();

  useEffect(() => {
    const currentPath = location.pathname;
    if (currentPath === "/dashboard") {
      setShouldRenderInputBox(true);
    } else {
      setShouldRenderInputBox(false);
    }
  }, [location.pathname]);

  return (
    <div className="flex justify-between mx-6 py-4 border-b-2">
      {shouldRenderInputBox && (
        <InputBox
          type="text"
          placeholder="Search"
          value={searchQuery}
          onChange={handleSearchInputChange}
          searches
        />
      )}

      {overview ? (
        <div key={customerData?.id} className="flex gap-5">
          <img src={customerData?.img} alt="profile" />
          <div>
            <h2 className="text-[1.042vw] font-semibold">
              {customerData?.name}
            </h2>
            <p className="text-[#6B7280]">
              {customerData?.nagar},{customerData?.City}
            </p>
          </div>
        </div>
      ) : (
        <div className="mt-2">
          {/* <img src={icon} alt="icon" className="w-[1.875rem] h-[1.875rem]" /> */}
          <h2 className="text-black text-[1.042vw] font-semibold">{title}</h2>
          <p className="text-[0.729vw] text-[#6B7280]">{para}</p>
        </div>
      )}
      <div className="border-red-400 flex gap-4">
        <img src={notification} alt="notify" className="w-[1.25vw]" />
        <img src={message} alt="message" className="w-[1.25vw]" />
        <div>
          <OptionButton
            key={data?.id}
            pro
            options={[
              <div className="flex flex-col gap-3 justify-start m-auto">
                <Link to="/settings" className="flex gap-2">
                  <p className="text-[0.833vw] text-black">Settings</p>
                </Link>
                <Link className="flex gap-2" onClick={rfidhandle}>
                  <p className="text-[0.833vw] text-black">Logout</p>
                </Link>
              </div>,
            ]}
          />
          {modalshow && (
            <Modal modalshow={modalshow} setModalShow={setModalShow}>
              <h1 className="text-[0.833vw] flex justify-center">
                Do you really want to log out?
              </h1>
              <div className="flex gap-7 justify-center">
                <Button
                  backgroundColor="white"
                  content="Cancel"
                  width="9.792vw"
                  type="submit"
                  color="black"
                  border="1px solid gray"
                  font="0.833vw"
                  onClick={() => setModalShow(!modalshow)}
                />
                <Button
                  backgroundColor="#8CC63F"
                  content="Logout"
                  width="9.792vw"
                  type="submit"
                  color="white"
                  border="1px solid gray"
                  font="0.833vw"
                  onClick={handleLogout}
                />
              </div>
            </Modal>
          )}
        </div>
        <div>
          <h5 className="text-[0.833vw]">
            {user?.first_name} {user?.last_name}
          </h5>
          <p className="text-[0.729vw] text-[#8A92A6]">{userAdmin()}</p>
        </div>
      </div>
    </div>
  );
};

export default Header;
