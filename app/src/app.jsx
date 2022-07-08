import React, {lazy, Suspense, useEffect} from "react";
import {BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import { AppContextProvider } from "./contexts/app-context";

const Home = lazy(()=> import('./pages/home/home'));
const MonProfil = lazy(()=> import('./pages/profile'));
const CreateFiliere = lazy(()=> import('./pages/admin/createFiliere'));
const PageIntrouvable = lazy(()=> import('./pages/404'));
const Login = lazy(()=> import('./pages/login/login'));
const Search = lazy(()=> import('./pages/search/search'));

function App(){

    useEffect(()=>{
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
    }, [])

    return (
        <AppContextProvider>
            <Router>
                <Navbar/>
                <Suspense fallback={() => <p>Loading</p>}>
                    <Routes>
                        <Route path="/profile" element={<MonProfil/>}/>
                        <Route path="/create-filiere" element={<CreateFiliere/>}/>
                        <Route path="/page-introuvable" element={<PageIntrouvable/>}/>
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