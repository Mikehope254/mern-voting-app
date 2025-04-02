import React from "react";
import { connect } from "react-redux";
import { Routes, Route, withRouter } from "react-router-dom";
import AuthPage from "../pages/AuthPage.jsx";

const RouteViews = () => (
  <main>
    <Routes>
      <Route exact path="/login" element={<AuthPage authType="login" />} />
      <Route
        exact
        path="/register"
        element={<AuthPage authType="register" />}
      />
    </Routes>
  </main>
);

export default RouteViews;
