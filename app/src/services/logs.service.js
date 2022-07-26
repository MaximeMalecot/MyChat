import { API } from '../constants/base';

class LogsService{
    async getAllLogs(query){
        try{
            const token = localStorage.getItem("token");
            if (!token){
                throw new Error("Missing token")
            }
            let url = `${API}/logs?`;
            if(query.limit || query.text){
                const limit = parseInt(query.limit);
                if(limit&&limit < 0){
                    return 'Limit must be greater than 0';
                }
                for(const [name, value] of Object.entries(query)){
                    url += `${name}=${value}&`;
                }
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
                return await res.json();
            }
            return res.json();
        }catch(e){
            return e.message;
        }
    }
   
}

export default new LogsService();
