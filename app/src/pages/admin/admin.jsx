import React, { useState } from "react";
import {Routes, Route } from "react-router-dom";
import Techno from "./techno/techno";
import Home from "./home/home";
export default function admin() {
  return (
    <div>
      <Routes>
        <Route path="/profile" element={<div> PROFIL ADMIN </div>} />
        <Route path="/techno" element={<Techno/>} />
        <Route path="*" element={<Home/>} />
      </Routes>
    </div>
  );
}
