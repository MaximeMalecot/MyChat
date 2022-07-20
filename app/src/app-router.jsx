import React, {lazy, Suspense, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import { useAppContext } from "./contexts/app-context";

const Home = lazy(()=> import('./pages/home/home'));
const MonProfil = lazy(()=> import('./pages/profile'));
const PageIntrouvable = lazy(()=> import('./pages/404'));
const Login = lazy(()=> import('./pages/login/login'));
const Search = lazy(()=> import('./pages/search/search'));
const CreateField = lazy(()=> import('./pages/admin/createField'));

export default function AppRouter(){
    const { appState } = useAppContext();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(()=>{
        if(!appState.auth.token){
            navigate('/login');
        }        
    }, [appState]);

    return(
        <>
            <Navbar/>
            <Suspense fallback={() => <p>Loading</p>}>
                <Routes>
                    <Route 
                        path="/profile" 
                        element={<MonProfil/>}/>
                    <Route 
                        path="/page-introuvable" 
                        element={<PageIntrouvable/>}/>
                    <Route
                        path="/login" 
                        element={<Login/>}/>
                    <Route
                        path="/search/:query" 
                        element={<Search/>}/>
                    <Route 
                        path="/create-field" 
                        element={<CreateField/>}/>

                    <Route
                        path="*" 
                        element={<Home/>}/>
                </Routes>
            </Suspense>
            <Footer/>
        </>
    )
};

