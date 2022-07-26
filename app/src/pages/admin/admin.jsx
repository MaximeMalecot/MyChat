import React, { lazy } from "react";
import {Routes, Route } from "react-router-dom";

const PageIntrouvable = lazy(() => import("../404/index"));
const Techno = lazy(() => import("./techno/techno"));
const Field = lazy(() => import("./field/field"));
const Home = lazy(() => import("./home/home"));
const Analytics = lazy(() => import("./analytics/analytics"));
const Moderation = lazy(() => import("./moderation/moderation"));
const Users = lazy(() => import("./users/users"));
const Logs = lazy(() => import("./logs/logs"));

export default function admin() {
  return (
    <div>
      <Routes>
        <Route path="/profile" element={<div> PROFIL ADMIN </div>} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/logs" element={<Logs />} />
        <Route path="/moderation" element={<Moderation />} />
        <Route path="/users" element={<Users />} />
        <Route path="/techno" element={<Techno/>} />
        <Route path="/field" element={<Field/>} />
        <Route path="/" element={<Home/>} />
        <Route path="*" element={<PageIntrouvable />} />
      </Routes>
    </div>
  );
}
