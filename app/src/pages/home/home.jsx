import classes from './home.module.scss';
import React, { useState, useEffect } from 'react';
import InvitationService from '../../services/invitation.service';
import {useAppContext} from '../../contexts/app-context';
import { toast } from 'react-toastify';
import HomeInvitations from '../../components/home-invitations/home-invitations';
import HomeRecommandations from '../../components/home-recommandations/home-recommandations';

export default function Home(){
    const { appState } = useAppContext();
    
    useEffect(()=>{
        document.title = "GESbook - Home";
    }, []);

    return(
        <div className={`${classes.main} container`}>
            <HomeInvitations/>
            <HomeRecommandations/>
        </div>
    )
}