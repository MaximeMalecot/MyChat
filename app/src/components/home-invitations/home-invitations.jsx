import classes from './home-invitations.module.scss';
import React, { useState, useEffect } from 'react';
import InvitationService from '../../services/invitation.service';
import { toast } from 'react-toastify';

export default function HomeInvitations(){
    const [ pendingInvitations, setPendingInvitations ] = useState([]);

    const acceptInvitation = async id => {
        let res = await InvitationService.acceptInvitation(id);
        if(res){
            toast.success('Invitation accepted', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else{
            toast.error("An error occurred, could not accept this invitation.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const refuseInvitation = async id => {
        let res = await InvitationService.refuseInvitation(id);
        if(res){
            toast.success('Invitation refused', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }else{
            toast.error("An error occurred, could not refuse this invitation.", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    };

    const getPendingInvitations = async () => {
        let res = await InvitationService.getInvitations();
        if(res !== false){
            setPendingInvitations(res);
        }
    };

    useEffect(()=>{
        getPendingInvitations();
    }, []);

    if( pendingInvitations.length == 0) return null;
    
    return(
        <div className={classes.main}>
            <div className={classes.header}>
                <h3>Pending invitations</h3>
                {pendingInvitations.length > 6 && <p>See all</p>}
            </div>
            <div className={classes.list}>
                {pendingInvitations.slice(0, 6).map((user, idx) =>
                    <div key={idx} className={classes.invitationItem}>
                        <div className={classes.imgContainer}>
                            <img src={"https://i.stack.imgur.com/l60Hf.png"} alt="user's profile picture" />
                        </div>
                        <div className={classes.infos}>
                            <h4>{user.firstName} {user.lastName}</h4>
                            <button className='btn green' onClick={() => acceptInvitation(user.userId)}>ACCEPT</button>
                            <button className='btn red' onClick={() => refuseInvitation(user.userId) }>REFUSE</button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}