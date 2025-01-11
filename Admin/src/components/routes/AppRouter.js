import React, { useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import AuthLogin from "../auth/login/AuthLogin";
import AuthForgetPassword from "../auth/forgotPassword/AuthForgetPassword";
import AuthResetPassword from "../auth/resetPassword/AuthResetPassword";
import Host from "../../pages/admin/host/Host";
import PromoCode from "../../pages/admin/promocode/PromoCode";
import Properties from "../../pages/admin/properties/Properties";
import Chargers from "../../pages/admin/chargers/Chargers";
import RfId from "../../pages/admin/rfid/RfId";
import Customers from "../../pages/admin/customers/Customers";
import Reports from "../../pages/admin/reports/Reports";
import Wallet from "../../pages/admin/wallet/Wallet";
import Transactions from "../../pages/admin/transactions/Transactions";
import Settings from "../../pages/admin/settings/Settings";
import Help from "../../pages/admin/help/Help";
import Dashboard from "../../pages/admin/dashboard/Dashboard";
import HostAddnew from "../../pages/admin/host/HostAddnew";
import PropertiesAddnew from "../../pages/admin/properties/PropertiesAddnew";
import CustomerMain from "../../pages/admin/customers/components/CustomerMain";
import WalletAddnew from "../../pages/admin/wallet/WalletAddnew";
import Sidebar from "../sidebar/Sidebar";
import ProtectedRoute from "./ProtectedRoute";
import { useSelector } from "react-redux";
import PageNotFound from "../../pages/404Page/PageNotFound";
import { readUser } from "../../services/localStorage.service";
import { userLoginProtect } from "../common/Header";
import Charger from "../common/Properties/Charger";
import ChargersAddnew from "../../pages/admin/chargers/ChargersAddnew";

const AppRouter = () => {
  const authToken = useSelector((state) => state?.user?.user);

  // console.log(authToken);

  const protectedLayout = (
    <ProtectedRoute authToken={authToken}>
      <Sidebar />
    </ProtectedRoute>
  );

  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/login" element={<AuthLogin />} />
        <Route path="/forgotPassword" element={<AuthForgetPassword />} />
        <Route path="/resetPassword" element={<AuthResetPassword />} />
        <Route path="*" element={<PageNotFound />} />

        <Route
          path="/"
          element={<Navigate to={authToken ? "/dashboard" : "/login"} />}
        />
        <Route element={protectedLayout}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/host" element={<Host />} />
          <Route path="/host/:id" element={<HostAddnew />} />

          <Route path="/promocode" element={<PromoCode />} />
          <Route path="/properties" element={<Properties />} />
          <Route path="/properties/:id" element={<PropertiesAddnew />} />

          <Route path="/chargers" element={<Chargers />} />
          <Route path="/chargers/:id" element={<Charger />} />

          <Route path="/rfid" element={<RfId />} />
          <Route>
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:id" element={<CustomerMain />} />
          </Route>
          <Route path="/reports" element={<Reports />} />
          <Route path="/wallet" element={<Wallet />} />
          <Route path="/wallet/:id" element={<WalletAddnew />} />

          <Route path="/transactions" element={<Transactions />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/help" element={<Help />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
