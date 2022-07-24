import React from "react";
import { Link } from "react-router-dom";
import styles from "./home.module.scss";

export default function Home() {
  return (
    <div className={styles.container}>
        {/* <h1 className={styles.title}>Admin Dashboard</h1> */}
        <div className={styles.content}>
            <section className={styles.main}>
                <div className={styles.card}>
                    <h1>Admin Dashboard</h1>
                    <p>Analytiques</p>
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
  );
}