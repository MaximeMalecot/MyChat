import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.scss";
import LogsService from "../../../services/logs.service";
import { errorsEnum } from "../../../helpers/logs";
import UserService from "../../../services/user.service";
import ReportService from "../../../services/report.service";
import AnalyticsService from '../../../services/analytics.service';
import AnalyticItem from "../../../components/analytic-item/analytic-item";

export default function Home() {
    const [logs, setLogs] = useState([]);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(false);
    const [ analytics, setAnalytics ] = useState([]);
    const [ reports, setReports] = useState([]);

    const getAnalytics = async () => {
        let res = await AnalyticsService.getAnalytics();
        if(res){
            setAnalytics(res.slice(0, 3));
        }
    };
    const getReports = async () => {
        let res = await ReportService.getLastCreated();
        if(res){
            setReports(res);
        }
    }

    useEffect(() => {
        setLoading(true);
        getAnalytics();
        getReports();
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
                            <h2>Analytics</h2>
                            <div className={styles.inlineItems}>
                                { analytics.length > 0
                                    ? analytics.map((analytic, index) => <AnalyticItem data={analytic} key={index} />)
                                    : <span>There are no analytics</span>
                                }
                            </div>
                            <Link to="/admin/analytics" className={`${styles.view} btn blue`}>
                                Voir plus
                            </Link>
                        </div>
                        <div className={styles.card}>
                            <h2>Modération</h2>
                            <div className={styles.reports}>
                            {
                                reports.length > 0 && reports.map((report, index) => (
                                        <div key={index} className={styles.info}>
                                            <p>{report.user.firstName} {report.user.lastName}</p>
                                            <p>{report.content}</p>
                                            <p>{report.createdAt}</p>
                                            <Link className="btn" to={`/admin/users/${report.reported}`}>Voir</Link>
                                        </div>
                                    )
                                )
                            }
                            <Link to="/admin/moderation" className={`${styles.view} btn blue`}>
                                Voir
                            </Link>
                            </div>
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