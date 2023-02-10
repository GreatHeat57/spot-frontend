import React from "react";
import Home from "pages/home";
import DefaultLayout from "components/layouts/default";
import { Routes, Route } from "react-router-dom";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<DefaultLayout children={<Home />} />} />
    </Routes>
  );
};

export default Router;
