import { API } from '../constants/base';

class InvitationService{
    async getInvitations(user){
        const token = localStorage.getItem("token");

        try{
            let res = await fetch(`${API}/friendship/invitations`, 
                    {
                        headers:{
                            "Accept": "*/*",
                            "Content-Type":"application/json",
                            "Authorization":`Bearer ${token}`
                        }
                    }
            );
            if(res.status !== 200){
                throw new Error();
            }
            return res.json();

        }catch(e){
            return false;
        }
    }

    async send(userId){
        try{
            const token = localStorage.getItem("token");
            if (!token){
                throw new Error("Missing token")
            }
            let res = await fetch(`${API}/friendship/invitations/${userId}`, 
                {
                    method: "POST",
                    headers:{
                        "Accept": "*/*",
                        "Content-Type":"application/json",
                        "Authorization":`Bearer ${token}`
                    }
                }
            );
            if(res.status !== 201){
                throw new Error();
            }
            return true;
        }catch(e){
            console.error(e);
            return false;
        }
        
    }

    async acceptInvitation(id){
        try{
            const token = localStorage.getItem("token");
            if (!token){
                throw new Error("Missing token")
            }

            let res = await fetch(`${API}/friendship/invitations/${id}`, 
                    {
                        method: "PATCH",
                        headers:{
                            "Accept": "*/*",
                            "Content-Type":"application/json",
                            "Authorization":`Bearer ${token}`
                        }
                    }
            );

            if(res.status != 200){
                return false
            }
            return true;
        }catch(e){
            console.error(e);
            return false;
        }
    }

    async refuseInvitation(id){
        try{
            const token = localStorage.getItem("token");
            if (!token){
                throw new Error("Missing token")
            }

            let res = await fetch(`${API}/friendship/invitations/${id}`, 
                    {
                        method: "DELETE",
                        headers:{
                            "Accept": "*/*",
                            "Content-Type":"application/json",
                            "Authorization":`Bearer ${token}`
                        }
                    }
            );

            if(res.status != 204){
                return false
            }
            return true;
        }catch(e){
            console.error(e);
            return false;
        }
    }

}

export default new InvitationService();
