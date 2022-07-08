import { API } from '../constants/base';

class AuthService{
    async register(user){
        try{
            let res = await fetch(`${API}/users`, 
                    {
                        method: "POST",
                        headers:{
                            "Accept": "*/*",
                            "Content-Type":"application/json"
                        },
                        body: JSON.stringify(user)
                    }
            );
            if(res.status !== 201){
                return await res.json();
            }
            return true;

        }catch(e){
            return e.message;
        }
    }

    async login(user){
        try{
            let res = await fetch(`${API}/users`, 
                {
                    method: "POST",
                    headers:{
                        "Accept": "*/*",
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify(user)
                }
            );

            if(res.status !== 201){
                throw new Error((await res.json()).message??'An error occurred');
            }

            return await res.json();
        }catch(e){
            return false;
        }
    }
}

export default new AuthService();
