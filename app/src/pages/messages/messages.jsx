import React, { useState, useEffect} from 'react';
import MessageService from "../../services/message.service";
import { useAppContext } from "../../contexts/app-context";
import classes from "./messages.module.scss";
import { displayMsg } from "../../helpers/toasts.js";
import { PROFILE_PICTURE } from "../../constants/assets.js";
import { Conversation } from '../../components/conversation/conversation';
import { ConversationItem } from '../../components/conversation-item/conversation-item';

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
                        ?
                        <div className={classes.conversations}>
                            {conversations.map( (conv, item) => <ConversationItem key={item} data={conv} onClick={() => setSelected(conv.friend)}/>)}
                        </div>
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