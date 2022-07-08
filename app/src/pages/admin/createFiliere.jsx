import React, { useState } from 'react';
import styles from './filiere.module.scss';

export default function Filiere(){
    const [name, setName] = useState('cegenredefiliere');
    return(
        <div className={styles.container}>
            <h1>Creation de filière</h1>
            <form className={styles.form}>
                <label htmlFor="name"> Name :</label>
                <input id='name' type="text"/>
                <button type='submit'>Créer</button>
            </form>
        </div>
    )
}