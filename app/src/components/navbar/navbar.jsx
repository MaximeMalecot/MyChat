import React from 'react';
import classes from './navbar.module.scss';
import SearchIcon from '../../assets/svg/search-icon.svg';
import MessengerIcon from '../../assets/svg/messenger-icon.svg';

export default function Navbar(){
    return(
        <div className={classes.navbar}>
            <img src={""} alt="Logo"/>
            <div className={classes.searchDiv}>
                <img src={SearchIcon} alt=""/>
                <input type="test" placeholder='Search on GESbook'/>
            </div>
            <div className={classes.tabs}>
                <div className={`${classes.tabItem} ${classes.messengerIcon}`}>
                    <img src={MessengerIcon} alt="messenger icon"/>
                </div>
                <div className={`${classes.tabItem} ${classes.profileIcon}`}>
                    <img src={"https://i.stack.imgur.com/l60Hf.png"} alt="profile icon"/>
                </div>
            </div>
        </div>
    )
}