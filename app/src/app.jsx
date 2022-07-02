import React, {lazy, Suspense} from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";

const Home = lazy(()=> import('./pages/home/home'));
const MonProfil = lazy(()=> import('./pages/monprofil'));
const PageIntrouvable = lazy(()=> import('./pages/404'));

function App(){
    return (
        <Router>
            <Navbar/>
            <Suspense fallback={() => <p>Loading</p>}>
                <Routes>
                    <Route path="/mon-profil" element={<MonProfil/>}/>
                    <Route path="/" element={<Home/>}/>
                    <Route path="*" element={<PageIntrouvable/>}/>
                </Routes>
            </Suspense>
            <Footer/>
        </Router>
    )
}

export default App;