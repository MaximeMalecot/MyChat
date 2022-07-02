import React, {lazy, Suspense} from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";

const Home = lazy(()=> import('./pages/home/home'));

function App(){
    return (
        <Router>
            <Navbar/>
            <Suspense fallback={() => <p>Loading</p>}>
                <Routes>
                    <Route path="*" element={<Home/>}/>
                </Routes>
            </Suspense>
            <Footer/>
        </Router>
    )
}

export default App;