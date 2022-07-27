import React, { useEffect, useState } from 'react';
import { displayMsg } from '../../helpers/toasts';
import friendshipService from '../../services/friendship.service';
import classes from './home-recommandations.module.scss';
import { Link } from "react-router-dom";
import InviteButton from '../invite-button/invite-button';

const TYPE_MAPPING = {
    'friends': 'commonFriends',
    'technos': 'commonTechnos',
    'fields': 'commonFields'
};

const UserItem = ({data, type}) => {
    const [ userLocal, setUserLocal ] = useState(null);

    useEffect(()=>{
        if(data){
            if(data.user){
                setUserLocal(data.user);
            }else{
                setUserLocal(data);
            }
        }
    }, [data]);

    const invite = async () => {

    };

    const renderCommon = () => {
        if( !Object.keys(TYPE_MAPPING).includes(type) ){
            return null;
        }
        const key = TYPE_MAPPING[type];
        switch(type){
            case 'friends':
                return <p className={classes.common}>{`${data[key] || 0} friends in common`}</p>;
            case 'technos':
                return <p className={classes.common}>{`${data[key] || 0} technos in common`}</p>;
        }
    }

    if( !userLocal ) return null;

    return(
        <Link to={`/user/${userLocal.id}`} target="_blank" className={classes.userItem}>
            <div className={classes.imgContainer}>
                <img src={"https://i.stack.imgur.com/l60Hf.png"} alt="user's profile picture" />
            </div>
            <div className={classes.infos}>
                <h4>{userLocal.firstName} {userLocal.lastName}</h4>
                {renderCommon()}
                {/* <button className='btn green' onClick={invite}>SEND INVITATION</button> */}
                <InviteButton userId={userLocal.id} loading={false}/>
            </div>
        </Link>
    )

};

export default function HomeRecommandations(){
    const [ commonTechnos, setCommonTechnos ] = useState([]);
    const [ commonFields, setCommonFields ] = useState([]);
    const [ commonFriends, setCommonFriends ] = useState([]);
    const [ nothingToShow, setNothingToShow ] = useState(true);

    const getRecommandations = async () => {
        let res = await friendshipService.getRecommandations();
        if(res){
            let { userWithSameField, usersWithOccurences, usersWithSameTechnos } = res;
            setCommonTechnos(usersWithSameTechnos);
            setCommonFields(userWithSameField);
            setCommonFriends(usersWithOccurences);

            if(userWithSameField.length < 1 && usersWithOccurences.length < 1 && usersWithSameTechnos.length < 1){
                setNothingToShow(true);
                console.log('nothing to show');
            }else{
                setNothingToShow(false);
            }
            
        }else{
            displayMsg('error', 'error');
        }
    };

    useEffect(()=>{
        getRecommandations();
    }, []);

    return(
        <div className={`${classes.main}`}>
            
            { !nothingToShow
               ?
               <>
                    <h2>You might know</h2>
                    {commonFriends.length > 0 && <div className={classes.usersList}>
                        <h2>Friends of your friends</h2>
                        <div className={classes.list}>
                            {commonFriends.map((user, idx) => <UserItem type={"friends"} data={user} key={idx}/>)}
                        </div>
                    </div>}

                    {commonTechnos.length > 0 && <div className={classes.usersList}>
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
                </>
                : <p>Looks like there is nothing to show</p>
            }
        </div>
    )
}