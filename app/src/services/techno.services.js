import { API } from '../constants/base';

class TechnoService{
    async getOne(id){
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

    async getAll(){
        //try{
            const token = localStorage.getItem("token");
            if (!token){
                throw new Error("T'AS PAS L'ACCES FRERO")
            }
            let res = await fetch(`${API}/techno/`, 
                {
                    method: "GET",
                    headers:{
                        "Accept": "*/*",
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`

                    },
                }
            );
            return await res.json();
        //}catch(e){
        //    return e.message;
        //}
    }
}

export default new TechnoService();
