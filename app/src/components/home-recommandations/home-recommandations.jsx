import React, { useEffect, useState } from 'react';
import { displayMsg } from '../../helpers/toasts';
import friendshipService from '../../services/friendship.service';
import classes from './home-recommandations.module.scss';
import { Link } from "react-router-dom";

const TYPE_MAPPING = {
    'friends': 'commonFriends',
    'technos': 'commonTechnos',
    'fields': 'commonFields'
};

const UserItem = ({data, type}) => {
    const {user, ...commonNb } = data;

    const invite = async () => {

    };

    const renderCommon = () => {
        if( !Object.keys(TYPE_MAPPING).includes(type) ){
            return null;
        }
        const key = TYPE_MAPPING[type];
        console.log(key)
        switch(type){
            case 'friends':
                return <p className={classes.common}>{`${data[key] || 0} friends in common`}</p>;
            case 'technos':
                return <p className={classes.common}>{`${data[key] || 0} technos in common`}</p>;
        }
    }

    return(
        <Link to={`/user/${user.id}`} target="_blank" className={classes.userItem}>
            <div className={classes.imgContainer}>
                <img src={"https://i.stack.imgur.com/l60Hf.png"} alt="user's profile picture" />
            </div>
            <div className={classes.infos}>
                <h4>{user.firstName} {user.lastName}</h4>
                {renderCommon()}
                <button className='btn green' onClick={invite}>SEND INVITATION</button>
            </div>
        </Link>
    )
    return(
        <div key={idx} className={classes.userItem}>
            <div className={classes.imgContainer}>
                <img src={"https://i.stack.imgur.com/l60Hf.png"} alt="user's profile picture" />
            </div>
            <div className={classes.infos}>
                <h4>{user.firstName} {user.lastName}</h4>
                <button className='btn green' onClick={() => acceptInvitation(user.userId)}>ACCEPT</button>
                <button className='btn red' onClick={() => refuseInvitation(user.userId) }>REFUSE</button>
            </div>
        </div>
    )
};

export default function HomeRecommandations(){
    const [ commonTechnos, setCommonTechnos ] = useState([]);
    const [ commonFields, setCommonFields ] = useState([]);
    const [ commonFriends, setCommonFriends ] = useState([]);

    const getRecommandations = async () => {
        let res = await friendshipService.getRecommandations();
        if(res){
            console.log(res);
            let { userWithSameField, usersWithOccurences, usersWithSameTechnos } = res;
            setCommonTechnos(usersWithSameTechnos);
            setCommonFields(userWithSameField);
            setCommonFriends(usersWithOccurences);
            // setRandom(res.random);
            // setCommonFields(res.commonFields);
        }else{
            displayMsg('error', 'error');
        }
    };

    useEffect(()=>{
        getRecommandations();
    }, []);

    return(
        <div className={`container ${classes.main}`}>
            <h2>You might know</h2>
            {commonFriends.length > 0 && <div className={classes.usersList}>
                <h2>Friends of your friends</h2>
                <div className={classes.list}>
                    {commonFriends.map((user, idx) => <UserItem type={"friends"} data={user} key={idx}/>)}
                </div>
            </div>}

            {commonTechnos.lenght > 0 && <div className={classes.usersList}>
                <h2>Share the same technos than you</h2>
                <div className={classes.list}>
                    {commonTechnos.map((user, idx) => <UserItem type={"technos"} data={user} key={idx}/>)}
                </div>
            </div>}


            {commonFields.length > 0 && <div className={classes.usersList}>
                <h2>Share the same field than you</h2>
                <div className={classes.list}>
                    {commonFields.map((user, idx) => <UserItem type={"fields"} data={user} key={idx}/>)}
                </div>
            </div>}
        </div>
    )
}