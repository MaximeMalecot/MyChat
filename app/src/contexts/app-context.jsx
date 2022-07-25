import React, { createContext, useContext, useReducer } from "react";
import jwt_decode from "jwt-decode";
import { CLIENT_ID } from '../constants/storage_keys.js';

const getFromtoken = token => {
    let decoded = jwt_decode(token);
    return decoded;
}

const authInitData = () => {
    if(localStorage.getItem('token')){
        return {
            token: localStorage.getItem('token'),
            ...getFromtoken(localStorage.getItem('token'))
        };
    }else{
        return {
            token: null,
            avatar: null,
            email: null,
            username: null,
            id: null,
            isAdmin: false
        }
    }
};

export const appInitData = {
    auth: authInitData(),
    eventSource: null,
    client_id: localStorage.getItem(CLIENT_ID)??null
};

export const useAppContext = () => {
    const context = useContext(AppContext);

    if(context === undefined){
        throw new Error('Missing App Context Provider');
    }

    return context;
}

export const appStateReducer = (previousState, { action, payload }) => {
    switch(action){            
        case "SET_TOKEN":
            const { token } = payload;
            localStorage.setItem('token', token);
            return { ...previousState, auth: {...previousState.auth, token } };

        case "SET_CLIENT_ID":
            let { client_id } = payload;
            localStorage.setItem(CLIENT_ID, client_id);
            return { ...previousState, client_id };

        case 'SET_AUTH_DATA':
            return { ...previousState, auth: {...previousState.auth, ...payload} };

        case "LOGOUT":
            localStorage.removeItem("token");
            localStorage.removeItem(CLIENT_ID);
            return { ...previousState, token: null };

        case "SET_EVENT_SOURCE":
            return { ...previousState, eventSource: payload };
        default:
            throw new Error('Undefined action');
    }
}

export const AppContext = createContext(appInitData);

export const AppContextProvider = ({children}) => {
    const [ appState, dispatch ] = useReducer(appStateReducer, appInitData);

    return(
        <AppContext.Provider value={{appState, dispatch}}>
            {children}
        </AppContext.Provider>
    )
}