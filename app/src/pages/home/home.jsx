import React, { useState, useEffect } from 'react';
import InvitationService from '../../services/invitation.service';
import {useAppContext} from '../../contexts/app-context';

export default function Home(){
    const { appState } = useAppContext();
    const [ pendingInvitations, setPendingInvitations ] = useState([]);

    const getPendingInvitations = async () => {
        let res = await InvitationService.getInvitations();
        if(res !== false){
            //setPendingInvitations(res);
        }
    };

    useEffect(()=>{
        getPendingInvitations();
    }, []);

    return(
        <div className='container'>
            Home
        </div>
    )
}