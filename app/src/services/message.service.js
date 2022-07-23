import { API } from '../constants/base';

class MessageService{

    async getConversations(){
        const token = localStorage.getItem("token");
        if (!token){
            throw new Error("Missing token")
        }
        try{
            let res = await fetch(`${API}/message`,
                    {
                        headers:{
                            "Accept": "*/*",
                            "Content-Type":"application/json",
                            "Authorization":`Bearer ${token}`
                        }
                    }
            );
            if(res.status != 200){
                throw new Error();
            }
            return res.json();

        }catch(e){
            return false;
        }
    }

    async send(userId, content){
        try{
            const token = localStorage.getItem("token");
            if (!token){
                throw new Error("Missing token");
            }
            let res = await fetch(`${API}/message/${userId}`, 
                    {
                        method: "POST",
                        headers:{
                            "Accept": "*/*",
                            "Content-Type":"application/json",
                            "Authorization":`Bearer ${token}`
                        },
                        body:JSON.stringify({content})
                    }
                );

            if(res.status !== 201){
                throw new Error();
            }
            return true;
        }catch(e){
            
        }
    }
    // async send(userId){
    //     try{
    //         const token = localStorage.getItem("token");
    //         if (!token){
    //             throw new Error("Missing token")
    //         }
    //         let res = await fetch(`${API}/friendship/invitations/${userId}`, 
    //             {
    //                 method: "POST",
    //                 headers:{
    //                     "Accept": "*/*",
    //                     "Content-Type":"application/json",
    //                     "Authorization":`Bearer ${token}`
    //                 }
    //             }
    //         );
    //         if(res.status !== 201){
    //             throw new Error();
    //         }
    //         return true;
    //     }catch(e){
    //         console.error(e);
    //         return false;
    //     }
        
    // }

}

export default new MessageService();
