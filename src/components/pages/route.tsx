import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./Main";

export default function Router () :JSX.Element {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
      </Routes>
    </>
  );
}
