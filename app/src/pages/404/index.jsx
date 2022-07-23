import React from 'react';
import styles from './404.module.scss';

export default function PageIntrouvable(){
    return(
        <div className={styles.container}>
            <div className={styles.card}>
                <h1>Page introuvable</h1>
            </div>
        </div>
    )
}