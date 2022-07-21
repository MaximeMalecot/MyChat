import React,{ useEffect, useRef, useState } from "react";
import UserService from "../../../services/user.service";
import styles from "./my-profile-form.module.scss";

export default function MyProfileForm({userData}) {
    const [user, setUser] = useState(userData);

    console.log(userData)
    const handleInput = (e) => {
        setUser({...user, [e.target.name]: e.target.value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let res = await UserService.modifySelf(user);
        if(!res){
            toast.error("Couldn't modify user, try again later", {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
        }
    }
    
    return(
        <div>
            <label htmlFor="firstname">Firstname</label>
            <input type="text" name="firstName" id="firstname" defaultValue={user?.firstName} onChange={handleInput}/>
            <label htmlFor="lastname">Lastname</label>
            <input type="text" name="lastName" id="lastname" defaultValue={user?.lastName} onChange={handleInput}/>
            <label htmlFor="email">Email :</label>
            <input id='email' type="email" defaultValue={user?.email} onChange={handleInput}/>
            <label htmlFor="password">Mot de passe :</label>
            <input type="password" defaultValue={user?.password} onChange={handleInput} />
            <button type='submit' onClick={handleSubmit} className="btn green">Edit</button>
        </div>
    )
}