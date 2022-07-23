import React, {lazy, Suspense, useEffect} from "react";
import { AppContextProvider, useAppContext } from "./contexts/app-context";
import AppRouter from './app-router';
import {BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";

function App(){
    return (
        <AppContextProvider>
            <Router>
                <AppRouter/>
            </Router>
        </AppContextProvider>
    )
}

export default App;