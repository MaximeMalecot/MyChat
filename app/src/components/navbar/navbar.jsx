import React, { useState, useEffect, useRef } from 'react';
import classes from './navbar.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Logo from '../../assets/svg/logo.svg';
import SearchIcon from '../../assets/svg/search-icon.svg';
import MessengerIcon from '../../assets/svg/messenger-icon.svg';
import { useAppContext } from '../../contexts/app-context';
import UserService from '../../services/user.service';
import { API } from "../../constants/base";

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
    const { appState } = useAppContext();

    useEffect(() => {
        // let url = `${API}/notification?token=${localStorage.getItem('token')}`;
        // const eventSource = new EventSource(
        //     url,
        //     {
        //         withCredentials: true,
        //     }
        // )

        // eventSource.addEventListener('connect', (e) => {
        //     let data = JSON.parse(e.data);
        //     if(Object.values(data).length > 0){
        //         setNotifications(Object.values(data));
        //     }
        //     console.log(notifications);
        // })

        // eventSource.addEventListener('new', (e) => {
        //     const data = JSON.parse(e.data);
        //     setNotifications(notifications => [...notifications, data]);
        //     console.log(notifications);
        // });
    });

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
        <div className={classes.navbar}>
            <Link to="/">
                <img 
                    className={classes.logo} 
                    src={Logo} 
                    alt="Logo"/>
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
                <Link to="/profile" className={`${classes.tabItem} ${classes.profileIcon}`}>
                    <img src={"https://i.stack.imgur.com/l60Hf.png"} alt="profile icon"/>
                </Link>
            </div>
        </div>
    )
}