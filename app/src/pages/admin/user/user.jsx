import React, {useState, useEffect} from "react";
import styles from './user.module.scss';
import userService from "../../../services/user.service";
import { useParams } from "react-router-dom";


export default function User() {
    const [user, setUser] = useState({});
    const [reportsFrom, setReportsFrom] = useState([]);
    const [reportsTo, setReportsTo] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();

    const getUser = async (id) => {
        let res = await userService.getReports(id)
        setUser(res.user);
        setReportsFrom(res.reportsFrom);
        setReportsTo(res.reportsTo);
    }

    useEffect(() => {
        if(!loading){
            getUser(id);
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
                    <h1>User</h1>
                    <p>{user.firstName} {user.lastName}</p>
                    <div className={styles.content}>
                        <h2>REPORTS ON USER</h2>
                        {loading ? reportsTo.map(report => {
                            return (
                                <div key={report.id}>
                                    <div>{report.type}</div>
                                    <div>{report.content}</div>
                                </div>
                            )
                        }) : <div>Loading...</div>}
                        <h2>REPORTS FROM USER</h2>
                        {loading ? reportsFrom.map(report => {
                            return (
                                <div key={report.id}>
                                    <div>{report.type}</div>
                                    <div>{report.content}</div>
                                </div>
                            )
                        }) : <div>Loading...</div>}
                    </div>
                </div>
            </div>
        </div>
    );
}