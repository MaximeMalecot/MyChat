import React from "react"
import styles from "./moderation.module.scss"

export default function Moderation() {
    return (
        <div className={styles.container}>
            <div className={styles.main}>
                <div className={styles.card}>
                    <h1>Modération</h1>
                    <p>dernier commentaire ou message signaler</p>
                    <div className={styles.content}>
                        <section className={styles.users}>
                            <h2>Utilisateurs signalés</h2>
                            <div className={styles.info}>
                                <p>nom prenom</p>
                                <div className={styles.btnGroup}>
                                    <button className="btn blue">Message</button>
                                    <button className="btn green">Annulé</button>
                                    <button className="btn red">Supprimé</button>
                                </div>
                            </div>
                            <div className={styles.info}>
                                <p>nom prenom</p>
                                <div className={styles.btnGroup}>
                                    <button className="btn blue">Message</button>
                                    <button className="btn green">Annulé</button>
                                    <button className="btn red">Supprimé</button>
                                </div>
                            </div>
                        </section>
                    </div>
                    
                </div>
            </div>
        </div>
    );
}