import React from "react";
import Auth from "../components/Auth";
import ErrorMessage from "../components/ErrorMessage.jsx";
import RouteViews from "./RouteViews.jsx";
import NavBar from "./NavBar.jsx";

export default function App() {
  return (
    <div>
      <RouteViews />
      <NavBar />
    </div>
  );
}
