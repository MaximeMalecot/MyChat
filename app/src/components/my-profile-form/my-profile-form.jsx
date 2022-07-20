import React,{ useEffect, useRef, useState } from "react";
import TechnoService from "../../services/techno.service";
import UserService from "../../services/user.service";
import styles from "./my-profile-form.module.scss";

export default function MyProfileForm({formHandler}) {
    const [techno, setTechno] = useState([]);
    const [user, setUser] = useState({});
    const [selectedTechno, setSelectedTechno] = useState([]);
    const technoRef = useRef();

    useEffect(() => {
        TechnoService.getAll().then(res => {
            setTechno(res);
        })
        .catch(console.error);
        
        UserService.getSelf().then(res => {
            setUser({...res, password: ''});
        })
        .catch(console.error);
    }, []);

    const handleSelect = (e) => {
        if(e.target.value ==='none'){
            setSelectedTechno([]);
            return;
        }

        if(selectedTechno.includes(e.target.value)){
        console.log("already selected");
        setSelectedTechno(selectedTechno.filter(item => item !== e.target.value));
        }else{
        console.log(selectedTechno,'hhh');
        setSelectedTechno(
            [...selectedTechno, e.target.value]
        );
        }
        
    }

    const handleInput = (e) => {
        console.log('oui je rentre bien');
        setUser({...user, [e.target.name]: e.target.value});
        
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(selectedTechno, 'submit');
        console.log(user, 'userrrrrrrr');
    }
    
    return(
        <form className={styles.cardForm} onSubmit={handleSubmit}>
            <p className={styles.close} onClick={formHandler}>x</p> 
            <label htmlFor="firstname">Firstname</label>
            <input type="text" name="firstname" id="firstname" defaultValue={user?.firstName} onChange={handleInput}/>
            <label htmlFor="lastname">Lastname</label>
            <input type="text" name="lastname" id="lastname" defaultValue={user?.lastName} onChange={handleInput}/>
            <label htmlFor="email">Email :</label>
            <input id='email' type="email" defaultValue={user?.email} onChange={handleInput}/>
            <label htmlFor="password">Mot de passe :</label>
            <input type="password" defaultValue={user?.password} onChange={handleInput} />
            <select name="techno" multiple={true} ref={technoRef} onChange={handleSelect} value={selectedTechno}>
                <option value='none'>---</option>
                {techno.map(tech => (
                    <option key={tech.id} value={tech.name}>{tech.name}</option>
                ))}
            </select> 
            <button type='submit' >Edit</button>
        </form>
    )
}