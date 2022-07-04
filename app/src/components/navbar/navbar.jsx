import React, { useState, useEffect, useRef } from 'react';
import classes from './navbar.module.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';

import Logo from '../../assets/svg/logo.svg';
import SearchIcon from '../../assets/svg/search-icon.svg';
import MessengerIcon from '../../assets/svg/messenger-icon.svg';
import { useAppContext } from '../../contexts/app-context';

const ResultItem = ({data}) => {
    const navigate = useNavigate();

    return(
        <Link to={data.url} className={`${classes.searchResult}`}>
            <div className={classes.picture}>
                <img src={data.picture}/>
            </div>
            <p>{data.name}</p>
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

    useEffect(()=>{
        if(searchEntry.length > 0){
            setResults([ MOCK_RESULT, MOCK_RESULT, MOCK_RESULT])
        }else{
            if(results.length > 0){
                setResults([]);
            }
        }
    }, [ searchEntry]);

    useEffect(()=>{
        setSearchEntry("");
    }, [location]);

    if(appState.hideNavbar) return null;
    
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
                            data={{...res, url: `/profile/${res?.id}` }}
                            key={idx} />
                    )}
                    <ResultItem data={{
                        picture: SearchIcon, 
                        name: `Search ${searchEntry}`,
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
            </div>
        </div>
    )
}