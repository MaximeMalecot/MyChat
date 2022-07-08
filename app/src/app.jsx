import React, {lazy, Suspense, useEffect} from "react";
import { AppContextProvider, useAppContext } from "./contexts/app-context";
import AppRouter from './app-router';
import {BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";

function App(){
    const { appState } = useAppContext();

    useEffect(()=>{
        console.log(appState)
        let url = "http://localhost:3000/analytics/connect"
        if(localStorage.getItem('client_id')){
            url += "?client_id=" + localStorage.getItem('client_id');
        }
        const eventSource = new EventSource(
            url,
            {
                withCredentials: true,
            }
        );

        eventSource.addEventListener('connect', (e) => {
            const client_id = JSON.parse(e.data).client_id;
            localStorage.setItem('client_id', client_id);
        })
    }, []);

    return (
        <AppContextProvider>
            <Router>
                <AppRouter/>
            </Router>
        </AppContextProvider>
    )
}

export default App;