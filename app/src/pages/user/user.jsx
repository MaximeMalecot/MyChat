import React, { useEffect, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import classes from "./user.module.scss";
import UserService from "../../services/user.service";
import { PROFILE_PICTURE } from "../../constants/assets";
import { FRIEND_STATUS, REPORT_TYPES } from "../../constants/base";
import { useAppContext } from "../../contexts/app-context";
import InvitationService from '../../services/invitation.service';
import { toast } from "react-toastify";

const displayMsg = (msg, type="success") => {
    const settings = {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
    };

    switch(type){
        case "success":
            toast.success(msg, settings);
            break;
        case "error":
            toast.error(msg, settings);
            break;
    }
}

const InviteButton = ({loading}) => {
    const { appState } = useAppContext();
    const {id} = useParams();
    const [ friendshipStatus , setFriendshipStatus ] = useState(null);

    const getFriendshipStatus = async () => {
        try{
            let res = await InvitationService.getFriendshipStatus(id);
            if(res !== false){
                setFriendshipStatus(res.message);
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
            displayMsg("Invitation sent");
        }catch(e){
            displayMsg("An error occurred, could not accept this invitation.", "error");
        }
    };

    const removeFriend = async () => {
        let res = await InvitationService.removeFriend(id);
        if(res !== true){
            displayMsg("An error occurred, could not remove this user from friends.", "error");
        }else{
            displayMsg("User removed from friends");
            setFriendshipStatus(null);
        }
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

const ReportForm = ({id, hide}) => {
    const [report, setReport] = useState({
        content: "",
        type: "",
    });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try{
            let res = await UserService.report(id, report);
            if(res !== true) throw new Error();
            displayMsg("User reported");
        }catch(e){
            console.error(JSON.stringify(e));
            displayMsg("An error occurred, could not report this user.", "error");
        }
        setLoading(false);
        hide();
    }

    const handleChange = (e) => {
        setReport({
            ...report,
            [e.target.name]: e.target.value,
        });
    }

    return (
        <form onSubmit={handleSubmit}>
            <select name="type" onChange={handleChange} defaultValue="">
                <option value="" disabled>Select a reason</option>
                { Object.values(REPORT_TYPES).map(type => 
                    <option key={type} value={type}>{type}</option>) 
                }
            </select>
            <textarea name="content" value={report.content} onChange={handleChange}></textarea>
            <button className="btn" disabled={loading}>Report</button>
        </form>
    )
}

export default function User(){
    const { appState } = useAppContext();
    const location = useLocation();
    const navigate = useNavigate();
    const {id} = useParams();
    const [ user, setUser ] = useState({});
    const [ loading, setLoading ] = useState(true);
    const [ showReportForm, setShowReportForm ] = useState(false);

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
        setLoading(true);
        getUser();
    }, [location]);

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
                    <button className="btn red" onClick={() => setShowReportForm(true)} value={id}>Report</button>
                    <InviteButton loading={loading}/>
                </div>
            </div>
            <div className={classes.bottomPart}>
            {
                showReportForm && <ReportForm id={id} hide={()=>setShowReportForm(false)}/>
            }
            </div>
        </div>
    )
}