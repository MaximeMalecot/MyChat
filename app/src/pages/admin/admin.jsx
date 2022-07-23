import React, { useState, lazy } from "react";
import {Routes, Route } from "react-router-dom";

const PageIntrouvable = lazy(() => import("../404/index"));
const Techno = lazy(() => import("./techno/techno"));
const Home = lazy(() => import("./home/home"));
export default function admin() {
  return (
    <div>
      <Routes>
        <Route path="/profile" element={<div> PROFIL ADMIN </div>} />
        <Route path="/techno" element={<Techno/>} />
        <Route path="/" element={<Home/>} />
        <Route path="*" element={<PageIntrouvable />} />
      </Routes>
    </div>
  );
}
