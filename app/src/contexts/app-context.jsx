import React, { createContext, useContext, useReducer } from "react";

const authInitData = {
    token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
    avatar: null,
    email: null,
    username: null
};

export const appInitData = {
    auth: authInitData,
    hideNavbar: false,
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
        case "HIDE_NAVBAR":
            return { ...previousState, hideNavbar: true }
            
        case "SHOW_NAVBAR":
            return { ...previousState, hideNavbar: false }
            
        case "SET_TOKEN":
            const { token } = payload;
            localStorage.setItem('token', token);
            return { ...previousState, token };

        case 'SET_AUTH_DATA':
            return { ...previousState, profile: {...previousState.profile, ...payload} };

        case "LOGOUT":
            localStorage.removeItem(process.env.REACT_APP_STORAGE_KEY);
            return { ...previousState, token: null };
            

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