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
        let res = await fetch(`${API}/techno`, 
            {
                method: "GET",
                headers:{
                    "Accept": "*/*",
                    "Content-Type":"application/json"
                },
            }
        );
        res = await res.json();
        return res;
    }
    async create(name){
        const token = localStorage.getItem("token");
        if (!token){
            throw new Error("Missing token")
        }
        let res = await fetch(`${API}/techno`, 
            {
                method: "POST",
                headers:{
                    "Accept": "*/*",
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body:JSON.stringify({name})
            }
        );
        if(res.status !== 201){
            return false
        }
        res = await res.json();
        return res;
    }

    async modify(id, name){
        const token = localStorage.getItem("token");
        if (!token){
            throw new Error("Missing token")
        }
        let res = await fetch(`${API}/techno/${id}`, 
            {
                method: "PUT",
                headers:{
                    "Accept": "*/*",
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body: JSON.stringify({name})
            }
        );
        res = await res.json();
        if(res.status !== 204){
            return false;
        }
        return true;
    }

    async delete(id){
        const token = localStorage.getItem("token");
        if (!token){
            throw new Error("Missing token")
        }
        let res = await fetch(`${API}/techno/${id}`, 
            {
                method: "DELETE",
                headers:{
                    "Accept": "*/*",
                    "Authorization":`Bearer ${token}`
                }
            }
        );
        res = await res.json();
        if(res.status !== 202){
            return false;
        }
        return true;
    }

    async modifySelfTechno(technos){
        const token = localStorage.getItem("token");
        if (!token){
            throw new Error("Missing token")
        }
        let res = await fetch(`${API}/user/self/techno`, 
            {
                method: "PUT",
                headers:{
                    "Accept": "*/*",
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body: JSON.stringify({technos})
            }
        );
        res = await res.json();
        if(res.status !== 202){
            return false;
        }
        return true;
    }
}

export default new TechnoService();
