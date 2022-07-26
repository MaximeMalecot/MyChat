import React, { useCallback, useEffect, useState } from "react";
import styles from "./logs.module.scss";
import LogsService from "../../../services/logs.service";
import { errorsEnum } from "../../../helpers/logs";
import { toast } from 'react-toastify';

export default function Logs() {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(false);
    const [filter, setFilter] = useState({});
    useEffect(() => {
        setLoading(true);
        fetchDatas();
        setLoading(false);
    }, [filter]);
    
    const fetchDatas = async () => {
        const res = await LogsService.getAllLogs(filter);
        if(typeof res === "string") {
            toast.error(res, {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
            });
            return;
        }
        setLogs(res);
    }

    const handleFilter = useCallback((e) => {
        const { name, value } = e.target;
        setFilter({ ...filter, [name]: value });
    }, [filter]);
    
    return (
        <div className={styles.container}>
            {loading ? <p className={styles.loading}>Loading...</p> :
            <div className={styles.main}>
                <div className={styles.card}>
                    <h1>Logs</h1>
                    <div className={styles.filter}>
                        <input type="text" placeholder="Search" name="text" onChange={handleFilter}/>
                        <input type="number" placeholder="NB results" name="limit" min="1" onChange={handleFilter}/>
                    </div>
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
                </div>
            </div>
            }
        </div>
    );
}