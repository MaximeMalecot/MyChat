import React, {lazy, Suspense} from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";

const Home = lazy(()=> import('./pages/home/home'));
const Login = lazy(()=> import('./pages/login/login'));

function App(){
    return (
        <Router>
            <Navbar/>
            <Suspense fallback={() => <p>Loading</p>}>
                <Routes>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="*" element={<Home/>}/>
                </Routes>
            </Suspense>
            <Footer/>
        </Router>
    )
}

export default App;