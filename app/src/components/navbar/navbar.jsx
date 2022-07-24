import React, { useState, useEffect, useRef } from 'react';
import classes from './navbar.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Logo from '../../assets/svg/logo.svg';
import SearchIcon from '../../assets/svg/search-icon.svg';
import MessengerIcon from '../../assets/svg/messenger-icon.svg';
import { useAppContext } from '../../contexts/app-context';
import UserService from '../../services/user.service';
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
    const [notifications, setNotifications] = useState([]);
    const { appState, dispatch } = useAppContext();
    const menuMobile = useRef(null);

    const logout = () => {
        dispatch({ action: "LOGOUT" });
        window.location.reload();
    };

    useEffect(() => {
        if(!appState.eventSource) return;

        const handleNotification = e => {
            let msg = JSON.parse(e.data).data;
            notify(msg);
        };

        appState.eventSource.addEventListener('new_notification', handleNotification);
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
    
    const handleMenuMobile = () => {
        menuMobile.current.classList.toggle(classes.displayNone);
    }

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
                <div>
                    {
                        notifications.length > 0 ?
                                <button>{notifications.length}</button>
                            :   
                            null
                    }
                </div>
                <Link to="/messages" className={`${classes.tabItem} ${classes.messengerIcon}`}>
                    <img src={MessengerIcon} alt="messenger icon"/>
                </Link>
                <button onClick={logout}>Logout</button>
                <Link to="/profile" className={`${classes.tabItem} ${classes.profileIcon}`}>
                    <img src={"https://i.stack.imgur.com/l60Hf.png"} alt="profile icon"/>
                </Link>
                <div className={classes.hamburgerLines} onClick={handleMenuMobile}>
                    <span className={`${classes.line} ${classes.line1}`}></span>
                    <span className={`${classes.line} ${classes.line2}`}></span>
                    <span className={`${classes.line} ${classes.line3}`}></span>
                </div>  
                
            </div>
            
        </header>
        {/* <div ref={menuMobile} className={`${classes.mobileMenu} ${classes.displayNone}`}>
            <Link to="/messages">
                Messenger
            </Link>
            <Link to="/profile">
                Profile
            </Link>
        </div> */}
    </>
    )
}