import { API } from '../constants/base';

class MessageService{

    async getConversations(){
        const token = localStorage.getItem("token");
        if (!token){
            throw new Error("Missing token")
        }
        try{
            let res = await fetch(`${API}/message/user`,
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

    async getMessages(friendId){
        const token = localStorage.getItem("token");
        if (!token){
            throw new Error("Missing token")
        }
        try{
            let res = await fetch(`${API}/message/user/${friendId}`,
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
            let res = await fetch(`${API}/message/user/${userId}`, 
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
    async update(messageId, content){
        try{
            const token = localStorage.getItem("token");
            if (!token){
                throw new Error("Missing token");
            }
            let res = await fetch(`${API}/message/${messageId}`, 
                    {
                        method: "PUT",
                        headers:{
                            "Accept": "*/*",
                            "Content-Type":"application/json",
                            "Authorization":`Bearer ${token}`
                        },
                        body:JSON.stringify({content})
                    }
                );

            if(res.status !== 200){
                return false;
            }
            return true;
        }catch(e){
            
        }
    }
    async delete(messageId){
        try{
            const token = localStorage.getItem("token");
            if (!token){
                throw new Error("Missing token");
            }
            let res = await fetch(`${API}/message/${messageId}`, 
                    {
                        method: "DELETE",
                        headers:{
                            "Accept": "*/*",
                            "Content-Type":"application/json",
                            "Authorization":`Bearer ${token}`
                        }
                    }
                );

            if(res.status !== 204){
                throw false;
            }
            return true;
        }catch(e){
            console.error(e)
        }
    }

}

export default new MessageService();
