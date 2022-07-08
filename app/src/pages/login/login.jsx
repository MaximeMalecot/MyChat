import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAppContext } from '../../contexts/app-context';
import classes from './login.module.scss';
import LoginModal from '../../components/login-modal/login-modal';

export default function Login(){
    const [ authFields, setAuthFields ] = useState({email: '', password: ''});
    const  {appState, dispatch } = useAppContext();
    const [ openLoginModal, setOpenLoginModal ] = useState(false);

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
                        <form>
                            <input
                                onChange={e => setAuthFields({...authFields, email: e.target.value})}
                                type="text"
                                placeholder='Email'/>
                            <input
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