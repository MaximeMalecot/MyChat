import React, { useState, useEffect} from 'react';
import MessageService from "../../services/message.service";
import { useAppContext } from "../../contexts/app-context";

export default function Messages(){
    const { appState } = useAppContext();
    const [ conversations, setConversations ] = useState([]);

    const getConversations = async () => {
        try{
            let res = await MessageService.getConversations();
            console.log(res);
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
        <div>
            {JSON.stringify(conversations)}
        </div>
    )
}