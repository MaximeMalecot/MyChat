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
            if(res.status !== 201){
                return await res.json();
            }
            return true;

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
                    body: JSON.stringify(user)
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
}

export default new AuthService();
