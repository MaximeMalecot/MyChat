import { API } from '../constants/base';

class FriendshipService{

    async getRecommandations(){
        let token = localStorage.getItem('token');
        if( !token ){
            throw new Error('Missing token');
        }

        let res = await fetch(`${API}/friendship/`, 
            {
                method: "GET",
                headers:{
                    "Accept": "*/*",
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
            }
        );

        if( res .status !== 200 ){
            throw new Error('Error');
        }
        return res.json();
    }

    async getFriendsOf(userId){
        let res = await fetch(`${API}/friendship/${userId}`, 
            {
                method: "GET",
                headers:{
                    "Accept": "*/*",
                    "Content-Type":"application/json",
                },
            }
        );

        if( res .status !== 200 ){
            throw new Error('Error');
        }
        return res.json();
    }
}

export default new FriendshipService();