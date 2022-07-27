import React, {useState, useEffect} from "react";
import styles from './user.module.scss';
import UserService from "../../../services/user.service";
import ReportService from "../../../services/report.service";
import { useParams, useNavigate } from "react-router-dom";
import { REPORT_STATUS } from "../../../constants/base";


export default function User() {
    const [user, setUser] = useState({});
    const [reportsTo, setReportsTo] = useState([]);
    const [loading, setLoading] = useState(false);
    const { id } = useParams();
	const navigate = useNavigate();

    const getUser = async (id) => {
        let res = await UserService.getReports(id)
        setUser(res.user);
        setReportsTo(res.reportsTo);
    }

    useEffect(() => {
        if(!loading){
            getUser(id);
            setLoading(true);
        }
    });

    const modifyReport = async (reportId, type) => {
        let res = await ReportService.modify(reportId, type);
        if(res){
            if(type === "close"){
                navigate("/admin");
                return;
            } else {
                await getUser(user.id);
                return;
            }
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.card}>
                    <h1>User</h1>
                    <p>{user.email}</p>
                    <p>{user.firstName} {user.lastName}</p>
                    <div className={styles.content}>
                        <div className={styles.reports}>
                            <h2>REPORTS ON USER</h2>
                                <div>
                                    {loading ? reportsTo.map(report => {
                                        return (
                                            <div key={report.id} className={styles.report}>
                                                    <p>{report.type}</p>
                                                    <p>{report.content}</p>
                                                    <p>{report.createdAt}</p>
                                                    { report.status === REPORT_STATUS.CREATED && 
                                                        <>
                                                            <button className="btn blue" onClick={() => modifyReport(report.id, "resolve")}>Mark as resolved</button>
                                                            <button className="btn red" onClick={() => modifyReport(report.id, "close")}>Ban</button>
                                                        </>

                                                    }
                                            </div>
                                        )
                                    }) : <div>Loading...</div>}
                                </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}