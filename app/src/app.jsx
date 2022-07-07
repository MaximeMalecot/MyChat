import React, {lazy, Suspense, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import { AppContextProvider } from "./contexts/app-context";

const Home = lazy(()=> import('./pages/home/home'));
const Login = lazy(()=> import('./pages/login/login'));
const Search = lazy(()=> import('./pages/search/search'));

function App(){

    useEffect(()=>{
        const polling =  (async() => {
            await fetch("http://localhost:3000/connect");
        })
        polling();
    }, [])

    return (
        <AppContextProvider>
            <Router>
                <Navbar/>
                <Suspense fallback={() => <p>Loading</p>}>
                    <Routes>
                        <Route 
                            path="/login" 
                            element={<Login/>}/>
                        <Route 
                            path="/search/:query" 
                            element={<Search/>}/>
                        <Route 
                            path="*" 
                            element={<Home/>}/>
                    </Routes>
                </Suspense>
                <Footer/>
            </Router>
        </AppContextProvider>
    )
}

export default App;