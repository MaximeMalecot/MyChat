import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.scss";
import LogsService from "../../../services/logs.service";

export default function Home() {
    const [logs, setLogs] = useState();
    useEffect(() => {
        fetchDatas();
    }, []);
    console.log(logs);
    const fetchDatas = async () => {
        const res = await LogsService.getAllLogs();
        setLogs(res);
    }
  return (
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
                        <p>dernier logs</p>
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
  );
}