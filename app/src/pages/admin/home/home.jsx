import React from "react";
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
                    <a className={`${styles.view} btn blue`} href="#">Voir</a>
                </div>
                <div className={styles.card}>
                    <h2>Modération</h2>
                    <p>dernier commentaire ou message signaler</p>
                    <a className={`${styles.view} btn blue`} href="#">Voir</a>
                </div>
            </section>
            <article>
                <div className={styles.card}>
                    <h2>Users</h2>
                    <p>derniers utilisateur créer</p>
                    <a className={`${styles.view} btn blue`} href="#">Voir</a>
                </div>
            </article>
        </div>
    </div>
  );
}