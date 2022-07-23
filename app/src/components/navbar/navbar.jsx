import React, { useState, useEffect, useRef } from 'react';
import classes from './navbar.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Logo from '../../assets/svg/logo.svg';
import SearchIcon from '../../assets/svg/search-icon.svg';
import MessengerIcon from '../../assets/svg/messenger-icon.svg';
import { useAppContext } from '../../contexts/app-context';
import UserService from '../../services/user.service';

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

const MOCK_RESULT = {
    id: "4454-3444",
    picture: 'https://www.informatique-mania.com/wp-content/uploads/2021/04/foto-sin-rostro-de-facebook-780x470.jpg?ezimgfmt=rs:0x0/rscb1/ng:webp/ngcb1', 
    name: 'TEST'
};



export default function Navbar(){
    const navigate = useNavigate();
    const location = useLocation();
    const [searchEntry, setSearchEntry] = useState("");
    const [results, setResults] = useState([]);
    const { appState } = useAppContext();
    const menuMobile = useRef(null);

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
                <Link to="/messages" className={`${classes.tabItem} ${classes.messengerIcon}`}>
                    <img src={MessengerIcon} alt="messenger icon"/>
                </Link>
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
        <div ref={menuMobile} className={`${classes.mobileMenu} ${classes.displayNone}`}>
            <Link to="/messages">
                Messenger
            </Link>
            <Link to="/profile">
                Profile
            </Link>
        </div>
    </>
    )
}