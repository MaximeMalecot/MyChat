import React, { lazy, Suspense, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Navbar from "./components/navbar/navbar";
import Footer from "./components/footer/footer";
import { useAppContext } from "./contexts/app-context";
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

	useEffect(()=>{
		if(!appState.eventSource){
			let url = "http://localhost:3000/sse?"
			if(localStorage.getItem('client_id')){
				url += "client_id=" + localStorage.getItem('client_id') + "&";
			}
			if(appState.auth.token){
				url += "token=" + appState.auth.token;
			}
			const eventSource = new EventSource(
				url,
				{
					withCredentials: true,
				}
			);
			dispatch({action: "SET_EVENT_SOURCE", payload: eventSource});
		} else {
			appState.eventSource.addEventListener('connect', (e) => {
				const client_id = JSON.parse(e.data).client_id;
				localStorage.setItem('client_id', client_id);
				console.log("connected");
			})
	
			appState.eventSource.addEventListener('auth', (e) => {
				console.log('fonctionnel');
			})
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
