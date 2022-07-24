import { API } from '../constants/base';

class UserService {
    async getSelf(){
        const token = localStorage.getItem("token");
        if (!token){
            throw new Error("Missing token")
        }
        try{
            let res = await fetch(`${API}/user/self`, 
                {
                    method: "GET",
                    headers:{
                        "Accept": "*/*",
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`
                    }
                }
            );
            if(res.status !== 200){
                return null;
            }
            return await res.json();

        }catch(e){
            return e.message;
        }
    }
    
    async getOne(id){
        const token = localStorage.getItem("token");
        if (!token){
            throw new Error("Missing token")
        }
        try{
            let res = await fetch(`${API}/user/${id}`, 
                {
                    method: "GET",
                    headers:{
                        "Accept": "*/*",
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`
                    }
                }
            );
            if(res.status !== 200){
                return null;
            }
            return await res.json();

        }catch(e){
            return e.message;
        }
    }

    async getAll(){
        const token = localStorage.getItem("token");
        if (!token){
            throw new Error("Missing token")
        }
        let res = await fetch(`${API}/user`, 
            {
                method: "GET",
                headers:{
                    "Accept": "*/*",
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
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
        let res = await fetch(`${API}/user`, 
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
        if(res.status === 201){
            return true;
        }
        return res.json();
    }

    async modify(id, name){
        const token = localStorage.getItem("token");
        if (!token){
            throw new Error("Missing token")
        }
        let res = await fetch(`${API}/user/${id}`, 
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

    async modifySelf(user){
        const token = localStorage.getItem("token");
        if (!token){
            throw new Error("Missing token")
        }
        let res = await fetch(`${API}/user/self`, 
            {
                method: "PUT",
                headers:{
                    "Accept": "*/*",
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body: JSON.stringify(user)
            }
        );
        if(res.status === 204){
            return true;
        }
        return res.json();
    }

    async search(search){
        const token = localStorage.getItem("token");
        if (!token){
            throw new Error("Missing token")
        }
        let res = await fetch(`${API}/user/search?search=${search}`, 
            {
                method: "GET",
                headers:{
                    "Accept": "*/*",
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                }
            }
        );
        res = await res.json();
        return res;
    }

    async delete(id){
        const token = localStorage.getItem("token");
        if (!token){
            throw new Error("Missing token")
        }
        let res = await fetch(`${API}/user/${id}`, 
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

    async report(id, report){
        const token = localStorage.getItem("token");
        if (!token){
            throw new Error("Missing token")
        }
        console.log(`${API}/user/${id}`)
        let res = await fetch(`${API}/user/${id}`, 
            {
                method: "POST",
                headers:{
                    "Accept": "*/*",
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body: JSON.stringify(report)
            }
        );
        if(res.status !== 201){
            return false;
        }
        return true;
    }
}

export default new UserService();
