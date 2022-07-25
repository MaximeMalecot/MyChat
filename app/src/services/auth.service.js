import { API } from '../constants/base';

class AuthService{
    async register(user){
        try{
            let res = await fetch(`${API}/security/register`, 
                    {
                        method: "POST",
                        headers:{
                            "Accept": "*/*",
                            "Content-Type":"application/json"
                        },
                        body: JSON.stringify(user)
                    }
            );
            if(res.status === 201){
                return true;
            }
            return res.json();
        }catch(e){
            return e.message;
        }
    }

    async login(user){
        //try{
            let res = await fetch(`${API}/security/login`, 
                {
                    method: "POST",
                    headers:{
                        "Accept": "*/*",
                        "Content-Type":"application/json"
                    },
                    body: JSON.stringify({user, client_id: localStorage.getItem("client_id")})
                }
            );

            if(res.status !== 200){
                if(res.status == 500){
                    throw new Error("An error occurred, please try again later");
                }else{
                    //throw new Error((await res.json()).message??'An error occurred');
                    throw new Error("Invalid account");
                }
            }

            return await res.json();
        //}catch(e){
        //    return e.message;
        //}
    }

    async logout(){
        const token = localStorage.getItem("token");
        if (!token){
            throw new Error("Missing token")
        }
        let res = await fetch(`${API}/security/logout`, 
            {
                method: "POST",
                headers:{
                    "Accept": "*/*",
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                
                },
            }
        );

        if(res.status !== 200){
            return false;
        }

        return true;
    }
}

export default new AuthService();
