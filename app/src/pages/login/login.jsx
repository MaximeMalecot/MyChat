import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAppContext } from '../../contexts/app-context';
import classes from './login.module.scss';
import LoginModal from '../../components/login-modal/login-modal';
import AuthService from '../../services/auth.service';

export default function Login(){
    const navigate = useNavigate();
    const [ authFields, setAuthFields ] = useState({email: '', password: ''});
    const  {appState, dispatch } = useAppContext();
    const [ openLoginModal, setOpenLoginModal ] = useState(false);

    const onSubmit = async e => {
        try{
            e.stopPropagation();
            e.preventDefault();
            let res = await AuthService.login(authFields);
            dispatch({action: 'SET_TOKEN', payload: {token: res.token} });
            
        }catch(e){
            toast.error(e.message, {
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

    useEffect(()=>{
        if(appState.auth.token){
            navigate('/');
        }
    }, [ appState]);

    return(
        <div className={classes.login}>
            <div className={classes.content}>

                <div className={classes.leftPart}>
                    <div className={classes.content}>
                        <h2>GESbook</h2>
                        <p>Connect with friends and the<br/>ESGI network on GESbook.</p>
                    </div>
                </div>

                <div className={classes.rightPart}>
                    <div className={classes.loginForm}>
                        <form onSubmit={onSubmit}>
                            <input
                                value={authFields.email}
                                onChange={e => setAuthFields({...authFields, email: e.target.value})}
                                type="text"
                                placeholder='Email'/>
                            <input
                                value={authFields.password}
                                onChange={e => setAuthFields({...authFields, password: e.target.value})}
                                type="password"
                                placeholder='Password'/>
                            <button className='btn blue'>Log In</button>
                            <Link to="/login/recover"><p>Forgot password?</p></Link>
                        </form>
                        <button onClick={() => setOpenLoginModal(true)}
                            className='btn green'>Create new account</button>
                    </div>
                </div>
                
            </div>
            <LoginModal
                setVisible={setOpenLoginModal}
                visible={openLoginModal}/>
        </div>
    )
}