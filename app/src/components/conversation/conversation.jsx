import React, { useState, useEffect, useRef } from 'react';
import MessageService from "../../services/message.service";
import { useAppContext } from "../../contexts/app-context";
import classes from "./conversation.module.scss";
import { PROFILE_PICTURE } from "../../constants/assets.js";
import { displayMsg } from "../../helpers/toasts.js";
import { Link } from 'react-router-dom';

const MessageItem = ({message}) => {
    const { appState } = useAppContext();

    return(
        <div className={`${classes.messageItem} ${message.senderId == appState.auth.id ? classes.self : ""}`}>
            {message.content}
        </div>
    )
};

export const Conversation = ({selected, newMsgs}) => {
    const { appState } = useAppContext();
    const [ messages, setMessages ] = useState([]);
    const [ currInput, setCurrInput ] = useState("");
    const lastMsgRef = useRef(null);
    const msgContainerRef = useRef(null);

    const sendMessage = async () => {
        let res = await MessageService.send(selected.userId, currInput);
        if( res !== true){
            displayMsg("An error occurred, could not send this message", "error");
        }else{
            setCurrInput("");
        }
    };

    const getMessages = async () => {
        let res = await MessageService.getMessages(selected.userId);
        if( res === false){
            displayMsg("An error occurred, could not get this message", "error");
        }else{
            setMessages(res.messages);
        }
    };

    useEffect(()=>{
        if(newMsgs && newMsgs.length > 0){
            let msgToAdd = newMsgs[newMsgs.length - 1];
            setMessages([...messages, msgToAdd ] );
        }
    }, [newMsgs]);

    useEffect(()=>{
        if(messages.length > 0){
            scrollToBottom();
        }
    }, [messages]);

    const scrollToBottom = () =>{
        if(lastMsgRef.current){
            const { offsetTop } = lastMsgRef.current;
            msgContainerRef.current.scrollTo({ top: offsetTop, behavior: 'smooth' });
        }
    };

    useEffect(()=>{
        getMessages();
        return () => {
            setMessages([]);
            setCurrInput("");
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
                    ? 
                        <div className={classes.messagesList} ref={msgContainerRef}>
                            {messages.map((message, index) => <MessageItem message={message} key={index}/>)}
                            <div ref={lastMsgRef}/>
                        </div>
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