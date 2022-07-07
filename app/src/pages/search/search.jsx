import React, { useCallback, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './search.module.scss';

const ProfileItem = ({data}) => {
    return(
        <div className={classes.profileItem}>
            <a className={classes.profilePictureContainer}>
                <img src="" alt=""/>
            </a>
            <div className={classes.profileData}>
                <h3>{`${data.surname} ${data.name}`}</h3>
                <p>XXX friends</p>
            </div>
            <button className={`btn green ${classes.connectBtn}`}>Connect</button>
        </div>
    )
};

export default function Search(){
    const { query } = useParams();
    const navigate = useNavigate();
    const [ results, setResults ] = useState([]);

    const searchProfiles = useCallback(()=>{
        let res = [];
        setResults(res);
    }, [query]);

    useEffect(()=>{
        if(query.length < 0){
            navigate('/');
        }else{
            searchProfiles();
        }
    }, []);
    
    return(
        <div className={`container ${classes.search}`}>
            <h2>Search results for {query}</h2>
            {results.length > 0
                ? <div className={classes.searchResults}>
                    {results.map((res, idx)=>
                        <ProfileItem 
                            data={res} 
                            key={idx}/>
                    )}
                </div>
                : <div>
                    <p>No result found for your query</p>
                </div>
            }
        </div>
    )
}