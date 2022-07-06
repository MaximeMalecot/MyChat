import React, {lazy, Suspense, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import { AppContextProvider } from "./contexts/app-context";

const Home = lazy(()=> import('./pages/home/home'));
const Login = lazy(()=> import('./pages/login/login'));

function App(){
    useEffect(()=>{
        let url = "http://localhost:3000/connect"
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
    }, [])

    return (
        <Router>
            <AppContextProvider>
                <Navbar/>
                <Suspense fallback={() => <p>Loading</p>}>
                    <Routes>
                        <Route path="/login" element={<Login/>}/>
                        <Route path="*" element={<Home/>}/>
                    </Routes>
                </Suspense>
                <Footer/>
            </AppContextProvider>
        </Router>
    )
}

export default App;