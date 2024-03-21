import React from "react";
import { Route, Routes } from "react-router-dom";
import Main from "./Main";

export default function Router() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Main />} />
        {/* <Route path="/" element={<Main />}></Route>
        <Route path="/" element={<Main />}></Route> */}
      </Routes>

      {/* 다른 페이지 */}
      {/* <Route path="/today" element={}></Route> */}
      {/* 잘못된 페이지 */}
      {/* <Route path="/*" element={}></Route> */}
    </>
  );
}
