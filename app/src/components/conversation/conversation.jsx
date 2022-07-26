import React, { useState, useEffect, useRef } from 'react';
import MessageService from "../../services/message.service";
import { useAppContext } from "../../contexts/app-context";
import classes from "./conversation.module.scss";
import { PROFILE_PICTURE } from "../../constants/assets.js";
import { displayMsg } from "../../helpers/toasts.js";
import { Link } from 'react-router-dom';

const MessageItem = ({message}) => {
    const { appState } = useAppContext();
    
    const deleteMessage = async (id) => {
        let res = await MessageService.delete(id);
        if( res !== true){
            displayMsg("An error occurred, could not delete this message", "error");
        }
    }
    if(message.senderId == appState.auth.id){
        return (
            <div>
                { !message.deleted && <button onClick={() => deleteMessage(message._id)}>delete</button> }
                <div className={`${classes.messageItem} ${classes.self}`}>
                    { message.deleted === false ? message.content : "Message deleted"}
                </div>
            </div>
        )
    }
    return(
        <div>
            <div className={classes.messageItem}>
                { message.deleted === false ? message.content : "Message deleted"}
            </div>
        </div>

    )
};

export const Conversation = ({selected, newMsgs, deletedMsgs, handlDeleteMsg}) => {
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
        if(deletedMsgs && deletedMsgs.length > 0){
            let messageToDelete = messages.find(msg => msg._id === deletedMsgs[deletedMsgs.length - 1]._id);
            if(messageToDelete){
                messageToDelete.deleted = true;
                setMessages(messages);
                handlDeleteMsg();
            }
        }
    }, [deletedMsgs]);

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
        if(selected){
            getMessages();
        }
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