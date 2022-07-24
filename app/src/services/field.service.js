import { API } from '../constants/base';

class FieldService{

    async getAll(){
        let res = await fetch(`${API}/field`, 
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
        let res = await fetch(`${API}/field`, 
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
        let res = await fetch(`${API}/field/${id}`, 
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
        let res = await fetch(`${API}/field/${id}`, 
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

    async modifySelfField(field){
        const token = localStorage.getItem("token");
        if (!token){
            throw new Error("Missing token")
        }
        let res = await fetch(`${API}/user/self/field`, 
            {
                method: "PUT",
                headers:{
                    "Accept": "*/*",
                    "Content-Type":"application/json",
                    "Authorization":`Bearer ${token}`
                },
                body: JSON.stringify({field})
            }
        );
        res = await res.json();
        if(res.status !== 202){
            return false;
        }
        return true;
    }
}

export default new FieldService();
