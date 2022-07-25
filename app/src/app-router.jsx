import React, { lazy, Suspense, useEffect, useLayoutEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useAppContext } from "./contexts/app-context";

import { SSE_URL } from './constants/urls.js';

import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import AdminRooter from "./pages/admin/admin";

const Home = lazy(() => import("./pages/home/home"));
const Profile = lazy(() => import("./pages/profile/profile"));
const User = lazy(() => import("./pages/user/user"));
const PageIntrouvable = lazy(() => import("./pages/404"));
const Login = lazy(() => import("./pages/login/login"));
const Search = lazy(() => import("./pages/search/search"));
const CreateField = lazy(() => import("./pages/admin/createField"));
const Messages = lazy(() => import("./pages/messages/messages"));

export default function AppRouter() {
	const { appState, dispatch } = useAppContext();
	const navigate = useNavigate();
	const location = useLocation();

	const initEventSource = () => {
		let url = SSE_URL;
		let { client_id } = appState;

		if(client_id){
			url += "client_id=" + client_id + "&";
		}
	
		if(appState.auth.token){
			url += "token=" + appState.auth.token;
		}
		const eventSource = new EventSource( url, { withCredentials: true } );
		
		eventSource.addEventListener('connect', (e) => {
			const clientId = JSON.parse(e.data).client_id;
			dispatch({action: "SET_CLIENT_ID", payload: {client_id: clientId}});
			console.log("connected");
		});

    dispatch({action: "SET_EVENT_SOURCE", payload: eventSource});

	};

	useEffect(()=>{
    console.log(appState);
    if( !appState.eventSource ){
      console.log('On restart le init');
      initEventSource();
    }
    return () => {
      if(appState.eventSource){
        //appState.eventSource.destroy();
      }
    }
	}, [appState]);

  useEffect(() => {
    if (!appState.auth.token) {
      navigate("/login");
    }
  }, [appState]);

  return (
    <div style={{minHeight: '100vh', position: 'relative', backgroundColor: '#006496'}}>
      <Navbar />
      <Suspense fallback={() => <p>Loading</p>}>
        <Routes>
          <Route path="/user/:id" element={<User />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/page-introuvable" element={<PageIntrouvable />} />
          <Route path="/login" element={<Login />} />
          <Route path="/search/:query" element={<Search />} />
          <Route path="/create-field" element={<CreateField />} />
          <Route path="/admin/*" element={<AdminRooter />} />
          <Route path="/" element={<Home />} />
          <Route path="*" element={<PageIntrouvable />} />
        </Routes>
      </Suspense>
      <ToastContainer />
      <Footer />
    </div>
  );
}
