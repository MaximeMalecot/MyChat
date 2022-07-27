import React, {useState, useEffect} from "react";
import styles from './users.module.scss';
import userService from "../../../services/user.service";

export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const getUsers = async () => {
        setUsers(await userService.getAll());
    }

    useEffect(() => {
        if(!loading){
            getUsers();
            setLoading(true);
        }
    });

    const deleteUser = async (userId) => {
        let res = await userService.delete(userId);
        if(res){
            await getUsers();
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.card}>
                    <h1>Users</h1>
                    <div className={styles.content}>
                        {loading ? users.map(user => {
                            return (
                                <div key={user.id}>
                                    <div>{user.firstName} {user.lastName}</div>
                                    <div>{user.email}</div>
                                    <button onClick={() => deleteUser(user.id)}>Delete</button>
                                </div>
                            )
                        }) : <div>Loading...</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}