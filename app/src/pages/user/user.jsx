import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./user.module.scss";
import UserService from "../../services/user.service";
import { PROFILE_PICTURE } from "../../constants/assets";
import { FRIEND_STATUS } from "../../constants/base";
import { useAppContext } from "../../contexts/app-context";
import InvitationService from '../../services/invitation.service';
import { toast } from "react-toastify";

const InviteButton = ({loading}) => {
    const { appState } = useAppContext();
    const {id} = useParams();
    const [ friendshipStatus , setFriendshipStatus ] = useState(null);

    const getFriendshipStatus = async () => {
        try{
            let res = await InvitationService.getFriendshipStatus(id);
            if(res !== false){
                setFriendshipStatus(res.message);
                console.log(res);
            }
        }catch(e){
            console.error(e);
        }
    };

    const sendInvitation = async () => {
        try{
            let res = await InvitationService.send(id);
            if(res !== true) throw new Error();

            setFriendshipStatus(FRIEND_STATUS.CREATED);
            toast.success("Invitation sent", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }catch(e){
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

    const removeFriend = async () => {
        
    }
    
    useEffect(()=>{
        if(!loading){
            getFriendshipStatus();
        }
    }, [loading]);

    if( appState.auth.id == id ) return null;
    
    switch(friendshipStatus){
        case FRIEND_STATUS.CREATED:
            return <button className="btn">Request sent</button>

        case FRIEND_STATUS.AWAITING:
            return <button className="btn" >Awaiting your answer</button>

        case FRIEND_STATUS.ACCEPTED:
            return <button className="btn red" onClick={removeFriend}>Remove from friends</button>
        
        default:
            return <button className="btn green" onClick={sendInvitation}>Add to friend</button>
    }

}

export default function User(){
    const { appState } = useAppContext();
    const navigate = useNavigate();
    const {id} = useParams();
    const [ user, setUser ] = useState({});
    const [ loading, setLoading ] = useState(true);

    const getUser = async () => {
        try{
            let res = await UserService.getOne(id);
            if(!res){
                navigate("/?error=not_found");
            }else{
                setUser(res);
                document.title = `${res.firstName} ${res.lastName} | GESbook`;
            }
            setLoading(false);
        }catch(e){
            console.error(e);
        }
    };

    useEffect(()=>{
        getUser();
    }, []);

    if(loading) return <div>Loading...</div>;

    return (
        <div className={`container ${classes.main}`}>
            <div className={classes.topPart}>
                <div className={classes.dataPart}>
                    <div className={classes.imgContainer}>
                        <img src={user.profile || PROFILE_PICTURE} alt="profile picture"/>
                    </div>
                    <h1>{user.firstName} {user.lastName}</h1>
                </div>
                <div>
                    <InviteButton loading={loading}/>
                </div>
            </div>
        </div>
    )
}