import React, {lazy, Suspense, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import { AppContextProvider } from "./contexts/app-context";

const Home = lazy(()=> import('./pages/home/home'));
const Login = lazy(()=> import('./pages/login/login'));

function App(){
    useEffect(()=>{
        const polling =  (async() => {
            await fetch("http://localhost:3000/connect");
        })
        polling();
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