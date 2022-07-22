import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function User(){
    const {id} = useParams();
    
    useEffect(()=>{
        console.log(id);
    }, []);

    return (
        <div>
        <h1>User</h1>
        </div>
    )
}