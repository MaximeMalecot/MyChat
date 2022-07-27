import React, { useEffect, useState } from "react";
import styles from "./analytics.module.scss";
import AnalyticsService from '../../../services/analytics.service';
import AnalyticItemFull from "../../../components/analytic-item-full/analytic-item-full";

export default function Analytics() {
    const [ analytics, setAnalytics ] = useState([]);

    const getAnalytics = async () => {
        let res = await AnalyticsService.getAnalytics();
        if(res){
            setAnalytics(res);
        }
    };

    useEffect(()=>{
        getAnalytics();
    }, []);

    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.card}>
                    <h1>Analytics</h1>
                    <div className={styles.list}>
                        { analytics.length == 0
                            ? <span>There are no analytics to display</span>
                            : analytics.map((analytic, index) => <AnalyticItemFull data={analytic} key={index} />)
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}