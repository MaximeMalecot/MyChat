import { API } from '../constants/base';

class ReportService{
    async getAll(limit=null){
        try{
            const token = localStorage.getItem("token");
            let url = `${API}/report`;
            if (!token){
                throw new Error("Missing token")
            }
            if(limit){
                url += `?limit=${limit}`;
            }
            let res = await fetch(url, 
                {
                    method: "GET",
                    headers:{
                        "Accept": "*/*",
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`
                    }
                }
            );
            if(res.status === 200){
                return res.json();
            }
            return null;
        }catch(e){
            return e.message;
        }
    }

    async getLastCreated(){
        try{
            const token = localStorage.getItem("token");
            let url = `${API}/report?limit=5&status=CREATED`;
            if (!token){
                throw new Error("Missing token")
            }
            let res = await fetch(url, 
                {
                    method: "GET",
                    headers:{
                        "Accept": "*/*",
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`
                    }
                }
            );
            if(res.status === 200){
                return res.json();
            }
            return null;
        }catch(e){
            return e.message;
        }
    }
    async modify(id, type){
        try{
            const token = localStorage.getItem("token");
            if (!token){
                throw new Error("Missing token")
            }
            if(!id){
                throw new Error("Missing id")
            }
            if(type !== "close" && type !== "resolve"){
                throw new Error("Invalid type");
            }
            let res = await fetch(`${API}/report/${id}`, 
                {
                    method: "PUT",
                    headers:{
                        "Accept": "*/*",
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`
                    },
                    body: JSON.stringify({type})
                }
            );
            if(res.status === 204){
                return true;
            }
            return false;
        }catch(e){
            return e.message;
        }
    }
}

export default new ReportService();
