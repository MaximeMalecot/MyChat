import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import classes from "./user.module.scss";
import UserService from "../../services/user.service";
import { PROFILE_PICTURE } from "../../constants/assets";
import { useAppContext } from "../../contexts/app-context";

export default function User(){
    const navigate = useNavigate();
    const {id} = useParams();
    const [ user, setUser ] = useState({});
    const [ loading, setLoading ] = useState(true);
    const { appState } = useAppContext();

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
                    <button className="btn green">Add to friend</button>
                </div>
            </div>
        </div>
    )
}