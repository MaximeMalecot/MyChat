import React, { lazy, useState, useEffect } from "react";
import {Routes, Route } from "react-router-dom";
import { useAppContext } from "../../contexts/app-context";

const PageIntrouvable = lazy(() => import("../404/index"));
const Techno = lazy(() => import("./techno/techno"));
const Field = lazy(() => import("./field/field"));
const Home = lazy(() => import("./home/home"));
const Analytics = lazy(() => import("./analytics/analytics"));
const Moderation = lazy(() => import("./moderation/moderation"));
const Users = lazy(() => import("./users/users"));
const User = lazy(() => import("./user/user"));
const Logs = lazy(() => import("./logs/logs"));

export default function admin() {
	const { appState } = useAppContext();
  const [ hasAccess, setHasAccess ] = useState(false);

  useEffect(() => {
    if(appState.auth.isAdmin === true){
      setHasAccess(true);
    }
  }, [appState.auth]);

  return (
    <div>
      {
        hasAccess ?
          <Routes>
            <Route path="/profile" element={<div> PROFIL ADMIN </div>} />
            <Route path="/analytics" element={<Analytics />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/moderation" element={<Moderation />} />
            <Route path="/users/:id" element={<User />} />
            <Route path="/users" element={<Users />} />
            <Route path="/techno" element={<Techno/>} />
            <Route path="/field" element={<Field/>} />
            <Route path="/" element={<Home/>} />
            <Route path="*" element={<PageIntrouvable />} />
          </Routes>
          :
          "FORBIDDEN"
      }
    </div>
    
  );
}
