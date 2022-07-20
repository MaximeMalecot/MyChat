import React, { useState } from "react";
import {Routes, Route } from "react-router-dom";
import Techno from "./techno/techno";
export default function admin() {
  return (
    <div>
      <Routes>
        <Route path="/profile" element={<div> PROFIL ADMIN </div>} />
        <Route path="/technos" element={<Techno/>} />
        <Route path="*" element={<div> HOME ADMIN</div>} />
      </Routes>
    </div>
  );
}
