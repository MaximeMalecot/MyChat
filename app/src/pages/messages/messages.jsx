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
    const [ newMsgs, setNewMsg ] = useState({});
    const [ loaded, setLoaded ] = useState(false);
    const [ deletedMsgs, setDeletedMsgs ] = useState({});

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

    const handleNewMsg = ({data}) => {
      
        let msg = (JSON.parse(data)).data;
        let id = msg.senderId == appState.auth.id ? msg.receiverId : msg.senderId;

        let oldMsgs = newMsgs[id] ? [...newMsgs[id].msgs] : [];
        oldMsgs.push(msg);
        setNewMsg({...newMsgs, [id]: oldMsgs });
    };

    const handleEventDeleteMsg = ({data}) => {
        let msg = (JSON.parse(data)).data;
        let id = msg.senderId == appState.auth.id ? msg.receiverId : msg.senderId;

        let oldMsgs = deletedMsgs[id] ? [...deletedMsgs[id].msgs] : [];
        oldMsgs.push(msg);
        setDeletedMsgs({...deletedMsgs, [id]: oldMsgs });
    };

    const handleDeleteMessage = (userId) => {
        setDeletedMsgs({...deletedMsgs, [userId]: [] });
    }

    useEffect(()=>{
        getConversations();
    }, []);

    useEffect(()=>{
        if( appState.eventSource && !loaded ){
            appState.eventSource.addEventListener('new_message', handleNewMsg);
            appState.eventSource.addEventListener('delete_message', handleEventDeleteMsg);
            setLoaded(true);
        }

        return () => {
            if(appState.eventSource){
                appState.eventSource.removeEventListener('new_message', handleNewMsg);
                appState.eventSource.removeEventListener('delete_message', handleEventDeleteMsg);
                setLoaded(false);
            }
        }
    }, [appState]);

    return(
        <div className={`container ${classes.main}`}>
            <div className={classes.left}>
                <h3>Conversations</h3>
                <div className={classes.conversationList}>
                    {
                        conversations.length > 0 
                        ?
                        <div className={classes.conversations}>
                            {conversations.map( (conv, item) => {
                                let lastMsg = newMsgs[conv.friend.userId] ? newMsgs[conv.friend.userId][newMsgs[conv.friend.userId].length -1] : null;
                                return  (
                                    <ConversationItem
                                        selected={selected?.userId}
                                        key={item} 
                                        data={conv} 
                                        newMsg={lastMsg}
                                        onClick={() => setSelected(conv.friend)}/>
                                    )
                                }
                            )}
                        </div>
                        : <p>No conversation yet</p>
                    }
                </div>
                
            </div>
            <div className={classes.right}>
                {
                !selected 
                    ? <p>No conversation selected</p>
                    : <Conversation 
                        selected={selected} 
                        newMsgs={newMsgs[selected.userId]??null}
                        deletedMsgs={deletedMsgs[selected.userId]}
                        handlDeleteMsg={() => handleDeleteMessage(selected.userId)}/>
                }
            </div>
        </div>
    )
}