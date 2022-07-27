import { API } from '../constants/base';

class AnalyticsService{
    async getAnalytics(){
        try{
            const token = localStorage.getItem("token");
            if (!token){
                throw new Error("Missing token")
            }
            let res = await fetch(`${API}/analytics/get`, 
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

    async create(analytics){
        const client_id = localStorage.getItem('client_id')
        if(!client_id){
            return false;
        }
        analytics.client = client_id;
        let res = await fetch(`${API}/analytics`, 
                    {
                        method: "POST",
                        headers:{
                            "Accept": "*/*",
                            "Content-Type":"application/json"
                        },
                        body:JSON.stringify(analytics)
                    }
                );

            if(res.status !== 201){
                throw new Error();
            }
            return true;
    }
   
}

export default new AnalyticsService();
