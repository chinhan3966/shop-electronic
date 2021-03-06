import React, { useEffect, useState } from "react";
import { Route, Routes, useLocation } from "react-router-dom";
import App from "../App";
import Cart from "./page/Cart";
import Collections from "./page/Collections";
import Delivery from "./page/Delivery";
import Home from "./page/Home";
import Installment from "./page/Installment";
import Login from "./page/Login";
import Maintain from "./page/Maintain";
import Payment from "./page/Payment";
import Paypal from "./page/Paypal";
import ProductView from "./page/ProductView";
import ShowRoom from "./page/ShowRoom";
import SignUp from "./page/SignUp";
import Admin from "./admin/page/Admin";
import { AnimatePresence } from "framer-motion";
import Product from "./admin/page/Product";
import Staff from "./admin/page/Staff";
import Customer from "./admin/page/Customer";
import Category from "./admin/page/Category";
import Brand from "./admin/page/Brand";
import Bill from "./admin/page/Bill";
import Advertisement from "./admin/page/Advertisement";
import InformationUser from "./page/InformationUser";
import jwt_decode from "jwt-decode";
import axios from "axios";
import NotFound from "./common/NotFound";
import TestTiny from "./admin/page/TestTiny";
import Search from "./page/Search";
import ForgotPassword from "./page/ForgotPassword";
import InputCode from "./page/InputCode";
import ResetPassword from "./page/ResetPassword";
import { useSelector } from "react-redux";
import Sale from "./page/Sale";
import Voucher from "./admin/page/Voucher";
const AnimatedRoute = () => {
  const location = useLocation();
  const [admin, setAdmin] = useState(true);
  const informationUser = JSON.parse(sessionStorage.getItem("informationUser"));

  const signUp = useSelector((state) => state.blockpage.signUp);
  const login = useSelector((state) => state.blockpage.login);

  useEffect(async () => {
    var decoded = jwt_decode(informationUser);
    const { role } = decoded;
    console.log("check role", role);
    if (role === "ADMIN") {
      setAdmin(true);
    }
  }, [informationUser]);
  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="contact" element={<ShowRoom />} />
          <Route path="huong-dan-thanh-toan" element={<Payment />} />
          <Route path="huong-dan-tra-gop" element={<Installment />} />
          <Route path="chinh-sach-bao-hanh" element={<Maintain />} />
          <Route path="chinh-sach-van-chuyen" element={<Delivery />} />
          {login && <Route path="sign-in" element={<Login />} />}
          {signUp && <Route path="sign-up" element={<SignUp />} />}
          <Route path="product/:slug/:id" element={<ProductView />} />
          <Route path="collections/:slug/:id" element={<Collections />} />
          <Route path="collections/:search" element={<Search />} />
          <Route path="cart" element={<Cart />} />
          <Route path="paypal" element={<Paypal />} />
          <Route path="information" element={<InformationUser />} />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="input-secret-code" element={<InputCode />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="khuyen-mai" element={<Sale />} />

          <Route path="*" element={<NotFound />} />
        </Route>

        {admin && (
          <Route path="/admin" element={<Admin />}>
            <Route index element={<Product />} />
            <Route path="product" element={<Product />} />
            <Route path="staff" element={<Staff />} />
            <Route path="customer" element={<Customer />} />
            <Route path="category" element={<Category />} />
            <Route path="brand" element={<Brand />} />
            <Route path="bill" element={<Bill />} />
            <Route path="advertisement" element={<Advertisement />} />
            <Route path="voucher" element={<Voucher />} />
          </Route>
        )}
      </Routes>
    </AnimatePresence>
  );
};

export default AnimatedRoute;
