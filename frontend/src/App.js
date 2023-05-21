import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useContext } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./components/Admin/style/dark.scss";

import { Header, Footer, HeaderSignIn } from "./components/common";
import Explore from "./components/Explore/Explore";
import BecomeSeller from "./components/BecomeASeller/BecomeSeller";
import SigIn from "./components/SignIn/SigIn";
import LogIn from "./components/login/LogIn";
import JobProfile from "./components/Job/JobProfile";
import ShopView from "./components/Shop/ShopView";
import About from "./components/AboutUs/About";
import HomePage from "./components/Home/HomePage";
import HomePageSignIn from "./components/HomeSignIn/HomePageSignIn";
import Profile from "./components/Profile/Profile";
import ShopItem from "./components/NewShopItem/ShopItem";
import JobProfileShop from "./components/ShopItemView/JobProfile";
import { getList, getShopList } from "./reducers/Explore";
import PleaseLogIn from "./components/Error/PleaseLogIn/PleaseLogIn";
import Settings from "./components/Settings/Settings";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState("");

  const dispatch = useDispatch();

  const getExploreList = async () => {
    const res = await axios.get(`http://localhost:3420/api/job/view_all`);
    const resShop = await axios.get(`http://localhost:3420/api/shop/view_all`);

    res.data.result.forEach((element) => {
      dispatch(getList(element));
    });

    resShop.data.result.forEach((element) => {
      dispatch(getShopList(element));
    });
  };

  const checkLoggedIn = () => {
    const logIn = sessionStorage.getItem("is_logged_in");
    setIsLoggedIn(logIn);
  };

  useEffect(() => {
    getExploreList();
    checkLoggedIn();
  });

  return (
    <div className="App">
      {isLoggedIn === "true" ? (
        <BrowserRouter>
          <Header />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/about" element={<About />} />
            <Route path="/become-seller" element={<BecomeSeller />} />
            <Route path="/job" element={<JobProfile />} />
            <Route path="/shop" element={<ShopView />} />
            <Route path="/new-shop" element={<ShopItem />} />
            <Route path="/new-shop-item" element={<JobProfileShop />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/settings" element={<Settings />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      ) : (
        <BrowserRouter>
          <HeaderSignIn />
          <Routes>
            <Route path="/" element={<HomePageSignIn />} />
            <Route path="/sign-in" element={<SigIn />} />
            <Route path="/login" element={<LogIn />} />
            <Route path="/explore" element={<Explore />} />
            <Route path="/shop" element={<ShopView />} />
            <Route path="/about" element={<About />} />
            <Route path="/job" element={<PleaseLogIn />} />
            <Route path="/new-shop-item" element={<PleaseLogIn />} />
            <Route path="/new-shop" element={<PleaseLogIn />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      )}
    </div>
  );
}

export default App;
