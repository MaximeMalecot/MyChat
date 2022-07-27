import React, {useState, useEffect} from "react";
import styles from './users.module.scss';
import userService from "../../../services/user.service";
import { Link } from "react-router-dom";


export default function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const getUsers = async () => {
        let users = await userService.getAll()
        users.map(user => console.log(user));
        setUsers(users);
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
                                    <p>{user.firstName} {user.lastName}</p>
                                    <p>Nombres de reports : {user.reported?.length ?? 0}</p>
                                    <Link to={`/admin/users/${user.id}`}>Voir</Link>
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