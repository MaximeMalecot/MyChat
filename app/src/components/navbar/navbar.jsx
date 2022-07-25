import React, { useState, useEffect, useRef } from 'react';
import classes from './navbar.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Divide as MobileMenu } from 'hamburger-react';

import Logo from '../../assets/svg/logo.svg';
import SearchIcon from '../../assets/svg/search-icon.svg';
import MessengerIcon from '../../assets/svg/messenger-icon.svg';
import BellIcon from '../../assets/svg/bell-icon.svg';

import UserService from '../../services/user.service';
import AuthService from '../../services/auth.service';
import NotificationService from '../../services/notification.service';

import NotificationCenter from '../notification-center/notification-center';

import { useAppContext } from '../../contexts/app-context';

import { API } from "../../constants/base";
import { notify } from '../../helpers/toasts';

const ResultItem = ({data}) => {
    const navigate = useNavigate();
    return(
        <Link to={data.url} className={`${classes.searchResult}`}>
            <div className={classes.picture}>
                <img src={data.picture}/>
            </div>
            <p>{data.firstName} {data.lastName}</p>
        </Link>
    )

};

export default function Navbar(){
    const navigate = useNavigate();
    const location = useLocation();
    const [searchEntry, setSearchEntry] = useState("");
    const [results, setResults] = useState([]);
    const [notifications, setNotifications] = useState(0);
    const [ showNotificationCenter, setShowNotificationCenter ] = useState(false);
    const { appState, dispatch } = useAppContext();
    const menuMobile = useRef(null);
    const [displayMobileMenu, setDisplayMobileMenu] = useState(false);

    const logout = async () => {
        let res = await AuthService.logout();
        if(res){
            dispatch({ action: "LOGOUT" });
            window.location.reload();
        }
    };

    const openNotificationCenter = () => {
        setShowNotificationCenter(true); 
        setNotifications(0);
    }

    const getNotifications = async () => {
        let res = await NotificationService.getAll();
        if(res === false){
            return;
        }else{
            setNotifications(res.notifications.length);
        }
        
    };

    useEffect(()=>{
        getNotifications();
    }, []);

    useEffect(() => {
        if(!appState.eventSource) return;

        const handleNotification = e => {
            let msg = JSON.parse(e.data).data;
            notify(msg);
            setNotifications(notifications + 1);
        };

        appState.eventSource.addEventListener('new_notification', handleNotification);
        return () => {
            if(appState.eventSource) appState.eventSource.removeEventListener('new_notification', handleNotification);
            setNotifications(0);
        }
    }, [appState]);

    useEffect(()=>{
        const search = async() => {
            if(searchEntry.length > 0){
                let res = await UserService.search(searchEntry)
                setResults(res);
            }else{
                if(results.length > 0){
                    setResults([]);
                }
            }
        }
        search();
    }, [ searchEntry ]);

    useEffect(()=>{
        setSearchEntry("");
    }, [location]);

    if((location.pathname).startsWith('/login')) return null;

    return(
        <>
        <header className={classes.navbar}>
            <Link to="/">
                <div className={classes.logo}>
                    <span>G</span>
                </div>
            </Link>
            <div
                className={classes.searchDiv}
                onBlur={e => (!e.relatedTarget || searchEntry.length < 1 ) && setSearchEntry("")} >
                <img src={SearchIcon} alt=""/>
                <input
                    value={searchEntry}
                    onChange={e=>setSearchEntry(e.target.value)}
                    type="test" 
                    placeholder='Search on GESbook'/>

                {searchEntry.length > 0 && <div className={classes.searchResults}>
                    {results.length > 0 && results.map( (res, idx) => 
                        <ResultItem 
                            data={{...res, url: `/user/${res?.userId}` }}
                            key={idx} />
                    )}
                    <ResultItem data={{
                        picture: SearchIcon, 
                        firstName: `Search ${searchEntry}`,
                        url: `/search/${searchEntry}`
                        }}/>
                </div>}
            </div>
            <div className={classes.tabs}>
                <div onClick={openNotificationCenter} className={`${classes.tabItem} ${classes.bellIcon}`} >
                    <img src={BellIcon} alt=""/>
                    {notifications > 0 && <span className={classes.counter}>{notifications}</span>}
                </div>
                <Link to="/messages" className={`${classes.tabItem} ${classes.messengerIcon}`}>
                    <img src={MessengerIcon} alt="messenger icon"/>
                </Link>
                <button className={classes.logout} onClick={logout}>X</button>
                <Link to="/profile" className={`${classes.tabItem} ${classes.profileIcon}`}>
                    <img src={"https://i.stack.imgur.com/l60Hf.png"} alt="profile icon"/>
                </Link> 

                <div className={classes.mobileMenu}>
                    <MobileMenu
                        color={displayMobileMenu ? 'white' : 'black'}
                        size={25}
                        rounded
                        toggled={displayMobileMenu} 
                        toggle={()=>setDisplayMobileMenu(!displayMobileMenu)}
                    />
                </div>

                {displayMobileMenu && <div className={classes.mobileNavigation}>
                    <ul>
                        <li onClick={() => setDisplayMobileMenu(false)}>
                            <Link to="/" >Home</Link>
                        </li>

                        <li onClick={() => setDisplayMobileMenu(false)}>
                            <Link to="/profile" >Profile</Link>
                        </li>

                        <li onClick={() => {setDisplayMobileMenu(false); logout(); }}>
                            <Link to="/about-us" >Logout</Link>
                        </li>

                    </ul>
                </div>}

            </div>
            
        </header>
        <NotificationCenter visible={showNotificationCenter} setVisible={setShowNotificationCenter}/>
    </>
    )
}