import React, { useState, useEffect } from 'react';
import MessageService from "../../services/message.service";
import { useAppContext } from "../../contexts/app-context";
import classes from "./conversation.module.scss";
import { PROFILE_PICTURE } from "../../constants/assets.js";
import { displayMsg } from "../../helpers/toasts.js";
import { Link } from 'react-router-dom';

export const Conversation = ({selected}) => {
    const { appState } = useAppContext();
    const [ messages, setMessages ] = useState([]);
    const [ currInput, setCurrInput ] = useState("");

    const sendMessage = async () => {
        let res = await MessageService.send(selected.userId, currInput);
        if( res !== true){
            displayMsg("An error occurred, could not send this message", "error");
        }else{
            setCurrInput("");
        }
    };

    useEffect(()=>{
        // appState.eventSource.addEventListener('new_message', (e) => {
        //      setMessages([...messages, e])
        // })
        return () => {
            setMessages([]);
            setCurrInput("");
            //Remove eventListener
        }
    }, [selected]);

    return (
        <div className={classes.conversation}>

            <div className={classes.header}>
                <div className={classes.img_container}>
                    <img src={PROFILE_PICTURE} alt="profile"/>
                </div>
                <h4>{selected.firstName} {selected.lastName}</h4>
                <Link to={`/user/${selected.userId}`} target={"_blank"}>
                    <button className={"btn green"}>View profile</button>
                </Link>
            </div>

            <div className={classes.messagesContainer}>
                {
                    messages.length > 0
                    ? <></>
                    : <p style={{fontStyle: "italic"}}>Looks like you never talked to each other yet</p>
                }
            </div>

            <div className={classes.input}>
                <input
                    placeholder='Write something'
                    value={currInput} 
                    onChange={e=>setCurrInput(e.target.value)}
                />
                <button
                    className='btn blue' 
                    onClick={sendMessage}>Send</button>
            </div>

        </div>
    )
};