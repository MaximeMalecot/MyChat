import React from "react";
import styles from "./logs.module.scss";

export default function Logs() {
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.card}>
                    <h1>Logs</h1>
                </div>
            </div>
        </div>
    );
}