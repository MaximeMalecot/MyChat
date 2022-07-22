import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./user.module.scss";
import UserService from "../../services/user.service";
import { PROFILE_PICTURE } from "../../constants/assets";
import { useAppContext } from "../../contexts/app-context";
import InvitationService from '../../services/invitation.service';
import { toast } from "react-toastify";

const InviteButton = () => {
    const { appState } = useAppContext();
    const {id} = useParams();
    const [ sent, setSent ] = useState(false);

    const sendInvitation = async () => {
        try{
            let res = await InvitationService.send(id);
            if(res !== true) throw new Error();

            setSent(true);
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

    if( appState.auth.id === id || sent ) return null;

    return(
        <button className="btn green" onClick={sendInvitation}>Add to friend</button>
    )
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
                navigate("/");
            }else{
                setUser(res);
            }
            setLoading(false);
            document.title = `${res.firstName} ${res.lastName} | GESbook`;
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
                    <InviteButton/>
                </div>
            </div>
        </div>
    )
}