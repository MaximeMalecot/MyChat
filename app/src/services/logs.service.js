import { API } from '../constants/base';

class LogsService{
    async getAllLogs(){
        try{
            const token = localStorage.getItem("token");
            if (!token){
                throw new Error("Missing token")
            }
            let res = await fetch(`${API}/logs/get`, 
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
                return await res.json();
            }
            return res.json();
        }catch(e){
            return e.message;
        }
    }
   
}

export default new LogsService();
