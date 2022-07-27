import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.scss";
import LogsService from "../../../services/logs.service";
import { errorsEnum } from "../../../helpers/logs";
import UserService from "../../../services/user.service";
import AnalyticsService from '../../../services/analytics.service';

export default function Home() {
    const [logs, setLogs] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);

    const getAnalytics = async () => {
        let res = await AnalyticsService.getAnalytics();
        if(res){
            console.log(res);
        }
    };

    useEffect(() => {
        setLoading(true);
        getAnalytics();
        fetchDatas();
        setLoading(false);
    }, []);

    const fetchDatas = async () => {
        let res = await LogsService.getAllLogs({limit: 5});
        setLogs(res);
        res= await UserService.getAll(5);
        setUsers(res)
    }

    if(loading) return <div className={styles.loading}>Loading...</div>;

    return (
    <>
        <div>
            <h1 className={styles.title} style={{color: 'white' }}>Admin Dashboard</h1>
            <div className={styles.container}>
                <div className={styles.content}>
                    <section className={styles.main}>
                        <div className={styles.card}>
                            <h2>Analytiques</h2>
                            <Link to="/admin/analytics" className={`${styles.view} btn blue`}>
                                Voir
                            </Link>
                        </div>
                        <div className={styles.card}>
                            <h2>Modération</h2>
                            <p>dernier commentaire ou message signaler</p>
                            <Link to="/admin/moderation" className={`${styles.view} btn blue`}>
                                Voir
                            </Link>
                        </div>
                        <div className={styles.card}>
                            <h2>Logs</h2>
                            {logs.length && logs.map((log, index) => (
                                <div className={styles.logs} key={index}>
                                    <div className={styles.firstInfo}>
                                        <p className={styles.title}>
                                            <span className={errorsEnum[log.level]}>{errorsEnum[log.level].toUpperCase()} </span> 
                                            {log.type} : 
                                        </p>
                                        <p className={styles.subInfo}>{new Date(log.date).toLocaleString()}</p>
                                        <p className={styles.subInfo}>Path : {log.route}</p>
                                    </div>
                                    <p className={styles.message}>Message : "{log.message}"</p>
                                </div>
                            ))}
                            <Link to="/admin/logs" className={`${styles.view} btn blue`}>
                                Voir
                            </Link>
                        </div>
                    </section>
                    <article>
                        <div className={styles.card}>
                            <h2>Users</h2>
                            {
                                users.length && users.map((user) => (
                                    <div key={user.id}>
                                        <p>{user.firstName} {user.lastName}</p>
                                        <p>Nombres de reports : {user.reported?.length ?? 0}</p>
                                        <Link to={`/admin/users/${user.id}`}>Voir</Link>
                                    </div>
                                ))
                            }
                            <Link to="/admin/users" className={`${styles.view} btn blue`}>
                                Voir
                            </Link>
                        </div>
                    </article>
                    
                </div>
            </div>
        </div>
    </>
  );
}