import React, { useEffect, useState } from "react";
import { Link, Outlet } from "react-router-dom";
import logo from "../../assets/sidebar/logo.svg";
import dashboardIcon from "../../assets/sidebar/Category.svg";
import hostIcon from "../../assets/sidebar/Location.svg";
import promoIcon from "../../assets/sidebar/Ticket Star.svg";
import propertiesIcon from "../../assets/sidebar/home.svg";
import chargerIcon from "../../assets/sidebar/charging.svg";
import rfidIcon from "../../assets/sidebar/Shield Done.svg";
import customerIcon from "../../assets/sidebar/User.svg";
import reportIcon from "../../assets/sidebar/Danger.svg";
import helpIcon from "../../assets/sidebar/Frame.svg";
import walletIcon from "../../assets/Dashboard/Wallet.svg";
import transactionIcon from "../../assets/sidebar/Document.svg";
import settingIcon from "../../assets/sidebar/Setting.svg";
import dashboardHover from "../../assets/sidebar/hover/Category.svg";
import hostHover from "../../assets/sidebar/hover/Location.svg";
import propertiesHover from "../../assets/sidebar/hover/home.svg";
import customerHover from "../../assets/sidebar/hover/User.svg";
import chargingHover from "../../assets/sidebar/hover/Charging.svg";
import rfidHover from "../../assets/sidebar/hover/Shield Done.svg";
import reportHover from "../../assets/sidebar/hover/Danger.svg";
import walletHover from "../../assets/sidebar/hover/Wallet.svg";
import transactionHover from "../../assets/sidebar/hover/Transactions.svg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { readUser } from "../../services/localStorage.service";

const Sidebar = () => {
  const [activeMenuItem, setActiveMenuItem] = useState("Dashboard");
  const [open, setOpen] = useState(true);
  const shadowStyle = {
    boxShadow: "0px 10px 30px 0px rgba(17, 38, 146, 0.05)",
  };

  const LoginAdmin = readUser();

  const data = [
    {
      id: 1,
      title: "HOME",
      submenu: [
        {
          id: 1,
          img: dashboardIcon,
          imgActive: dashboardHover,
          name: "Dashboard",
          url: "/dashboard",
        },
      ],
    },
    {
      id: 2,
      title: "CHARGER MANAGEMENT",
      submenu: [
        {
          id: 1,
          img: hostIcon,
          imgActive: hostHover,
          name: "Host",
          url: "/host",
        },
        {
          id: 2,
          img: promoIcon,
          name: "Promocode",
          url: "/promocode",
        },
        {
          id: 3,
          img: propertiesIcon,
          imgActive: propertiesHover,
          name: "Properties",
          url: "/properties",
        },
        {
          id: 4,
          img: chargerIcon,
          imgActive: chargingHover,
          name: "Chargers",
          url: "/chargers",
        },
        {
          id: 5,
          img: rfidIcon,
          imgActive: rfidHover,
          name: "RFid",
          url: "/rfid",
        },
        {
          id: 6,
          img: customerIcon,
          imgActive: customerHover,
          name: "Customers",
          url: "/customers",
        },
        // {
        //   id: 7,
        //   img: reportIcon,
        //   imgActive: reportHover,
        //   name: "Reports",
        //   url: "/reports",
        // },
      ],
    },
    {
      id: 3,
      title: "TRANSACTIONS",
      submenu: [
        {
          id: 1,
          img: walletIcon,
          imgActive: walletHover,
          name: "Wallet Recharges",
          url: "/wallet",
        },
        {
          id: 2,
          img: transactionIcon,
          imgActive: transactionHover,
          name: "Transactions",
          url: "/transactions",
        },
        {
          id: 3,
          img: settingIcon,
          name: "Settings",
          url: "/settings",
        },
      ],
    },
    {
      id: 4,
      title: "HELP",
      submenu: [
        {
          id: 1,
          img: helpIcon,
          name: "Need Help",
          url: "/help",
        },
      ],
    },
  ];

  let allowedMenuItems = [];

  if (LoginAdmin.role === 0) {
    allowedMenuItems = data.reduce(
      (acc, menuItem) =>
        acc.concat(menuItem.submenu.map((subItem) => subItem.name)),
      []
    );
  } else if (LoginAdmin.role === 2) {
    allowedMenuItems = [
      "Dashboard",
      "Host",
      "Promocode",
      "Chargers",
      "Customers",
      "Reports",
      "Wallet Recharges",
      "Transactions",
      "Settings",
    ];
  } else if (LoginAdmin.role === 3) {
    allowedMenuItems = [
      "Dashboard",
      "Host",
      "Chargers",
      "Wallet Recharges",
      "Transactions",
      "Settings",
    ];
  }

  const handleMenuItemClick = (menuItemName) => {
    setActiveMenuItem(menuItemName);
    localStorage.setItem("activeMenuItem", menuItemName);
  };

  useEffect(() => {
    if (localStorage.getItem("activeMenuItem")) {
      setActiveMenuItem(localStorage.getItem("activeMenuItem"));
    }
  }, []);
  // useEffect(() => {
  //   if (localStorage.getItem("activeMenuItem")) {
  //     setActiveMenuItem(localStorage.getItem("activeMenuItem"));
  //   } else {
  //     const userlogin = readUser();
  //     if (userlogin.role === 2) {
  //       setActiveMenuItem("Host");
  //     }
  //   }
  // }, []);

  return (
    <div className="w-[100%] h-[auto] flex flex-cols-2">
      <div
        className={`${open ? "w-[15%]" : "w-[5%]"} h-[67.5rem]`}
        style={shadowStyle}
      >
        <div className=" px-[1.25vw] pt-[1.875vw]">
          <div className="flex relative">
            <img src={logo} alt="logo" />
            <FontAwesomeIcon
              icon={faArrowLeft}
              className=" text-white bg-[#8CC63F] rounded-full p-2 text-[0.833vw] absolute -right-9 cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          </div>
          <ul>
            {data.map((menuItem, index) => (
              <li key={index.id} className="pt-5 font-Inter">
                <span
                  className={`text-[0.833vw] font-semibold text-[#ADB5BD] ${
                    !open && "hidden"
                  }`}
                >
                  {menuItem.title}
                </span>
                <ul className=" border-b-2 pt-4">
                  {menuItem.submenu
                    .filter((subItem) =>
                      allowedMenuItems.includes(subItem.name)
                    )
                    .map((subItem) => (
                      <Link
                        to={subItem.url}
                        onClick={() => handleMenuItemClick(subItem.name)}
                      >
                        <li
                          key={subItem.name}
                          className={`flex gap-3 py-[0.625vw] items-center ${
                            subItem.name === activeMenuItem
                              ? "bg-[#8CC63F] rounded"
                              : ""
                          }`}
                        >
                          <img
                            src={
                              subItem.name === activeMenuItem
                                ? subItem.imgActive
                                : subItem.img
                            }
                            alt="icon"
                            className={` ${!open ? "pl-0" : "pl-4"}`}
                          />

                          <span
                            className={`text-[0.833vw] font-normal ${
                              !open && "hidden"
                            } ${
                              subItem.name === activeMenuItem
                                ? "text-white"
                                : "text-[#8A92A6]"
                            }`}
                          >
                            {subItem.name}
                          </span>
                        </li>
                      </Link>
                    ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className={`w-[85%] border-red-800 ${!open && "w-[95%]"}`}>
        <Outlet />
      </div>
    </div>
  );
};

export default Sidebar;
