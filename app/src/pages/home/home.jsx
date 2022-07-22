import classes from './home.module.scss';
import React, { useState, useEffect } from 'react';
import InvitationService from '../../services/invitation.service';
import {useAppContext} from '../../contexts/app-context';
import { toast } from 'react-toastify';
import HomeInvitations from '../../components/home-invitations/home-invitations';

export default function Home(){
    const { appState } = useAppContext();
    

    return(
        <div className={`${classes.main} container`}>
            <HomeInvitations/>
        </div>
    )
}