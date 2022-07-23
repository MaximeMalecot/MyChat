import React, { useState, useEffect} from 'react';
import MessageService from "../../services/message.service";
import { useAppContext } from "../../contexts/app-context";
import classes from "./messages.module.scss";
import { displayMsg } from "../../helpers/toasts.js";
import { PROFILE_PICTURE } from "../../constants/assets.js";

const Conversation = ({selected}) => {
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
                <h4>{selected.firstName} {selected.lastName}</h4>
            </div>

            <div className={classes.messagesContainer}>

            </div>

            <div className={classes.input}>
                <input
                    value={currInput} 
                    onChange={e=>setCurrInput(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>

        </div>
    )
};

const ConversationItem = ({data, onClick}) => {
    return(
        <div onClick={onClick} className={classes.conversationItem}>
            <div className={classes.picture_container}>
                <img src={PROFILE_PICTURE} alt="friend picture"/>
            </div>
            <div className={classes.data}>
                <h4>{data.friend.firstName} {data.friend.lastName}</h4>
                <p>{data.lastMessage ? data.lastMessage.content.slice(0, 20) : "No message"}</p>
            </div>
        </div>
    )
}

export default function Messages(){
    const { appState } = useAppContext();
    const [ conversations, setConversations ] = useState([]);
    const [ selected, setSelected ] = useState(null);

    const getConversations = async () => {
        try{
            let res = await MessageService.getConversations();
            if(res !== false){
                setConversations(res);
            }
        }catch(e){
            console.error(e);
        }
    };

    useEffect(()=>{
        getConversations();
    }, []);

    return(
        <div className={`container ${classes.main}`}>
            <div className={classes.left}>
                <h3>Conversations</h3>
                <div className={classes.conversationList}>
                    {
                        conversations.length > 0 
                        ? conversations.map( (conv, item) => <ConversationItem key={item} data={conv} onClick={() => setSelected(conv.friend)}/>)
                        : <p>No conversation yet</p>
                    }
                </div>
                
            </div>
            <div className={classes.right}>
                {
                !selected 
                    ? <p>No conversation selected</p>
                    : <Conversation selected={selected}/>
                }
            </div>
        </div>
    )
}