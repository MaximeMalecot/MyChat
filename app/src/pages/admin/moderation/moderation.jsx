import React, {useState, useEffect} from "react";
import styles from "./moderation.module.scss";
import ReportService from "../../../services/report.service";
import { REPORT_STATUS } from "../../../constants/base";

export default function Moderation() {
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);

    const getReports = async () => {
        let res = await ReportService.getAll();
        console.log(res);
        setReports(res);
    }

    const modifyReport = async (reportId, type) => {
        let res = await ReportService.modify(reportId, type);
        if(res){
            await getReports();
        }
    }

    useEffect(() => {
        if(!loading){
            getReports();
            setLoading(true);
        }
    });

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.card}>
                    <h1>Modération</h1>
                    <p>dernier commentaire ou message signaler</p>
                    <div className={styles.content}>
                        <section className={styles.users}>
                            <h2>Utilisateurs signalés</h2>
                            {
                                loading && reports.length > 0 ? reports.map((report, index) => {
                                    return (
                                        <div className={styles.info}>
                                            <p>{report?.user?.firstName} {report?.user?.lastName}</p><p>{report.content}</p>
                                            <p>{report.createdAt}</p>
                                            { report.status === REPORT_STATUS.CREATED && 
                                                <div className={styles.btnGroup}>
                                                    <button className="btn blue" onClick={() => modifyReport(report.id, "resolve")}>Mark as resolved</button>
                                                    <button className="btn red" onClick={() => modifyReport(report.id, "close")}>Ban</button>
                                                </div>
                                            }
                                        </div>
                                    )
                                }) : <p>Rien à voir ici</p>
                            }
                        </section>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}