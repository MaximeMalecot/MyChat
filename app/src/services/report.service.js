import { API } from '../constants/base';

class ReportService{
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
