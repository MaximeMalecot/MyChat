import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.scss";
import LogsService from "../../../services/logs.service";
import { errorsEnum } from "../../../helpers/logs";

export default function Home() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    useEffect(() => {
        setLoading(true);
        fetchDatas();
        setLoading(false);
    }, []);

    const fetchDatas = async () => {
        const res = await LogsService.getAllLogs({limit: 5});
        setLogs(res);
    }
    console.log(logs);
  return (
    <>
        {loading ? <div className={styles.loading}>Loading...</div> :
        <>
            <h1 className={styles.title}>Admin Dashboard</h1>
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
                            <p>derniers utilisateur créer</p>
                            <Link to="/admin/users" className={`${styles.view} btn blue`}>
                                Voir
                            </Link>
                        </div>
                    </article>
                    
                </div>
            </div>
        </>
    }
    </>
  );
}