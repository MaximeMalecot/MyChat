import React, { useCallback, useEffect, useState } from 'react';
import Modal from 'react-modal';
import classes from './notification-center.module.scss';
import NotificationService from '../../services/notification.service';
import NotificationItem from '../notification-item/notification-item';
import { useLocation } from 'react-router-dom';

export default function NotificationCenter({visible, setVisible}){
    const [ notifications, setNotifications ] = useState([]);
    const location = useLocation();

    const getNotifications = async () => {
        let res = await NotificationService.getAll();
        if(res === false){
            return;
        }else{
            setNotifications(res.notifications);
        }
        
    };
    
    useEffect(()=>{
        if(visible){
            getNotifications();
        }

        () => {
            setNotifications([]);
        }
    }, [visible]);
    
    useEffect(()=>{
        setVisible(false);
    }, [location])

    return(
        <Modal
            isOpen={visible}
            onRequestClose={() => setVisible(false)}
            className={`${classes.main}`}
            disableAutoFocus={true}
            ariaHideApp={false}
            style={{ overlay: { zIndex: 1000, background: 'rgba(10, 10, 10, 0.7)' } }}>
            <div className={classes.header}>
                <div className={classes.content}>
                    <h2>Notification Center</h2>
                    <p>Manage your notifications</p>
                    <svg onClick={() => setVisible(false)}
                        width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M17 17L1 1M17 1L1 17" stroke="#858585" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                </div>
            </div>

            <div className={classes.content}>
                {notifications.length === 0 
                    ? <p>You have no notification</p>
                    : notifications.map((notification, idx) => <NotificationItem key={idx} data={notification}/>)
                }
            </div>
        </Modal>
    )
}