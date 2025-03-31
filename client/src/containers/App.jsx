import React from "react";
import Auth from "../components/Auth";
import ErrorMessage from "../components/ErrorMessage.jsx";

export default function App() {
  return (
    <div>
      <Auth authType={"login"} />
      <ErrorMessage />
    </div>
  );
}
